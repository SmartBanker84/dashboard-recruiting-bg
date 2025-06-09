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
  Legend
} from 'chart.js'
import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [monthlyStats, setMonthlyStats] = useState<number[]>([])

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)
    setCandidates(data || [])
    calculateMonthlyStats(data || [])
  }

  const calculateMonthlyStats = (data: any[]) => {
    const monthly = new Array(12).fill(0)
    data.forEach((c) => {
      const month = new Date(c.created_at).getMonth()
      monthly[month]++
    })
    setMonthlyStats(monthly)
  }

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      candidates.map((c) => ({
        Nome: c.name,
        Email: c.email,
        Note: c.note,
        'Data Creazione': new Date(c.created_at).toLocaleDateString('it-IT')
      }))
    )
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidati')
    XLSX.writeFile(workbook, 'candidati.xlsx')
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-bg-dark">Dashboard Recruiting</h1>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Candidati Totali</p>
            <p className="text-3xl font-bold text-bg-dark">{candidates.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Mese Corrente</p>
            <p className="text-3xl font-bold text-bg-dark">{monthlyStats[new Date().getMonth()]}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Conversione %</p>
            <p className="text-3xl font-bold text-bg-dark">
              {candidates.length ? Math.round((monthlyStats[new Date().getMonth()] / candidates.length) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* GRAFICO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-bg-dark">Andamento Mensile</h2>
          <Bar
            height={300}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
            data={{
              labels: [
                'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
                'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
              ],
              datasets: [
                {
                  label: 'Candidati',
                  data: monthlyStats,
                  backgroundColor: '#DC2626'
                }
              ]
            }}
          />
        </div>

        {/* TABELLA ED ESPORTAZIONE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-bg-dark">Lista Candidati</h2>
            <Button onClick={exportXLSX}>
              <Download className="w-4 h-4 mr-2" /> Esporta
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-left">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.note}</td>
                    <td className="px-4 py-2">{new Date(c.created_at).toLocaleDateString('it-IT')}</td>
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
