'use client'

import { Candidate } from '@/types/candidate'

interface CandidateTableProps {
  data: Candidate[]
  onUpdateStatus: (id: string, status: Candidate['status']) => void
}

const statusOptions: Candidate['status'][] = [
  'Nuovo',
  'Contattato',
  'Colloquio',
  'Onboarded',
  'Scartato'
]

const statusColorMap: Record<Candidate['status'], string> = {
  Nuovo: 'bg-red-100 text-red-600',
  Contattato: 'bg-yellow-100 text-yellow-600',
  Colloquio: 'bg-blue-100 text-blue-600',
  Onboarded: 'bg-green-100 text-green-600',
  Scartato: 'bg-gray-100 text-gray-600'
}

export function CandidateTable({ data, onUpdateStatus }: CandidateTableProps) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="text-left px-3 py-2">Nome</th>
          <th className="text-left px-3 py-2">Email</th>
          <th className="text-left px-3 py-2">Società</th>
          <th className="text-left px-3 py-2">Genere</th>
          <th className="text-left px-3 py-2">Segmento</th>
          <th className="text-left px-3 py-2">Stato</th>
          <th className="text-left px-3 py-2">Data</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((c) => (
          <tr key={c.id}>
            <td className="px-3 py-2">{c.name}</td>
            <td className="px-3 py-2">{c.email}</td>
            <td className="px-3 py-2">{c.company}</td>
            <td className="px-3 py-2">{c.gender}</td>
            <td className="px-3 py-2">{c.segment}</td>
            <td className="px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColorMap[c.status ?? 'Nuovo']}`}>
                  {c.status}
                </span>
                <select
                  value={c.status}
                  onChange={(e) => onUpdateStatus(c.id, e.target.value as Candidate['status'])}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </td>
            <td className="px-3 py-2">
              {c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
