'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface KPI {
  id: number
  nome: string
  valore: string
}

export default function KPIPage() {
  const [kpis, setKpis] = useState<KPI[]>([
    { id: 1, nome: 'Conversione Media', valore: '38%' },
    { id: 2, nome: 'Candidati per Mese', valore: '57' }
  ])

  const handleChange = (id: number, value: string) => {
    setKpis((prev) =>
      prev.map((kpi) => (kpi.id === id ? { ...kpi, valore: value } : kpi))
    )
  }

  const handleSave = () => {
    // Qui potresti salvare su Supabase o un backend
    console.log('KPI aggiornati:', kpis)
    alert('KPI salvati!')
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Configurazione KPI</h1>

      <div className="space-y-6 max-w-xl bg-white p-6 rounded-xl shadow">
        {kpis.map((kpi) => (
          <div key={kpi.id}>
            <Label className="text-bg-dark">{kpi.nome}</Label>
            <Input
              value={kpi.valore}
              onChange={(e) => handleChange(kpi.id, e.target.value)}
              className="mt-1"
            />
          </div>
        ))}

        <Button onClick={handleSave}>Salva KPI</Button>
      </div>
    </div>
  )
}
