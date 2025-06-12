// lib/supabase/index.ts
export { supabase } from './client' // lato client
export { supabase as supabaseServer } from './server' // lato server

// tipi centralizzati (se non separati in /types)
export type { User } from '@/types/user'
export type { Candidate } from '@/types/candidate'
