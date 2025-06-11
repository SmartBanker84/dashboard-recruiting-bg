import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ⚠️ Assicurati che questi valori siano definiti in `.env` o `.env.local`
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Usa il service role solo lato server
)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const id = formData.get('id') as string

    if (!file || !id) {
      return NextResponse.json({ error: 'File o ID mancanti' }, { status: 400 })
    }

    const filePath = `cv/${id}/${file.name}`

    const { data, error: uploadError } = await supabase
      .storage
      .from('cv')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error('Errore upload file:', uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase
      .storage
      .from('cv')
      .getPublicUrl(filePath)

    const { error: updateError } = await supabase
      .from('candidates')
      .update({ file_url: urlData.publicUrl })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ path: urlData.publicUrl }, { status: 200 })

  } catch (err: any) {
    console.error('Errore generico upload:', err.message)
    return NextResponse.json({ error: 'Errore generico del server' }, { status: 500 })
  }
}
