'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

type User = {
  id: string
  email: string
  role: string
}

export default function GestioneUtenti() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      setError('Errore durante il caricamento utenti.')
      setUsers([])
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-bg-dark">Gestione Utenti</h1>
        <Button onClick={fetchUsers} variant="outline">
          Ricarica
        </Button>
      </div>
      {loading ? (
        <p>Caricamento utenti...</p>
      ) : error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-gray-500">Nessun utente trovato.</div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Ruolo</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
