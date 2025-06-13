'use client'

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Monitoring</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-700">
          Qui potrai monitorare lo stato del sistema, dei caricamenti, delle connessioni al database e delle API in tempo reale.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          ⚠️ In questa versione, i dati di monitoring sono statici. Puoi collegarli a Supabase o un servizio esterno (es. LogRocket, Sentry) per il monitoraggio reale.
        </div>
      </div>
    </div>
  )
}
