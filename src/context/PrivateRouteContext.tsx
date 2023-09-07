'use client'

import { ReactNode, useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (auth.status === 'pendding') router.push('/auth/login')
  }, [auth.status, router])

  return children
}

export default PrivateRoute
