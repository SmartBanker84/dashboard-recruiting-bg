'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AddCandidateModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddCandidateModal({ open, onClose, onSuccess }: AddCandidateModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    birthdate: '',
    note: '',
    company: '',
    gender: '',
    segment: '',
    status: 'Contattato',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    const { error } = await supabase.from('candidates').insert([form])
    setLoading(false)
    if (!error) {
      onSuccess()
      onClose()
      setForm({
        name: '',
        email: '',
        birthdate: '',
        note: '',
        company: '',
        gender: '',
        segment: '',
        status: 'Contattato'
      })
    } else {
      alert('Errore durante l’inserimento')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-bg-dark">Aggiungi Candidato</h2>

        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="w-full border rounded px-3 py-2" />

        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border rounded px-3 py-2" />

        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} placeholder="Data di nascita" className="w-full border rounded px-3 py-2" />

        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Banca / Società di provenienza" className="w-full border rounded px-3 py-2" />

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="">Genere</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="Altro">Altro</option>
        </select>

        <select name="segment" value={form.segment} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="">Segmento</option>
          <option value="CF">Consulente Finanziario</option>
          <option value="Banker">Private Banker</option>
        </select>

        <textarea name="note" value={form.note} onChange={handleChange} placeholder="Note" className="w-full border rounded px-3 py-2" />

        <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="Contattato">Contattato</option>
          <option value="Colloquio 1">Colloquio 1</option>
          <option value="Colloquio 2">Colloquio 2</option>
          <option value="Inserito">Inserito</option>
        </select>

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
