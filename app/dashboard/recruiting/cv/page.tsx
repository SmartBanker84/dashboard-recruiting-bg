// page.tsx
import CVTable from './components/CVTable';
import { useCV } from './hooks/useCV';

export default function CVPage() {
  const { cvList, loading } = useCV();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Curriculum Candidati</h2>
      {loading ? <p>Caricamento...</p> : <CVTable data={cvList} />}
    </div>
  );
}
