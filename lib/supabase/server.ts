import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/ssr";
import { Database } from "@/types/supabase"; // usa 'any' se non hai definito il tipo Database

export function createServerClient() {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
}
