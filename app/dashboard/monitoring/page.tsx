// app/dashboard/monitoring/page.tsx

import MonitoringTable from "@/components/MonitoringTable";
import { getAuditLogs } from "@/lib/supabase/audit";
import { EventLog } from "@/types/audit";

export default async function MonitoringPage() {
  const logs: EventLog[] = await getAuditLogs();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Monitoraggio attività</h1>
      <MonitoringTable logs={logs} />
    </main>
  );
}
