'use client'
import { Candidate } from '@/types/candidate'

export function CandidateTable({ data, onUpdateStatus }: {
  data: Candidate[]
  onUpdateStatus: (id: string, status: Candidate['status']) => void
}) {
  return (
    <table className="min-w-full text-sm">
      <thead><tr>
        <th>Nome</th><th>Email</th><th>Società</th><th>Genere</th><th>Segmento</th><th>Stato</th><th>Data</th>
      </tr></thead>
      <tbody>
        {data.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.company}</td>
            <td>{c.gender}</td>
            <td>{c.segment}</td>
            <td>
              <select value={c.status} onChange={(e) => onUpdateStatus(c.id, e.target.value as any)}>
                {['Nuovo','Colloquio','Onboarded'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
            <td>{new Date(c.created_at).toLocaleDateString('it-IT')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
