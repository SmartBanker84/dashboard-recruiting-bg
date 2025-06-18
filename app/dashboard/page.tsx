import { createServerClient } from "@/lib/supabase/server"
import ManagerDashboard from "@/components/ManagerDashboard"
import RecruitingDashboard from "@/components/RecruitingDashboard"

export default async function DashboardRouter() {
  const supabase = createServerClient()

  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return (
      <div className="p-6 text-center text-red-500">
        ⚠️ Errore autenticazione. Effettua di nuovo il login.
      </div>
    )
  }

  const userId = session.user.id

  const { data: profile, error: profileError } = await supabase
    .from("profiles") // o "users"
    .select("role")
    .eq("id", userId)
    .single()

  if (profileError || !profile?.role) {
    return (
      <div className="p-6 text-center text-red-500">
        ⚠️ Errore nel caricamento del profilo.
      </div>
    )
  }

  if (profile.role === "manager") return <ManagerDashboard />
  if (profile.role === "recruiter") return <RecruitingDashboard />

  return (
    <div className="p-6 text-center text-red-500">
      ⚠️ Ruolo non autorizzato
    </div>
  )
}
