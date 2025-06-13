// page.tsx
import { useConversion } from './hooks/useConversion';
import ConversionTable from './components/ConversionTable';

export default function ConversionPage() {
  const { candidates, loading, handleConvert } = useConversion();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Conversione Candidati</h2>
      {loading ? <p>Caricamento...</p> : (
        <ConversionTable data={candidates} onConvert={handleConvert} />
      )}
    </div>
  );
}
