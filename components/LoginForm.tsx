'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
  const router = useRouter()
  const { user } = useAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { data, error } = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())

    if (error) {
      setError('Errore durante l’invio dell’email.')
    } else {
      setMessage('Controlla la tua email per il link di accesso.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-bg-dark">Banca Generali</h1>
          <p className="text-gray-500">Accesso alla Dashboard Recruiting</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@bancagenerali.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={error ? 'border-red-500' : ''}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Invio email...' : 'Accedi via email'}
          </Button>
        </form>
      </div>
    </div>
  )
}
