'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@/lib/supabase'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        setUser(null)
        setLoading(false)
        return
      }

      const metadata = data.user.user_metadata
      const userWithRole: User = {
        id: data.user.id,
        email: data.user.email ?? '',
        role: metadata.role ?? 'recruiting',
      }

      setUser(userWithRole)
      setLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          role: metadata.role ?? 'recruiting',
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return { user, userRole: user?.role, loading, signOut }
}
