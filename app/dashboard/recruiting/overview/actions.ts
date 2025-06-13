'use server'

import { createServerClient } from '@/lib/supabase/server'

export async function convertCandidate(id: string) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from('candidates')
    .update({ current_status: 'Assunto' })
    .eq('id', id);

  if (error) throw new Error(error.message);
}
