'use client'

import Link from 'next/link'

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bg-dark">Benvenuto nella Dashboard</h1>
      <p className="text-gray-600">
        Questa è la panoramica generale del Distretto Magnani. Seleziona una sezione dal menu laterale
        per gestire il processo di recruiting, monitorare i KPI oppure configurare i permessi.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/recruiting" className="p-6 bg-white rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold text-bg-dark mb-2">Recruiting</h2>
          <p className="text-sm text-gray-600">Gestisci i candidati, aggiungi profili e monitora l'andamento mensile.</p>
        </Link>

        <Link href="/dashboard/manager" className="p-6 bg-white rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold text-bg-dark mb-2">Manager</h2>
          <p className="text-sm text-gray-600">Consulta i KPI di team e i dati aggregati per prendere decisioni.</p>
        </Link>

        <Link href="/dashboard/permessi" className="p-6 bg-white rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold text-bg-dark mb-2">Permessi</h2>
          <p className="text-sm text-gray-600">Imposta i livelli di accesso e le funzionalità abilitate per ogni ruolo.</p>
        </Link>
      </div>
    </div>
  )
}
