'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@/lib/supabase'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        setUser(null)
        return
      }

      if (data.user) {
        const metadata = data.user.user_metadata
        const userWithRole: User = {
          id: data.user.id,
          email: data.user.email!,
          role: metadata.role || 'recruiting',
        }
        setUser(userWithRole)
      }
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata.role || 'recruiting',
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return { user, signOut }
}
