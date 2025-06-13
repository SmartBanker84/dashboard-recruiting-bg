'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import * as XLSX from 'xlsx'
import { Download, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AgeDistributionChart } from '@/components/AgeDistributionChart'
import { AddCandidateModal } from '@/components/AddCandidateModal'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Candidate {
  id: string
  name: string
  email: string
  note?: string
  birthdate?: string
  created_at: string
  stato?: string
}

interface AgeStats {
  '<25': number
  '25-34': number
  '35-44': number
  '45-54': number
  '55+': number
}

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [monthlyStats, setMonthlyStats] = useState<number[]>([])
  const [ageStats, setAgeStats] = useState<AgeStats>({
    '<25': 0,
    '25-34': 0,
    '35-44': 0,
    '45-54': 0,
    '55+': 0,
  })
  const [modalOpen, setModalOpen] = useState(false)

  // Per le activity card
  const [interviewing, setInterviewing] = useState(0)
  const [hired, setHired] = useState(0)

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)
    const cleaned = (data || []) as Candidate[]
    setCandidates(cleaned)
    setMonthlyStats(calculateMonthlyStats(cleaned))
    setAgeStats(calculateAgeStats(cleaned))
    setInterviewing(cleaned.filter(c => c.stato?.toLowerCase() === 'colloquio').length)
    setHired(cleaned.filter(c => c.stato?.toLowerCase() === 'assunto').length)
  }

  const calculateMonthlyStats = (data: Candidate[]) => {
    const monthly = new Array(12).fill(0)
    data.forEach((c) => {
      const month = new Date(c.created_at).getMonth()
      monthly[month]++
    })
    return monthly
  }

  const calculateAgeStats = (data: Candidate[]): AgeStats => {
    const ages = data
      .map((c) => (c.birthdate ? new Date().getFullYear() - new Date(c.birthdate).getFullYear() : null))
      .filter((a): a is number => a !== null)

    const stats: AgeStats = {
      '<25': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55+': 0,
    }

    ages.forEach((age) => {
      if (age < 25) stats['<25']++
      else if (age < 35) stats['25-34']++
      else if (age < 45) stats['35-44']++
      else if (age < 55) stats['45-54']++
      else stats['55+']++
    })

    return stats
  }

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      candidates.map((c) => ({
        Nome: c.name,
        Email: c.email,
        Note: c.note || '',
        'Data di Nascita': c.birthdate ? new Date(c.birthdate).toLocaleDateString('it-IT') : '',
        'Data Creazione': new Date(c.created_at).toLocaleDateString('it-IT'),
      }))
    )
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidati')
    XLSX.writeFile(workbook, 'candidati.xlsx')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Titolo e intro */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-bg-dark">Dashboard Recruiting</h1>
          <p className="text-xl text-gray-600 mb-6">
            Benvenuto nella dashboard. Qui trovi una panoramica delle attività.
          </p>
        </div>

        {/* Activity Cards stile immagine 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-2">
          <div className="rounded-2xl border bg-white py-8 px-6 flex flex-col items-center shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="16" cy="16" r="16" fill="#F87171" fillOpacity="0.1"/>
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#DC2626"/>
              </svg>
              <span className="sr-only">Icona candidati totali</span>
            </div>
            <div className="text-4xl font-bold text-bg-dark">{candidates.length}</div>
            <div className="text-lg text-gray-500 font-medium mt-1">Candidati totali</div>
          </div>
          <div className="rounded-2xl border bg-white py-8 px-6 flex flex-col items-center shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="16" cy="16" r="16" fill="#60A5FA" fillOpacity="0.1"/>
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#2563EB"/>
              </svg>
              <span className="sr-only">Icona colloqui</span>
            </div>
            <div className="text-4xl font-bold text-bg-dark">{interviewing}</div>
            <div className="text-lg text-gray-500 font-medium mt-1">Colloqui in corso</div>
          </div>
          <div className="rounded-2xl border bg-white py-8 px-6 flex flex-col items-center shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="16" cy="16" r="16" fill="#6EE7B7" fillOpacity="0.2"/>
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#059669"/>
              </svg>
              <span className="sr-only">Icona assunzioni</span>
            </div>
            <div className="text-4xl font-bold text-bg-dark">{hired}</div>
            <div className="text-lg text-gray-500 font-medium mt-1">Assunzioni</div>
          </div>
        </div>

        {/* KPI + Grafici piccoli */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* KPI Cards (dettaglio) */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Candidati Totali</p>
                <p className="text-3xl font-bold text-bg-dark">{candidates.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg ml-4">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path fill="#34c759" d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-1">Candidati Correnti (mese)</p>
                <p className="text-3xl font-bold text-bg-dark">
                  {monthlyStats[new Date().getMonth()]}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg ml-4">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path fill="#4F8EF7" d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Grafici piccoli */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-sm font-semibold mb-2 text-bg-dark">Andamento Mensile</h2>
              <div className="h-32">
                <Bar
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
                    scales: { x: { ticks: { font: { size: 10 } } }, y: { ticks: { font: { size: 10 } } } }
                  }}
                  data={{
                    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
                    datasets: [{ label: 'Candidati', data: monthlyStats, backgroundColor: '#DC2626' }],
                  }}
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-sm font-semibold mb-2 text-bg-dark">Età</h2>
              <div className="h-32 flex items-center">
                <AgeDistributionChart ageStats={ageStats} small />
              </div>
            </div>
          </div>
        </div>

        {/* TABELLA ED ESPORTAZIONE */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-bg-dark">Lista Candidati</h2>
            <Button onClick={exportXLSX}>
              <Download className="w-4 h-4 mr-2" />
              Esporta
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-left">Età</th>
                  <th className="px-4 py-2 text-left">Stato</th>
                  <th className="px-4 py-2 text-left">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.note || '—'}</td>
                    <td className="px-4 py-2">
                      {c.birthdate
                        ? new Date().getFullYear() - new Date(c.birthdate).getFullYear()
                        : '—'}
                    </td>
                    <td className="px-4 py-2">{c.stato || '—'}</td>
                    <td className="px-4 py-2">
                      {new Date(c.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddCandidateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          fetchCandidates()
          setModalOpen(false)
        }}
      />
    </div>
  )
}
