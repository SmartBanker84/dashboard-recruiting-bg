import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Usa sempre le variabili uniformi in tutto il progetto!
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const id = formData.get('id') as string

    if (!(file instanceof Blob) || !id) {
      return NextResponse.json({ error: 'File o ID mancanti o non validi' }, { status: 400 })
    }

    // Ottieni il nome del file se disponibile, altrimenti default
    const fileName = (file as File).name ?? 'file.pdf'
    const filePath = `cv/${id}/${fileName}`

    // Converte il file in buffer per Supabase Storage
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('cv')
      .upload(filePath, buffer, { upsert: true })

    if (uploadError) {
      console.error('Errore upload file:', uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase
      .storage
      .from('cv')
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: 'Errore nel recupero della URL pubblica' }, { status: 500 })
    }

    const { error: updateError } = await supabase
      .from('candidates')
      .update({ file_url: urlData.publicUrl })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ path: urlData.publicUrl }, { status: 200 })

  } catch (err: any) {
    console.error('Errore generico upload:', err?.message ?? err)
    return NextResponse.json({ error: 'Errore generico del server' }, { status: 500 })
  }
}
