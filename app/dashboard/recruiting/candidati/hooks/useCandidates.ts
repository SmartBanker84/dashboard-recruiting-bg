import { useEffect, useState } from 'react';
import { getCandidates } from '../services/candidates';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCandidates().then(data => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  return { candidates, loading };
};
