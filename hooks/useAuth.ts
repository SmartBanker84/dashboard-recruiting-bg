import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Funzione signOut
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login') // opzionale: redirect dopo il logout
  }

  return { user, signOut }
}
