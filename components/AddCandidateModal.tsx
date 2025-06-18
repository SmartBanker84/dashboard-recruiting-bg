'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { CandidateForm } from '@/types/form'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddCandidateModal({ open, onClose, onSuccess }: Props) {
  const initialForm: CandidateForm = {
    name: '',
    email: '',
    birthdate: '',
    note: '',
    company: '',
    gender: '',
    segment: '',
    status: 'Nuovo',
  }

  const [form, setForm] = useState<CandidateForm>(initialForm)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCVUpload = async (file: File, candidateId: string) => {
    const filePath = `${candidateId}/${file.name}`
    const { error: uploadError } = await supabase.storage.from('cv').upload(filePath, file, { upsert: true })
    if (uploadError) throw new Error('Caricamento fallito: ' + uploadError.message)

    const { data } = supabase.storage.from('cv').getPublicUrl(filePath)
    const publicUrl = data?.publicUrl

    const { error: dbError } = await supabase.from('uploads').insert([{
      candidate_id: candidateId,
      file_name: file.name,
      file_url: publicUrl,
      uploaded_at: new Date().toISOString(),
    }])
    if (dbError) throw new Error('Errore salvataggio metadati: ' + dbError.message)

    return publicUrl
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert('Nome ed Email obbligatori')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.from('candidates').insert([form]).select().single()
    if (error || !data) {
      setLoading(false)
      alert('Errore inserimento: ' + (error?.message || ''))
      return
    }

    if (cvFile) {
      try {
        await handleCVUpload(cvFile, data.id)
      } catch (err: any) {
        alert('Errore caricamento CV: ' + err.message)
      }
    }

    setLoading(false)
    onSuccess()
    onClose()
    setForm(initialForm)
    setCvFile(null)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-bg-dark">Aggiungi Candidato</h2>

        {['name', 'email', 'birthdate', 'company'].map((field) => (
          <input
            key={field}
            type={field === 'birthdate' ? 'date' : field === 'email' ? 'email' : 'text'}
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={field === 'company' ? 'Società di provenienza' : field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border rounded px-3 py-2"
          />
        ))}

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="">Seleziona Genere</option>
          <option value="Maschio">Maschio</option>
          <option value="Femmina">Femmina</option>
          <option value="Altro">Altro</option>
        </select>

        <select name="segment" value={form.segment} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="">Seleziona Segmento</option>
          <option value="CF">CF</option>
          <option value="Banker">Banker</option>
        </select>

        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note"
          className="w-full border rounded px-3 py-2"
        />

        <div>
          <label className="block text-sm text-gray-700 mb-1">Carica CV</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Annulla</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            {loading ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </div>
    </div>
  )
}
