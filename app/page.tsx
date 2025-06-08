'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const { userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (userRole?.role === 'manager') {
        router.push('/manager')
      } else if (userRole?.role === 'recruiting') {
        router.push('/recruiting')
      }
    }
  }, [userRole, loading, router])

  return (
    <main>
      {!userRole && !loading && <LoginForm />}
    </main>
  )
}
