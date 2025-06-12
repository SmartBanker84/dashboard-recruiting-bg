import { UserCircle } from 'lucide-react'

export default function DashboardPage() {
  // Qui puoi collegare le tue API/Supabase per mostrare dati reali
  // Per ora valori statici di esempio
  const kpis = [
    { label: 'Candidati totali', value: 128, icon: <UserCircle className="h-7 w-7 text-red-400" /> },
    { label: 'Colloqui in corso', value: 14, icon: <UserCircle className="h-7 w-7 text-blue-400" /> },
    { label: 'Assunzioni', value: 4, icon: <UserCircle className="h-7 w-7 text-green-400" /> },
  ]

  return (
    <main className="flex flex-col flex-1 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Recruiting</h1>
      <p className="mb-8 text-gray-600">Benvenuto nella dashboard. Qui trovi una panoramica delle attività.</p>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {kpis.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border"
          >
            <div>{item.icon}</div>
            <div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          </div>
        ))}
      </section>
      {/* Qui puoi aggiungere grafici, tabelle, notifiche, ecc */}
    </main>
  )
}
