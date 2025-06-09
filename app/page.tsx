'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    if (user.role === 'manager') {
      router.push('/dashboard/manager')
    } else if (user.role === 'recruiting') {
      router.push('/dashboard/recruiting')
    }
  }, [user, router])

  return <LoginForm />
}
