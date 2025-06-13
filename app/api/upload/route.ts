import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase server-side client con SERVICE ROLE KEY
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    const id = form.get('id') as string

    if (!file || !id) {
      return NextResponse.json({ error: 'File o ID mancante' }, { status: 400 })
    }

    const path = `cv/${id}-${file.name}`

    // Upload del file nel bucket "cv"
    const { data, error: uploadError } = await supabase.storage
      .from('cv')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      console.error('Errore upload:', uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Ottieni URL pubblico
    const { data: publicUrlData } = supabase.storage.from('cv').getPublicUrl(path)

    if (!publicUrlData?.publicUrl) {
      return NextResponse.json({ error: 'URL pubblico non generato' }, { status: 500 })
    }

    // Aggiorna il record del candidato con l’URL del CV
    const { error: updateError } = await supabase
      .from('candidates')
      .update({ cv_url: publicUrlData.publicUrl })
      .eq('id', id)

    if (updateError) {
      console.error('Errore aggiornamento candidato:', updateError.message)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ path: publicUrlData.publicUrl }, { status: 200 })
  } catch (err) {
    console.error('Errore interno API Upload:', err)
    return NextResponse.json({ error: 'Errore interno server' }, { status: 500 })
  }
}
