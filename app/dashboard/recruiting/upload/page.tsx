'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function UploadPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setMessage('')

    let fileUrl = ''
    const user = await supabase.auth.getUser()
    const userId = user?.data?.user?.id ?? 'manual-upload'

    if (file) {
      const { data, error } = await supabase.storage
        .from('cv')
        .upload(`cv_${Date.now()}_${file.name}`, file)
      if (error) {
        setMessage('Errore durante il caricamento del file')
        setUploading(false)
        return
      }
      fileUrl = data?.path || ''
    }

    const { error } = await supabase.from('candidates').insert([
      {
        name,
        email,
        note,
        birthdate,
        file_url: fileUrl,
        created_by: userId
      }
    ])

    if (error) {
      setMessage('Errore durante il salvataggio del candidato')
    } else {
      setMessage('Candidato caricato con successo!')
      setName('')
      setEmail('')
      setNote('')
      setBirthdate('')
      setFile(null)
    }
    setUploading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold mb-4 text-bg-dark">Carica Nuovo Candidato</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="note">Note</Label>
          <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="birthdate">Data di Nascita</Label>
          <Input id="birthdate" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="file">Carica CV</Label>
          <Input id="file" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Caricamento...' : 'Carica'}
        </Button>
        {message && <p className="text-sm text-center text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  )
}
