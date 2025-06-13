'use client'

import React, { useEffect, useState } from 'react'
import { Candidate, CandidateStatus } from '@/types/candidate'
import { CandidateTable } from './CandidateTable'
import { AddCandidateModal } from './AddCandidateModal'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | 'Tutti'>('Tutti')

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Errore caricamento candidati:', error.message)
    if (data) setCandidates(data as Candidate[])
    setLoading(false)
  }

  const handleAddSuccess = () => {
    fetchCandidates()
  }

  const onUpdateStatus = async (id: string, newStatus: CandidateStatus) => {
    const { error } = await supabase.from('candidates').update({ status: newStatus }).eq('id', id)
    if (!error) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus as CandidateStatus } : c))
      )
    } else {
      alert('Errore aggiornamento status')
    }
  }

  const exportXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      candidates.map((c) => ({
        Nome: c.name,
        Email: c.email,
        Società: c.company,
        Genere: c.gender,
        Segmento: c.segment,
        Stato: c.status,
        Note: c.note || '',
        'Data di Nascita': c.birthdate ? new Date(c.birthdate).toLocaleDateString('it-IT') : '',
        'Data Creazione': c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : ''
      }))
    )
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidati')
    XLSX.writeFile(workbook, 'candidati.xlsx')
  }

  const filteredCandidates =
    statusFilter === 'Tutti'
      ? candidates
      : candidates.filter((c) => c.status === statusFilter)

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Candidati</h1>
        <div className="flex gap-2">
          <Button onClick={exportXLSX}><Download className="w-4 h-4 mr-2" /> Esporta</Button>
          <Button onClick={() => setModalOpen(true)}>+ Nuovo</Button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <label>Filtro Stato:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CandidateStatus | 'Tutti')}
          className="border rounded px-2 py-1"
        >
          <option value="Tutti">Tutti</option>
          <option value="Nuovo">Nuovo</option>
          <option value="Contattato">Contattato</option>
          <option value="Colloquio">Colloquio</option>
          <option value="Onboarded">Onboarded</option>
          <option value="Scartato">Scartato</option>
        </select>
      </div>

      <CandidateTable candidates={filteredCandidates} onUpdateStatus={onUpdateStatus} />

      <AddCandidateModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleAddSuccess} />
    </div>
  )
}
