'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface AgeDistributionChartProps {
  ageRanges: {
    '<25': number
    '25-34': number
    '35-44': number
    '45-54': number
    '55+': number
  }
}

export function AgeDistributionChart({ ageRanges }: AgeDistributionChartProps) {
  const labels = Object.keys(ageRanges)
  const dataValues = Object.values(ageRanges)

  const data = {
    labels,
    datasets: [
      {
        label: 'Candidati per fascia di età',
        data: dataValues,
        backgroundColor: '#DC2626',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-bg-dark">Distribuzione Età</h2>
      <Bar height={300} data={data} options={options} />
    </div>
  )
}
