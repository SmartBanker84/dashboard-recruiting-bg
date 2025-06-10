'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

interface AuditEntry {
  id: string
  action: string
  user_email: string
  timestamp: string
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const { data, error } = await supabase.from('audit_logs').select('*').order('timestamp', { ascending: false })
    if (error) console.error('Errore nel recupero dei log:', error)
    else setLogs(data || [])
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Audit Log</h1>

      <Card className="overflow-x-auto p-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Utente</th>
              <th className="text-left px-4 py-2">Azione</th>
              <th className="text-left px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2">{log.user_email}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString('it-IT')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
