// app/dashboard/permessi/page.tsx

import PermissionTable from "@/components/PermissionTable";
import { getUsers, updateUserRole } from "@/lib/supabase/user";
import { User } from "@/types/user";

export default async function PermessiPage() {
  const users: User[] = await getUsers();

  const handleRoleChange = async (id: string, role: User["role"]) => {
    "use server";
    await updateUserRole(id, role);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Gestione permessi utenti</h1>
      <PermissionTable users={users} onRoleChange={handleRoleChange} />
    </main>
  );
}
