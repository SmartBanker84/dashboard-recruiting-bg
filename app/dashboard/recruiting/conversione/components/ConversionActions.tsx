// components/ConversionActions.tsx
import { useState } from 'react';

type Props = {
  onConfirm: () => Promise<void>;
};

export default function ConversionActions({ onConfirm }: Props) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true); // Primo click: conferma visiva
      setTimeout(() => setConfirmed(false), 3000); // Reset dopo 3s
      return;
    }

    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-2 py-1 rounded text-white ${confirmed ? 'bg-yellow-500' : 'bg-green-600'}`}
    >
      {loading ? 'Convertendo...' : confirmed ? 'Conferma?' : 'Converti'}
    </button>
  );
}
