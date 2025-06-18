// lib/supabase/user.ts
import { createServerClient } from '@/lib/supabase/server'
import { Database } from '@/types/supabase'

export async function getCurrentUser() {
  const supabase = createServerClient()

  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session?.user ?? null
}

export async function getUserProfile() {
  const supabase = createServerClient()

  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  if (!session) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (profileError) throw profileError
  return profile
}
