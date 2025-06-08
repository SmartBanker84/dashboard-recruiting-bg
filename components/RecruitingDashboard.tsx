'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase, Candidate } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Upload, Download, Edit, Trash2 } from 'lucide-react'

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    note: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { user, userRole, signOut } = useAuth()

  useEffect(() => {
    if (userRole) fetchCandidates()
  }, [userRole])

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCandidates(data || [])
    } catch (error) {
      console.error('Error fetching candidates:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userRole?.role !== 'recruiting') return
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('candidates')
        .insert([
          {
            ...newCandidate,
            created_by: user?.id
          }
        ])

      if (error) throw error

      setNewCandidate({ name: '', email: '', note: '' })
      fetchCandidates()
    } catch (error) {
      console.error('Error creating candidate:', error)
    }

    setLoading(false)
  }

  const handleFileUpload = async (candidateId: string, file: File) => {
    if (userRole?.role !== 'recruiting') return
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${candidateId}_${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('cv-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('cv-files')
        .getPublicUrl(fileName)

      await supabase
        .from('candidates')
        .update({ file_url: publicUrl })
        .eq('id', candidateId)

      fetchCandidates()
    } catch (error) {
      console.error('Error uploading file:', error)
    }

    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (userRole?.role !== 'recruiting') return
    if (!confirm('Sei sicuro di voler eliminare questo candidato?')) return

    try {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchCandidates()
    } catch (error) {
      console.error('Error deleting candidate:', error)
    }
  }

  if (!userRole) return <div className="p-8">Caricamento...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {userRole.role === 'manager' ? 'Dashboard Manager' : 'Dashboard Recruiting'}
            </h1>
            <p className="text-sm text-gray-500">Banca Generali Private</p>
          </div>
          <Button onClick={() => signOut()} variant="outline">Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {userRole.role === 'recruiting' && (
          <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Aggiungi Candidato</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="note">Note</Label>
                <textarea
                  id="note"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newCandidate.note}
                  onChange={(e) => setNewCandidate({ ...newCandidate, note: e.target.value })}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Caricamento...' : 'Aggiungi'}
              </Button>
            </form>
          </section>
        )}

        <section className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Lista Candidati ({candidates.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CV</th>
                  {userRole.role === 'recruiting' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Azioni</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{candidate.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{candidate.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{candidate.note}</td>
                    <td className="px-6 py-4 text-sm">
                      {candidate.file_url ? (
                        <a href={candidate.file_url} target="_blank" className="text-red-600 hover:underline">
                          <Download className="w-4 h-4 inline mr-1" /> Scarica
                        </a>
                      ) : userRole.role === 'recruiting' ? (
                        <label className="cursor-pointer text-red-600 hover:underline">
                          <Upload className="w-4 h-4 inline mr-1" /> Carica CV
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(candidate.id, file)
                            }}
                          />
                        </label>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    {userRole.role === 'recruiting' && (
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(candidate.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
