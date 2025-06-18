// app/dashboard/page.tsx
import { Briefcase, UserCheck, Users } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('candidates')
    .select('status')

  const stats = {
    total: data?.length || 0,
    interview: data?.filter((c) => c.status === 'Colloquio').length || 0,
    hired: data?.filter((c) => c.status === 'Onboarded').length || 0,
  }

  const kpis = [
    { label: 'Candidati totali', value: stats.total, icon: <Users className="h-7 w-7 text-red-500" /> },
    { label: 'Colloqui in corso', value: stats.interview, icon: <UserCheck className="h-7 w-7 text-blue-500" /> },
    { label: 'Assunzioni', value: stats.hired, icon: <Briefcase className="h-7 w-7 text-green-500" /> },
  ]

  return (
    <main className="flex flex-col flex-1 p-6 bg-bg-light min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Recruiting</h1>
      <p className="mb-8 text-gray-600">Benvenuto nella dashboard. Qui trovi una panoramica delle attività.</p>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {kpis.map((item) => (
          <div key={item.label} className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border">
            <div>{item.icon}</div>
            <div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          </div>
        ))}
      </section>
      {/* Prossimamente: grafici, tabelle, ecc. */}
    </main>
  )
}
