'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

type User = {
  id: string
  email: string
  role: string
}

export default function DettaglioUtentePage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
      if (error) setError('Utente non trovato')
      else {
        setUser(data)
        setEmail(data.email)
        setRole(data.role)
      }
    }
    if (id) fetchUser()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const { error } = await supabase.from('users').update({ email, role }).eq('id', id)
    if (error) setError('Errore nell\'aggiornamento')
    else setSuccess(true)
    setEditMode(false)
  }

  const handleDelete = async () => {
    if (!confirm('Sei sicuro di voler eliminare questo utente?')) return
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) setError('Errore nella cancellazione')
    else router.push('/dashboard/recruiting/utenti')
  }

  if (!user && !error) return <div className="p-6">Caricamento...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Dettaglio Utente</h1>
      {!editMode ? (
        <div className="bg-white p-6 rounded-xl shadow max-w-md space-y-4">
          <div><b>Email:</b> {user?.email}</div>
          <div><b>Ruolo:</b> {user?.role}</div>
          <div className="flex gap-3 mt-4">
            <Button variant="secondary" onClick={() => setEditMode(true)}>Modifica</Button>
            <Button variant="destructive" onClick={handleDelete}>Elimina</Button>
          </div>
          {success && <div className="text-green-600">Utente aggiornato!</div>}
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow max-w-md space-y-4">
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
          <div className="flex gap-3">
            <Button type="submit">Salva</Button>
            <Button variant="outline" onClick={() => setEditMode(false)}>Annulla</Button>
          </div>
        </form>
      )}
    </div>
  )
}
