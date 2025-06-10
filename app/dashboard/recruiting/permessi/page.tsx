'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card'

interface User {
  id: string
  email: string
  role: string
}

export default function PermessiPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) return console.error(error)
    setUsers(data || [])
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Permessi & Ruoli</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <p className="font-semibold text-bg-dark">{user.email}</p>
            <p className="text-sm text-gray-500">Ruolo: {user.role}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
