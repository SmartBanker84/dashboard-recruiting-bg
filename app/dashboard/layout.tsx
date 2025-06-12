import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Crea client Supabase SSR
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  // Recupera user dalla sessione
  const { data: { user } } = await supabase.auth.getUser();

  // Se NON autenticato, rimanda al login (o mostra errore)
  if (!user) {
    redirect("/login"); // o return <div>Non autorizzato. Effettua il login.</div>
  }

  // Recupera ruolo dalla tabella users
  const { data: userData, error } = await supabase
    .from("users")
    .select("id, email, role")
    .eq("id", user.id)
    .single();

  // Se non trovi l'utente o il ruolo, mostra errore
  if (error || !userData) {
    return <div>Errore nel recupero dati utente.</div>;
  }

  return (
    <div className="flex">
      <Sidebar user={userData} />
      <main className="flex-1 bg-bg-light min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
