'use client'

import { Candidate } from '@/types/candidate'
import { useState } from 'react'

const statusOptions: NonNullable<Candidate['status']>[] = [
  'Nuovo',
  'Contattato',
  'Colloquio',
  'Onboarded',
  'Scartato'
]

const statusColorMap: Record<NonNullable<Candidate['status']>, string> = {
  Nuovo: 'bg-red-100 text-red-600',
  Contattato: 'bg-yellow-100 text-yellow-600',
  Colloquio: 'bg-blue-100 text-blue-600',
  Onboarded: 'bg-green-100 text-green-600',
  Scartato: 'bg-gray-200 text-gray-600',
}

export function CandidateTable({ data, onUpdateStatus }: {
  data: Candidate[]
  onUpdateStatus: (id: string, status: Candidate['status']) => void
}) {
  const [filterStatus, setFilterStatus] = useState<string>('')

  const filteredData = filterStatus
    ? data.filter((c) => c.status === filterStatus)
    : data

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-bg-dark">Lista Candidati</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">Tutti gli stati</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Telefono</th> {/* AGGIUNTA */}
              <th className="px-4 py-2 text-left">Società</th>
              <th className="px-4 py-2 text-left">Genere</th>
              <th className="px-4 py-2 text-left">Segmento</th>
              <th className="px-4 py-2 text-left">Stato</th>
              <th className="px-4 py-2 text-left">Note</th>
              <th className="px-4 py-2 text-left">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.telefono || '—'}</td> {/* AGGIUNTA */}
                <td className="px-4 py-2">{c.company}</td>
                <td className="px-4 py-2">{c.gender}</td>
                <td className="px-4 py-2">{c.segment}</td>
                <td className="px-4 py-2">
                  <select
                    value={c.status}
                    onChange={(e) => onUpdateStatus(c.id, e.target.value as Candidate['status'])}
                    className={`border rounded px-2 py-1 text-sm ${c.status ? statusColorMap[c.status] : ''}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">{c.note}</td>
                <td className="px-4 py-2">{c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
