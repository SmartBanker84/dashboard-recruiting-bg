import { CandidateTable } from './components/CandidateTable';
import { useCandidates } from './hooks/useCandidates';

export default function CandidatesPage() {
  const { candidates, loading } = useCandidates();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <CandidateTable data={candidates} />
    </div>
  );
}
