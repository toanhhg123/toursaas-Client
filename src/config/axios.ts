import { KEY_AUTH_LOCAL } from '@/features/auth/type'
import LocalStore from '@/utils/localStore'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const apiAuth = axios.create({
  baseURL: 'http://localhost:8081',
})

export const apiTour = axios.create({
  baseURL: 'http://localhost:8082',
})

export const apiAgent = axios.create({
  baseURL: 'http://localhost:8083',
})

export const handleError = async (error: AxiosError<any>) => {
  try {
    if (error.response?.data.message === 'jwt expired') {
      // const originalRequest = error.config as any
      // await axiosV1.post<IResponse<IAuthResponse>>(
      //   '/auth/refreshToken'
      // )
      // return axiosV1(originalRequest)
    }
    throw error
  } catch (error: any) {
    const additionalInfo = error?.response?.data?.additionalInfo
    let message = ''

    if (additionalInfo && additionalInfo?.details?.length) {
      const arrMessage = additionalInfo?.details
      message = arrMessage.map((x: any) => x.message).join(', ')
    } else message = error?.response?.data?.message ?? error.message

    throw new Error(message)
  }
}

export const handleRequest = (config: InternalAxiosRequestConfig<any>) => {
  const access_token = LocalStore.getItem<string>(KEY_AUTH_LOCAL)
  if (access_token) {
    config.headers.Authorization = 'Bearer ' + access_token
  }
  return config
}

apiAuth.interceptors.request.use(handleRequest, handleError)
apiTour.interceptors.request.use(handleRequest, handleError)
apiAgent.interceptors.request.use(handleRequest, handleError)
