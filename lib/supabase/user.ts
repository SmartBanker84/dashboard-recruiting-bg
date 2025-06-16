import { createServerClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase"; // usa 'any' se non hai il tipo

// Recupera informazioni sull'utente corrente dalla sessione
export async function getCurrentUser() {
  const supabase = createServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  if (!session) return null;

  // Puoi estendere qui per fetchare ulteriori dati utente
  return session.user;
}

// Esempio: recupera info dal profilo associato all'utente
export async function getUserProfile() {
  const supabase = createServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  if (!session) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError) throw profileError;
  return profile;
}
