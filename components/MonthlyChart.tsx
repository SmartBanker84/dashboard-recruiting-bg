'use client'
import { Bar } from 'react-chartjs-2'
import { getMonthStats } from '@/lib/utils'
import { Candidate } from '@/types/candidate'

export function MonthlyChart({ data }: { data: Candidate[] }) {
  const stats = getMonthStats(data)
  return <Bar data={{
    labels: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
    datasets: [{ label: 'Candidati', data: stats, backgroundColor: '#DC2626' }]
  }} />
}
