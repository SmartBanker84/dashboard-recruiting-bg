// hooks/useIntegrations.ts
import { useEffect, useState } from 'react';
import { getIntegratedCandidates } from '../services/integrations';

export const useIntegrations = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIntegratedCandidates().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  return { candidates, loading };
};
