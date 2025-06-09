
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'OTP email inviata con successo' }, { status: 200 })
  } catch (err) {
    console.error('Errore login OTP:', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
