// lib/supabase/server.ts

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const anonKey = process.env.SUPABASE_ANON_KEY!; // o SERVICE_ROLE_KEY se serve più permessi

export function createServerClient() {
  return createClient(url, anonKey);
}
