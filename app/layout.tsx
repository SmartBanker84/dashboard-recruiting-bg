import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Distretto Magnani Recruiting',
  description: 'Dashboard per la gestione delle candidature',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-bg-light p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function AgeDistributionChart({ ageStats }: { ageStats: Record<string, number> }) {
  const labels = Object.keys(ageStats)
  const data = Object.values(ageStats)

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-bg-dark">Distribuzione per Età</h2>
      <Bar
        height={300}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
        data={{
          labels,
          datasets: [
            {
              label: 'Candidati',
              data,
              backgroundColor: '#DC2626'
            }
          ]
        }}
      />
    </div>
  )
}
