'use client'

import React from 'react'
import { Candidate, CandidateStatus } from '@/types/candidate'
import { STATUS_OPTIONS } from '@/constants/statuses'
import { Button } from '@/components/ui/button'

interface CandidateTableProps {
  candidates: Candidate[]
  onUpdateStatus: (id: string, status: CandidateStatus) => void
}

export function CandidateTable({ candidates, onUpdateStatus }: CandidateTableProps) {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Stato</th>
            <th className="border px-4 py-2">Azione</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50 transition">
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.email}</td>
              <td className="border px-4 py-2">{c.status}</td>
              <td className="border px-4 py-2">
                <select
                  value={c.status}
                  onChange={(e) =>
                    onUpdateStatus(c.id, e.target.value as CandidateStatus)
                  }
                  className="border rounded px-2 py-1 bg-white"
                >
                  {STATUS_OPTIONS.map((status) => (
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
    </div>
  )
}
