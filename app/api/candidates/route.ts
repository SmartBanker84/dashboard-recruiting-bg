import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.from('candidates').select('*')
  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const supabase = createClient()
  const { error } = await supabase.from('candidates').insert([body])
  return error ? NextResponse.json({ error: error.message }, { status: 400 }) : NextResponse.json({ success: true })
}
