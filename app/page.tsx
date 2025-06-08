'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import RecruitingDashboard from '@/components/RecruitingDashboard'
import ManagerDashboard from '@/components/ManagerDashboard'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user, userRole, loading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient">
        <div className="text-white text-center">
          <div className="animate-pulse">Caricamento...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (userRole?.role === 'recruiting') {
    return <RecruitingDashboard />
  }

  if (userRole?.role === 'manager') {
    return <ManagerDashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-bg-dark mb-4">Accesso non autorizzato</h2>
        <p className="text-gray-600 mb-4">
          Il tuo account non ha un ruolo assegnato. Contatta l'amministratore di sistema.
        </p>
      </div>
    </div>
  )
}
