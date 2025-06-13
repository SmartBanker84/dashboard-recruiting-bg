// app/dashboard/kpi/useKpi.ts
import { useEffect, useState } from 'react';
import { getKpiData } from './kpi';
import type { KpiData } from '@/types/kpi';

export function useKpiData() {
  const [data, setData] = useState<KpiData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getKpiData()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, error, isLoading };
}
