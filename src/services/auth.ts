import { apiAuth } from '@/config/axios'
import { IUserDetails } from '@/features/auth/type'

export const getMe = () => apiAuth.get<IUserDetails>('/user/me')
