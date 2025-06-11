import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET(req: NextRequest) {
  const { status, from, to } = Object.fromEntries(req.nextUrl.searchParams);
  const query = sb.from('candidates').select('*')
    .eq(status ? 'status' : undefined, status)
    .gte(from ? 'created_at' : undefined, from)
    .lte(to ? 'created_at' : undefined, to);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const candidate = await req.json();
  const { data, error } = await sb.from('candidates').insert([candidate]);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}
