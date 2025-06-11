'use client'

import { Candidate } from '@/types/candidate'

export function CandidateTable({
  data,
  onUpdateStatus,
}: {
  data: Candidate[]
  onUpdateStatus: (id: string, status: Candidate['status']) => void
}) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-left">
          <th className="px-4 py-2">Nome</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Società</th>
          <th className="px-4 py-2">Genere</th>
          <th className="px-4 py-2">Segmento</th>
          <th className="px-4 py-2">Stato</th>
          <th className="px-4 py-2">Data</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {data.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-2">{c.name}</td>
            <td className="px-4 py-2">{c.email}</td>
            <td className="px-4 py-2">{c.company}</td>
            <td className="px-4 py-2">{c.gender}</td>
            <td className="px-4 py-2">{c.segment}</td>
            <td className="px-4 py-2">
              <select
                value={c.status}
                onChange={(e) => onUpdateStatus(c.id, e.target.value as Candidate['status'])}
                className="border rounded px-2 py-1"
              >
                {['Nuovo', 'Colloquio', 'Onboarded'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2">{c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
