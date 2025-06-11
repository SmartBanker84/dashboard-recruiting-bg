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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function RecruitingConversionPage() {
  const [monthlyData, setMonthlyData] = useState<number[]>([])
  const [totalCandidates, setTotalCandidates] = useState(0)

  useEffect(() => {
    fetchConversionData()
  }, [])

  const fetchConversionData = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)

    const monthly = new Array(12).fill(0)
    data.forEach((c: any) => {
      const month = new Date(c.created_at).getMonth()
      monthly[month]++
    })

    setMonthlyData(monthly)
    setTotalCandidates(data.length)
  }

  const conversionRate = totalCandidates
    ? Math.round((monthlyData[new Date().getMonth()] / totalCandidates) * 100)
    : 0

  return (
    <div className="min-h-screen bg-bg-light p-8">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Analisi Conversione</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-gray-500">Conversione Mese Corrente</p>
        <p className="text-3xl font-bold text-bg-dark">{conversionRate}%</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-bg-dark">Andamento Mensile</h2>
        <Bar
          height={300}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
          data={{
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            datasets: [
              {
                label: 'Candidati',
                data: monthlyData,
                backgroundColor: '#DC2626',
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
