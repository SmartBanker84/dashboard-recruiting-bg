'use client'

import { useState } from 'react'
import { Candidate } from '@/types/candidate'
import { cn } from '@/lib/utils'

interface Props {
  data: Candidate[]
  onUpdateStatus: (id: string, status: Candidate['status']) => void
}

export function CandidateTable({ data, onUpdateStatus }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('')

  const filteredData = statusFilter
    ? data.filter((c) => c.status === statusFilter)
    : data

  const statusOptions = ['Nuovo', 'Contattato', 'Colloquio', 'Onboarded', 'Scartato']

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
          Filtra per Stato:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Tutti</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Società</th>
              <th className="px-4 py-2 text-left">Genere</th>
              <th className="px-4 py-2 text-left">Segmento</th>
              <th className="px-4 py-2 text-left">Stato</th>
              <th className="px-4 py-2 text-left">Note</th>
              <th className="px-4 py-2 text-left">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.company}</td>
                <td className="px-4 py-2">{c.gender}</td>
                <td className="px-4 py-2">{c.segment}</td>
                <td className="px-4 py-2">
                  <select
                    value={c.status}
                    onChange={(e) => onUpdateStatus(c.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">{c.note}</td>
                <td className="px-4 py-2">
                  {c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
