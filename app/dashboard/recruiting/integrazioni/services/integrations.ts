// services/integrations.ts
import { supabase } from '@/lib/supabaseClient';

export const getIntegratedCandidates = async () => {
  const { data, error } = await supabase
    .from('candidates')
    .select('id, name, source, status')
    .in('source', ['LinkedIn', 'WeConnect', 'SalesNavigator']);

  if (error) throw error;
  return data;
};
