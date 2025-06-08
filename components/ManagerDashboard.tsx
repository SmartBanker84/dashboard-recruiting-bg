'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { supabase, Candidate } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Download, Users, TrendingUp, Calendar } from 'lucide-react'

export default function ManagerDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    conversion: 0,
  })
  const { signOut } = useAuth()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setCandidates(data)
      const total = data.length
      const thisMonth = data.filter(c =>
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length
      setStats({
        total,
        thisMonth,
        conversion: total > 0 ? Math.round((thisMonth / total) * 100) : 0,
      })
    }
  }

  const exportData = () => {
    const csvContent = [
      ['Nome', 'Email', 'Note', 'Data'],
      ...candidates.map(c => [
        c.name,
        c.email,
        c.note || '',
        new Date(c.created_at).toLocaleDateString('it-IT')
      ])
    ].map(r => r.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'candidati.csv'
    a.click()
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-bg-dark">Dashboard Executive Manager</h1>
            <p className="text-gray-600">Banca Generali - Visione Generale</p>
          </div>
          <Button variant="outline" onClick={signOut}>Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card icon={<Users />} label="Totali" value={stats.total} />
          <Card icon={<Calendar />} label="Questo mese" value={stats.thisMonth} />
          <Card icon={<TrendingUp />} label="Conversione" value={`${stats.conversion}%`} />
        </div>

        {/* Esportazione */}
        <div className="bg-white p-6 rounded-lg card-shadow mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-bg-dark">Esporta Candidati</h2>
            <p className="text-gray-600">Scarica i dati in formato CSV</p>
          </div>
          <Button onClick={exportData}>
            <Download className="w-4 h-4 mr-2" /> Esporta CSV
          </Button>
        </div>

        {/* Tabella */}
        <div className="bg-white rounded-lg card-shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-bg-dark">
              Lista Candidati ({candidates.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Note</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">CV</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{c.note}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(c.created_at).toLocaleDateString('it-IT')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-bg-red">
                      {c.file_url ? (
                        <a href={c.file_url} target="_blank" className="hover:underline">Scarica</a>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function Card({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) {
  return (
    <div className="bg-white rounded-lg card-shadow p-6 flex items-center">
      <div className="text-bg-red w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-bg-dark">{value}</p>
      </div>
    </div>
  )
}
