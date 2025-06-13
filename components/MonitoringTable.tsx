'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type MonitoringLog = {
  id: string
  user_email: string
  action: string
  timestamp: string
}

export default function MonitoringTable() {
  const [logs, setLogs] = useState<MonitoringLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.error('Errore nel caricamento dei log:', error.message)
    } else {
      setLogs(data as MonitoringLog[])
    }

    setLoading(false)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Log di Monitoraggio</h2>
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Utente</th>
              <th className="border px-4 py-2">Azione</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border px-4 py-2">{log.user_email}</td>
                <td className="border px-4 py-2">{log.action}</td>
                <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
