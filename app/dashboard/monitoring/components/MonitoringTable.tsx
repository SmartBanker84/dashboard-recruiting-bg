// components/MonitoringTable.tsx

import { EventLog } from "@/types/audit";

type Props = {
  logs: EventLog[];
};

export default function MonitoringTable({ logs }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Data</th>
            <th className="border px-4 py-2 text-left">Utente</th>
            <th className="border px-4 py-2 text-left">Azione</th>
            <th className="border px-4 py-2 text-left">Dettagli</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="border px-4 py-2">{log.user_email}</td>
              <td className="border px-4 py-2">{log.action}</td>
              <td className="border px-4 py-2">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
