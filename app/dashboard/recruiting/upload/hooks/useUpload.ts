// hooks/useUpload.ts
import { useState } from 'react';
import { uploadFile } from '../services/upload';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    await uploadFile(file);
    setLoading(false);
  };

  return { handleUpload, loading };
};
