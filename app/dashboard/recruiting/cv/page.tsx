'use client'

import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

type CVFile = {
  name: string
  url: string
}

export default function CvPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [files, setFiles] = useState<CVFile[]>([])
  const [loadingFiles, setLoadingFiles] = useState(true)

  const bucket = 'cv'

  useEffect(() => {
    fetchFiles()
    // eslint-disable-next-line
  }, [])

  async function fetchFiles() {
    setLoadingFiles(true)
    setError(null)
    const { data, error } = await supabase.storage.from(bucket).list('', {limit:100})
    if (error) setError('Errore caricamento lista file')
    else {
      const cvFiles = await Promise.all(
        (data?.map(async (file: any) => {
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(file.name)
          return {
            name: file.name,
            url: urlData.publicUrl,
          }
        }) ?? [])
      )
      setFiles(cvFiles)
    }
    setLoadingFiles(false)
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (!file) {
      setError('Seleziona un file')
      return
    }
    setUploading(true)
    const filePath = `${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from(bucket).upload(filePath, file)
    if (error) setError('Errore durante upload')
    else {
      setSuccess(true)
      setFile(null)
      fetchFiles()
    }
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Upload CV / Documenti</h1>
      <form onSubmit={handleUpload} className="mb-8 flex flex-col gap-4 max-w-md bg-white p-6 rounded-xl shadow">
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="border rounded p-2"
          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
        />
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Caricamento...' : 'Carica'}
        </Button>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">File caricato!</div>}
      </form>
      <h2 className="text-xl font-semibold mb-3">File caricati</h2>
      {loadingFiles ? (
        <div>Caricamento lista file...</div>
      ) : files.length === 0 ? (
        <div className="text-gray-500">Nessun file presente.</div>
      ) : (
        <ul className="space-y-2">
          {files.map(f => (
            <li key={f.name} className="flex items-center gap-3 bg-white rounded p-3 shadow">
              <span className="flex-1 truncate">{f.name}</span>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                download
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
