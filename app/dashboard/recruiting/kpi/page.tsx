// app/dashboard/kpi/page.tsx
import { useKpiData } from './useKpi';
import { KpiCards } from './KpiCards';

export default function KpiPage() {
  const { data, isLoading, error } = useKpiData();

  if (isLoading) return <div>Caricamento KPI...</div>;
  if (error) return <div>Errore nel caricamento KPI</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Key Performance Indicators</h1>
      <KpiCards kpi={data} />
    </div>
  );
}
