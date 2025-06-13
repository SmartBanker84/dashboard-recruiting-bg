import React from 'react'
import type { Candidate, CandidateStatus } from '@/types/candidate'

interface Props {
  candidates: Candidate[]
  onUpdateStatus: (id: string, newStatus: CandidateStatus) => void
}

const statusOptions: CandidateStatus[] = [
  'Nuovo',
  'Contattato',
  'Colloquio',
  'Onboarded',
  'Scartato'
]

const statusColorMap: Record<Exclude<CandidateStatus, undefined>, string> = {
  Nuovo: 'bg-red-100 text-red-600',
  Contattato: 'bg-yellow-100 text-yellow-600',
  Colloquio: 'bg-blue-100 text-blue-600',
  Onboarded: 'bg-green-100 text-green-600',
  Scartato: 'bg-gray-100 text-gray-600'
}

export function CandidateTable({ candidates, onUpdateStatus }: Props) {
  return (
    <table className="w-full border mt-6 text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Nome</th>
          <th className="p-2">Email</th>
          <th className="p-2">Azienda</th>
          <th className="p-2">Segmento</th>
          <th className="p-2">Stato</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c) => (
          <tr key={c.id} className="border-t">
            <td className="p-2 font-medium">{c.name}</td>
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.company}</td>
            <td className="p-2">{c.segment}</td>
            <td className="p-2">
              <select
                value={c.status || 'Nuovo'}
                onChange={(e) => onUpdateStatus(c.id, e.target.value as CandidateStatus)}
                className={`border rounded px-2 py-1 text-sm ${statusColorMap[c.status || 'Nuovo']}`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
