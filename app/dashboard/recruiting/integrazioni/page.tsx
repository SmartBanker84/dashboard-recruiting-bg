'use client'
import { useIntegrations } from './hooks/useIntegrations';
import IntegrationTable from './components/IntegrationTable';

export default function IntegrazioniPage() {
  const { candidates, loading } = useIntegrations();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Integrazioni Esterne</h2>
      {loading ? <p>Caricamento…</p> : <IntegrationTable data={candidates} />}
    </div>
  );
}
