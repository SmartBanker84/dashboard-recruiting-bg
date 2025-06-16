import { createServerClient } from "@/lib/supabase/server";

// Recupera l'utente corrente dalla sessione
export async function getCurrentUser() {
  const supabase = createServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  if (!session) return null;

  return session.user;
}

// Recupera il profilo dell'utente corrente
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

// 🔧 Recupera la lista completa degli utenti (funzione per permessi/page.tsx)
export async function getUsers() {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;

  return data.users;
}

// 🔧 Aggiorna il ruolo di un utente (funzione per permessi/page.tsx)
export async function updateUserRole(userId: string, role: string) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("user_roles")
    .update({ role })
    .eq("user_id", userId);

  if (error) throw error;
}
