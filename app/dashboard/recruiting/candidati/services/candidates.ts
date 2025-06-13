import { supabase } from '@/lib/supabaseClient';

export const getCandidates = async () => {
  const { data, error } = await supabase.from('candidates').select('*');
  if (error) throw error;
  return data;
};
