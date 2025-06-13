'use client'

import { useEffect, useState } from 'react'
import { getCandidatesToConvert, convertCandidate } from '../services/conversion'

export const useConversion = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCandidatesToConvert().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const handleConvert = async (id: string) => {
    await convertCandidate(id);
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  return { candidates, loading, handleConvert };
};
