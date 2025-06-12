'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function NuovoUtentePage() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    if (!email || !role) {
      setError('Compila tutti i campi')
      setLoading(false)
      return
    }

    // Inserisci nuovo utente
    const { error } = await supabase.from('users').insert([{ email, role }])

    if (error) {
      setError('Errore nella creazione utente')
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/recruiting/utenti')
      }, 1200)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Nuovo Utente</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="border px-3 py-2 rounded w-full"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ruolo</label>
          <input
            className="border px-3 py-2 rounded w-full"
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">Utente creato!</div>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvataggio...' : 'Crea utente'}
        </Button>
      </form>
    </div>
  )
}
