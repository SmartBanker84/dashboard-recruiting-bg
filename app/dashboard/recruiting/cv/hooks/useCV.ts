// hooks/useCV.ts
import { useEffect, useState } from 'react';
import { fetchCVs } from '../services/cv';

export const useCV = () => {
  const [cvList, setCVList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCVs().then((data) => {
      setCVList(data);
      setLoading(false);
    });
  }, []);

  return { cvList, loading };
};
