import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase, Candidate } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Upload, Download, Edit, Trash2 } from 'lucide-react'

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false })
    if (!error) setCandidates(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('candidates').insert([{ ...newCandidate, created_by: user?.id }])
    if (!error) {
      setNewCandidate({ name: '', email: '', note: '' })
      fetchCandidates()
    }

    setLoading(false)
  }

  const handleFileUpload = async (candidateId: string, file: File) => {
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${candidateId}_${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('cv-files').upload(fileName, file)
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('cv-files').getPublicUrl(fileName)
      await supabase.from('candidates').update({ file_url: publicUrl }).eq('id', candidateId)
      fetchCandidates()
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Eliminare questo candidato?')) {
      const { error } = await supabase.from('candidates').delete().eq('id', id)
      if (!error) fetchCandidates()
    }
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-bg-dark">Dashboard Recruiting</h1>
            <p className="text-sm text-gray-500">Inserimento candidati BG</p>
          </div>
          <Button variant="outline" onClick={signOut}>Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-6 card-shadow mb-6">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">Aggiungi Candidato</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={newCandidate.name} onChange={e => setNewCandidate({ ...newCandidate, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={newCandidate.email} onChange={e => setNewCandidate({ ...newCandidate, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label htmlFor="note">Note</Label>
              <textarea id="note" rows={3} className="w-full border px-3 py-2 rounded-md" value={newCandidate.note} onChange={e => setNewCandidate({ ...newCandidate, note: e.target.value })} />
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Aggiunta in corso…' : 'Aggiungi'}</Button>
          </form>
        </div>

        <div className="bg-white rounded-lg p-6 card-shadow">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">Candidati ({candidates.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Nome</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Email</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Note</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">CV</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {candidates.map(c => (
                  <tr key={c.id}>
                    <td className="px-4 py-2 text-sm">{c.name}</td>
                    <td className="px-4 py-2 text-sm">{c.email}</td>
                    <td className="px-4 py-2 text-sm">{c.note}</td>
                    <td className="px-4 py-2 text-sm">
                      {c.file_url ? (
                        <a href={c.file_url} target="_blank" className="text-bg-red underline">
                          <Download className="inline w-4 h-4 mr-1" /> Scarica
                        </a>
                      ) : (
                        <label className="text-bg-red underline cursor-pointer">
                          <Upload className="inline w-4 h-4 mr-1" /> Carica
                          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(c.id, file)
                          }} />
                        </label>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
