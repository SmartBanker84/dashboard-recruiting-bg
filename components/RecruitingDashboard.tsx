'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase, Candidate } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Upload, Download, Trash2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

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
        .eq('created_by', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCandidates(data || [])
    } catch (error) {
      console.error('Errore nel recupero candidati:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('candidates').insert([
        {
          ...newCandidate,
          created_by: user?.id
        }
      ])

      if (error) throw error
      setNewCandidate({ name: '', email: '', note: '' })
      fetchCandidates()
    } catch (error) {
      console.error('Errore in creazione candidato:', error)
    }

    setLoading(false)
  }

  const handleFileUpload = async (candidateId: string, file: File) => {
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${candidateId}_${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('cv-files').upload(fileName, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('cv-files').getPublicUrl(fileName)
      const { error: updateError } = await supabase
        .from('candidates')
        .update({ file_url: publicUrl })
        .eq('id', candidateId)

      if (updateError) throw updateError
      fetchCandidates()
    } catch (error) {
      console.error('Errore nel caricamento file:', error)
    }

    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Confermi eliminazione candidato?')) return

    try {
      const { error } = await supabase.from('candidates').delete().eq('id', id)
      if (error) throw error
      fetchCandidates()
    } catch (error) {
      console.error('Errore eliminazione candidato:', error)
    }
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-bg-dark">Dashboard Recruiting</h1>
            <p className="text-gray-600">Banca Generali - Distretto</p>
          </div>
          <Button onClick={() => signOut()} variant="outline">Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">Aggiungi Candidato</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={newCandidate.email} onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="note">Note</Label>
              <textarea id="note" rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2" value={newCandidate.note} onChange={(e) => setNewCandidate({ ...newCandidate, note: e.target.value })}></textarea>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={loading}>{loading ? 'Aggiunta in corso...' : 'Aggiungi Candidato'}</Button>
            </div>
          </form>
        </div>

        {/* LISTA CANDIDATI */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">Lista Candidati</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-left">CV</th>
                  <th className="px-4 py-2 text-left">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {candidates.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2 font-medium text-gray-800">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.note}</td>
                    <td className="px-4 py-2">
                      {c.file_url ? (
                        <a href={c.file_url} target="_blank" className="text-bg-red underline">CV</a>
                      ) : (
                        <label className="text-bg-red underline cursor-pointer">
                          <Upload className="w-4 h-4 inline mr-1" />Carica
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(c.id, file)
                            }}
                          />
                        </label>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {uploading && <Progress value={100} className="mt-4" />}
        </div>
      </main>
    </div>
  )
}
