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
  const { user, signOut } = useAuth()

  useEffect(() => {
    fetchCandidates()
  }, [])

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
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${candidateId}_${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('cv-files')
        .upload(fileName, file)

      if (error) throw error

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

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-bg-dark">
                Dashboard Recruiting Manager
              </h1>
              <p className="text-gray-600">Banca Generali - Distretto Magnani</p>
            </div>
            <Button onClick={() => signOut()} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Candidate Form */}
        <div className="bg-white rounded-lg card-shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">
            Aggiungi Nuovo Candidato
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <textarea
                id="note"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-red"
                rows={3}
                value={newCandidate.note}
                onChange={(e) => setNewCandidate({...newCandidate, note: e.target.value})}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Aggiunta in corso...' : 'Aggiungi Candidato'}
            </Button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-lg card-shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-bg-dark">
              Lista Candidati ({candidates.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {candidate.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.file_url ? (
                        <a 
                          href={candidate.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bg-red hover:underline"
                        >
                          <Download className="w-4 h-4 inline mr-1" />
                          Scarica
                        </a>
                      ) : (
                        <label className="cursor-pointer text-bg-red hover:underline">
                          <Upload className="w-4 h-4 inline mr-1" />
                          Carica CV
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(candidate.id, file)
                            }}
                          />
                        </label>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {/* Edit functionality */}}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(candidate.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
