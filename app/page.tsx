'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Benvenuto nel Distretto Magnani</h1>
        <p className="text-sm text-gray-600 mb-6">Seleziona il tuo ruolo per accedere alla dashboard</p>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => router.push('/dashboard/recruiting')}>
            Accesso Recruiting
          </Button>
          <Button className="w-full" onClick={() => router.push('/dashboard/manager')}>
            Accesso Manager
          </Button>
        </div>
      </div>
    </main>
  )
}
