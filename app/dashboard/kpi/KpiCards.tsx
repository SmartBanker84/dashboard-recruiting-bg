// app/dashboard/kpi/KpiCards.tsx
import type { KpiData } from '@/types/kpi';
import { Card } from '@/components/ui/card';

type Props = { kpi: KpiData };

export function KpiCards({ kpi }: Props) {
  const items = [
    { label: 'Candidati Totali', value: kpi.total },
    { label: 'In Colloquio', value: kpi.in_colloquio },
    { label: 'Assunti', value: kpi.assunti },
    { label: 'Conversion Rate', value: `${kpi.conversion_rate}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="p-4">
          <div className="text-sm text-gray-500">{item.label}</div>
          <div className="text-xl font-bold">{item.value}</div>
        </Card>
      ))}
    </div>
  );
}
