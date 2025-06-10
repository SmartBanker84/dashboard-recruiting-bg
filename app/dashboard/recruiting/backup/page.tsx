'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, UploadCloud } from 'lucide-react'

export default function BackupPage() {
  const [loading, setLoading] = useState(false)

  const handleBackup = async () => {
    setLoading(true)
    // Simulazione esportazione dati
    setTimeout(() => {
      alert('Backup completato e scaricato in formato .xlsx')
      setLoading(false)
    }, 1500)
  }

  const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    alert(`Ripristino del file: ${file.name} simulato con successo`)
    // Qui si potrebbe caricare su Supabase e processare i dati
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Backup & Ripristino</h1>

      <div className="space-y-6 max-w-xl bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between">
          <p className="text-bg-dark font-medium">Esporta i dati dei candidati</p>
          <Button onClick={handleBackup} disabled={loading}>
            <Download className="w-4 h-4 mr-2" />
            {loading ? 'Esportazione...' : 'Backup .xlsx'}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-bg-dark font-medium">Importa dati da file</p>
          <label className="cursor-pointer inline-flex items-center bg-bg-red text-white px-4 py-2 rounded-xl shadow-sm hover:bg-bg-red/90">
            <UploadCloud className="w-4 h-4 mr-2" />
            Ripristina
            <input type="file" accept=".xlsx,.csv" onChange={handleRestore} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
