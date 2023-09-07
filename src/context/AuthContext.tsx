'use client'
import { ReactNode } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)
  if (auth.status === 'success') router.replace('/')

  return children
}

export default AuthContext
