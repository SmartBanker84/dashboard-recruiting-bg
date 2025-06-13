import { createServerClient } from '@/lib/supabase/server';
import ConversionTable from '@/components/ConversionTable';
import DashboardCard from '@/components/DashboardCard';

export default async function OverviewPage() {
  const supabase = createServerClient();

  const { data: candidates } = await supabase
    .from('candidates')
    .select('id, name, current_status');

  const activeCount = candidates?.filter((c) => c.current_status === 'Attivo').length || 0;
  const hiredCount = candidates?.filter((c) => c.current_status === 'Assunto').length || 0;
  const totalCV = candidates?.length || 0;
  const conversionRate = totalCV ? ((hiredCount / totalCV) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Overview Recruiting</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Candidati attivi" value={activeCount.toString()} />
        <DashboardCard title="CV caricati" value={totalCV.toString()} />
        <DashboardCard title="Tasso di conversione" value={`${conversionRate}%`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8 mb-2">Da convertire</h2>
        <ConversionTable data={candidates?.filter((c) => c.current_status !== 'Assunto') || []} />
      </div>
    </div>
  );
}
