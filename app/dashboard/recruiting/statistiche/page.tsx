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

export default function StatistichePage() {
  const [data, setData] = useState<any[]>([])
  const [monthlyUploads, setMonthlyUploads] = useState<number[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)
    setData(data || [])
    processMonthlyData(data || [])
  }

  const processMonthlyData = (data: any[]) => {
    const monthly = new Array(12).fill(0)
    data.forEach((c) => {
      const month = new Date(c.created_at).getMonth()
      monthly[month]++
    })
    setMonthlyUploads(monthly)
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Statistiche CV Caricati</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <Bar
          height={300}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
          data={{
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            datasets: [{ label: 'CV Caricati', data: monthlyUploads, backgroundColor: '#DC2626' }],
          }}
        />
      </div>
    </div>
  )
}
