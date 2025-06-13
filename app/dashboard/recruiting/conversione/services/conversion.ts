// services/conversion.ts
import { supabase } from '@/lib/supabaseClient';

export const getCandidatesToConvert = async () => {
  const { data, error } = await supabase
    .from('candidates')
    .select('id, name, current_status')
    .eq('current_status', 'recruiting'); // o altro filtro

  if (error) throw error;
  return data;
};

export const convertCandidate = async (id: string) => {
  const { error } = await supabase
    .from('candidates')
    .update({ current_status: 'manager' }) // o altro stato
    .eq('id', id);

  if (error) throw error;
};
