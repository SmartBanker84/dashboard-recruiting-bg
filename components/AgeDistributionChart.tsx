'use client'

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

type AgeStats = {
  '<25': number
  '25-34': number
  '35-44': number
  '45-54': number
  '55+': number
}

interface Props {
  ageStats: AgeStats
}

export function AgeDistributionChart({ ageStats }: Props) {
  const labels = Object.keys(ageStats)
  const values = Object.values(ageStats)

  const data = {
    labels,
    datasets: [
      {
        label: 'Candidati per fascia di età',
        data: values,
        backgroundColor: '#DC2626',
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} candidati`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return <Bar height={300} data={data} options={options} />
}
