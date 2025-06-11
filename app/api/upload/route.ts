import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File;
  const id = form.get('id') as string;

  const { data, error } = await sb.storage
    .from('cvs')
    .upload(`cvs/${id}-${file.name}`, file);
  if (error) return NextResponse.json({ error }, { status: 500 });
  await sb.from('candidates').update({ cv_url: data.path }).eq('id', id);
  return NextResponse.json({ path: data.path });
}
