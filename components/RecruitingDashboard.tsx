'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export default function RecruitingDashboard() {
  const { user } = useAuth()
  const [candidates, setCandidates] = useState([])
  const [form, setForm] = useState({ name: '', email: '', note: '', file: null })

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)
    setCandidates(data || [])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))
  }

  const handleSubmit = async () => {
    let file_url = null
    if (form.file) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('candidates')
        .upload(`cv/${Date.now()}_${form.file.name}`, form.file)

      if (uploadError) return console.error(uploadError)
      const { data: publicUrl } = supabase.storage.from('candidates').getPublicUrl(uploadData.path)
      file_url = publicUrl.publicUrl
    }

    const { error } = await supabase.from('candidates').insert([
      {
        name: form.name,
        email: form.email,
        note: form.note,
        file_url,
        created_at: new Date().toISOString()
      }
    ])
    if (error) return console.error(error)
    fetchCandidates()
    setForm({ name: '', email: '', note: '', file: null })
  }

  return (
    <div className="min-h-screen bg-bg-light py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-bg-dark">Area Recruiting</h1>
          <p className="text-gray-600">Compila il form per inserire un candidato</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
          />
          <textarea
            name="note"
            placeholder="Note"
            value={form.note}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
          />
          <input type="file" onChange={handleFileChange} className="w-full" />
          <Button onClick={handleSubmit} className="mt-2">
            <Upload className="w-4 h-4 mr-2" /> Carica Candidato
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-bg-dark mb-4">Ultimi Candidati</h2>
          <ul className="space-y-2">
            {candidates.map((c) => (
              <li key={c.id} className="border-b pb-2">
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email} - {new Date(c.created_at).toLocaleDateString('it-IT')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
