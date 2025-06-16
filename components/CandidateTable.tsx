
'use client'

import React from 'react'
import { Candidate, CandidateStatus } from '@/types/candidate'
import { Button } from '@/components/ui/button'

export function CandidateTable({
  candidates,
  onUpdateStatus
}: {
  candidates: Candidate[]
  onUpdateStatus: (id: string, status: CandidateStatus) => void
}) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Nome</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Stato</th>
          <th className="border px-4 py-2">Azione</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c) => (
          <tr key={c.id}>
            <td className="border px-4 py-2">{c.name}</td>
            <td className="border px-4 py-2">{c.email}</td>
            <td className="border px-4 py-2">{c.status}</td>
            <td className="border px-4 py-2">
              <select
                value={c.status}
                onChange={(e) =>
                  onUpdateStatus(c.id, e.target.value as CandidateStatus)
                }
                className="border rounded px-2 py-1"
              >
                <option value="Nuovo">Nuovo</option>
                <option value="Contattato">Contattato</option>
                <option value="Colloquio">Colloquio</option>
                <option value="Onboarded">Onboarded</option>
                <option value="Scartato">Scartato</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
