 import { createServerClient } from "@/lib/supabase/server";
import ManagerDashboard from "@/components/ManagerDashboard";
import RecruitingDashboard from "@/components/RecruitingDashboard";

export default async function DashboardRouter() {
  const supabase = createServerClient();

  const { data: { session } } = await supabase.auth.getSession();
  const role = session?.user?.user_metadata?.role || "recruiter"; // default recruiter

  if (role === "manager") return <ManagerDashboard />;
  if (role === "recruiter") return <RecruitingDashboard />;

  return (
    <div className="p-6 text-center text-red-500">
      ⚠️ Ruolo non autorizzato
    </div>
  );
}
