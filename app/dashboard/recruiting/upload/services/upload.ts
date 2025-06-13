// services/upload.ts
import { supabase } from '@/lib/supabaseClient';

export const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('cv')
    .upload(`cv/${Date.now()}_${file.name}`, file);

  if (error) throw error;
  return data;
};
