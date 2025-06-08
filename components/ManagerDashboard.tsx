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
    conversion: 0
  })
  const { signOut } = useAuth()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setCandidates(data || [])

      // Calculate stats
      const total = data?.length || 0
      const thisMonth = data?.filter(c => 
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length || 0

      setStats({
        total,
        thisMonth,
        conversion: total > 0 ? Math.round((thisMonth / total) * 100) : 0
      })
    } catch (error) {
      console.error('Error fetching candidates:', error)
    }
  }

  const exportData = () => {
    const csvContent = [
      ['Nome', 'Email', 'Note', 'Data Creazione'],
      ...candidates.map(c => [
        c.name,
        c.email,
        c.note || '',
        new Date(c.created_at).toLocaleDateString('it-IT')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `candidati_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-bg-dark">
                Dashboard Executive Manager
              </h1>
              <p className="text-gray-600">Banca Generali - Visione Generale</p>
            </div>
            <Button onClick={() => signOut()} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg card-shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-bg-red" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Candidati Totali</p>
                <p className="text-2xl font-bold text-bg-dark">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg card-shadow p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-bg-red" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Questo Mese</p>
                <p className="text-2xl font-bold text-bg-dark">{stats.thisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg card-shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-bg-red" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasso Conversione</p>
                <p className="text-2xl font-bold text-bg-dark">{stats.conversion}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-lg card-shadow p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-bg-dark">Esporta Dati</h2>
              <p className="text-gray-600">Scarica i dati dei candidati in formato CSV</p>
            </div>
            <Button onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Esporta CSV
            </Button>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-lg card-shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-bg-dark">
              Lista Candidati ({candidates.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Creazione
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {candidate.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.file_url ? (
                        <a 
                          href={candidate.file_url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bg-red hover:underline"
                        >
                          <Download className="w-4 h-4 inline mr-1" />
                          Scarica
                        </a>
                      ) : (
                        <span className="text-gray-400">Nessun file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(candidate.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
