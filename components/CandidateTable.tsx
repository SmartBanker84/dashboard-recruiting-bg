'use client'

import { Candidate, CandidateStatus } from '@/types/candidate'
import { Button } from '@/components/ui/button'

type Props = {
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

export default function CandidateTable({ candidates, onUpdateStatus }: Props) {
  return (
    <table className="w-full table-auto border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Nome</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Società</th>
          <th className="px-4 py-2 border">Stato</th>
          <th className="px-4 py-2 border">Azione</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate.id} className="text-center">
            <td className="px-4 py-2 border">{candidate.name}</td>
            <td className="px-4 py-2 border">{candidate.email}</td>
            <td className="px-4 py-2 border">{candidate.company}</td>
            <td className="px-4 py-2 border">{candidate.status}</td>
            <td className="px-4 py-2 border">
              <select
                value={candidate.status}
                onChange={(e) =>
                  onUpdateStatus(candidate.id, e.target.value as CandidateStatus)
                }
                className="border rounded px-2 py-1"
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
