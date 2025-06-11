import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'

export async function GET() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Errore GET /api/candidates:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data, error } = await supabase
      .from('candidates')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Errore POST /api/candidates:', error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    console.error('Errore interno POST:', err)
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 })
  }
}
