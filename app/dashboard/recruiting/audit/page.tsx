"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

interface AuditLog {
  id: string
  action: string
  table: string
  user_email: string
  created_at: string
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const { data, error } = await supabase.from("audit_logs").select("*")
    if (error) return console.error(error)
    setLogs(data || [])
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Registro Audit</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Azione</th>
              <th className="px-4 py-2 text-left">Tabella</th>
              <th className="px-4 py-2 text-left">Utente</th>
              <th className="px-4 py-2 text-left">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2 font-medium text-gray-800">{log.action}</td>
                <td className="px-4 py-2">{log.table}</td>
                <td className="px-4 py-2">{log.user_email}</td>
                <td className="px-4 py-2">
                  {new Date(log.created_at).toLocaleString("it-IT")}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={4}>
                  Nessuna operazione registrata.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
