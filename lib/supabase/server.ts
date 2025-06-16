// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

export const createServerClient = () => {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
