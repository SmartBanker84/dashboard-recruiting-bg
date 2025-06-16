import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase"; // usa 'any' se non hai il tipo Database

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client per l'uso lato client (browser)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
