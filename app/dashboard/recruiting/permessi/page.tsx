'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Recruiter {
  id: string
  name: string
  email: string
  canEdit: boolean
}

export default function PermessiPage() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([])

  useEffect(() => {
    fetchRecruiters()
  }, [])

  const fetchRecruiters = async () => {
    const { data, error } = await supabase.from('recruiters').select('*')
    if (error) return console.error(error)
    setRecruiters(data || [])
  }

  const togglePermission = (id: string) => {
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, canEdit: !r.canEdit } : r))
    )
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      recruiters.map((r) => ({ Nome: r.name, Email: r.email, Permesso: r.canEdit ? '✅' : '❌' }))
    )
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, worksheet, 'Permessi')
    XLSX.writeFile(wb, 'permessi_recruiter.xlsx')
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-bg-dark">Permessi Recruiter</h1>
        <Button onClick={exportToExcel}>
          <Download className="w-4 h-4 mr-2" /> Esporta
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Modifica Dati</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recruiters.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 text-gray-800">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={r.canEdit}
                    onChange={() => togglePermission(r.id)}
                    className="accent-bg-red"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
