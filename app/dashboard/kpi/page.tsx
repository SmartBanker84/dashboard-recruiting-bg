import KpiMonthlyChart from '@/components/kpi/KpiMonthlyChart';
import KpiSourcePie from '@/components/kpi/KpiSourcePie';
import { createServerClient } from '@/lib/supabase/server';

export default async function KpiPage() {
  const supabase = createServerClient();

  const { data: candidates } = await supabase.from('candidates').select('created_at, source, current_status');

  const monthly = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2025, i).toLocaleString('it-IT', { month: 'short' });
    const count = candidates?.filter(c =>
      new Date(c.created_at).getMonth() === i &&
      c.current_status === 'Assunto'
    ).length || 0;

    return { month, count };
  });

  const sources = Array.from(
    candidates?.reduce((map, c) => {
      map.set(c.source, (map.get(c.source) || 0) + 1);
      return map;
    }, new Map<string, number>()) || []
  ).map(([source, count]) => ({ source, count }));

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">KPI Recruiting</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Assunzioni mensili</h2>
          <KpiMonthlyChart data={monthly} />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Distribuzione per fonte</h2>
          <KpiSourcePie data={sources} />
        </div>
      </div>
    </div>
  );
}
