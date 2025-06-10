'use client'

import { PlugZap, FileUp, BarChart4 } from 'lucide-react'

export default function IntegrazioniPage() {
  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Integrazioni</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <FileUp className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">Upload CV</h2>
            <p className="text-sm text-gray-600">I documenti vengono caricati direttamente su Supabase Storage e associati a ciascun candidato.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <BarChart4 className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">Esportazione Dati</h2>
            <p className="text-sm text-gray-600">Tutti i dati dei candidati possono essere esportati in formato Excel con un solo clic.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <PlugZap className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">API Future</h2>
            <p className="text-sm text-gray-600">In futuro potrai integrare strumenti esterni tramite API per automazioni e sincronizzazione.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
