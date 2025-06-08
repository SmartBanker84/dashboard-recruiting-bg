import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  email: string
  role: 'recruiting' | 'manager'
}

export interface Candidate {
  id: string
  name: string
  email: string
  note?: string
  file_url?: string
  created_by: string
  created_at: string
}
