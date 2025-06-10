'use client'

import { ShieldAlert, LockKeyhole, UserCheck } from 'lucide-react'

export default function SicurezzaPage() {
  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Sicurezza</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <ShieldAlert className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">Protezione Accessi</h2>
            <p className="text-sm text-gray-600">Tutti gli accessi sono tracciati e autenticati tramite Supabase Auth. Sono in uso ruoli personalizzati.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <UserCheck className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">Gestione Permessi</h2>
            <p className="text-sm text-gray-600">I manager possono accedere in sola lettura, i recruiter possono inserire e modificare i dati.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-start gap-4">
          <LockKeyhole className="text-bg-red w-6 h-6 mt-1" />
          <div>
            <h2 className="font-semibold text-bg-dark mb-1">Storage Sicuro</h2>
            <p className="text-sm text-gray-600">I CV sono salvati su Supabase Storage con accessi protetti e visibili solo agli utenti autenticati.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
