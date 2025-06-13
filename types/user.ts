// lib/supabase/user.ts

import { supabase } from "@/lib/supabase/supabaseClient";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, role");

  if (error) {
    console.error("Errore fetch utenti:", error);
    return [];
  }

  return data as User[];
}

export async function updateUserRole(id: string, role: User["role"]) {
  const { error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id);

  if (error) {
    console.error("Errore update ruolo:", error);
  }
}
