// page.tsx
import UploadForm from './components/UploadForm';
import { useUpload } from './hooks/useUpload';

export default function UploadPage() {
  const { handleUpload, loading } = useUpload();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Carica un CV</h2>
      <UploadForm onUpload={handleUpload} />
      {loading && <p>Caricamento in corso...</p>}
    </div>
  );
}
