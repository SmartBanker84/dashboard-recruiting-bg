// services/cv.ts
import { supabase } from '@/lib/supabaseClient';

export const fetchCVs = async () => {
  const { data, error } = await supabase
    .from('cv')
    .select('id, file_url, candidate_name');

  if (error) throw error;
  return data;
};
