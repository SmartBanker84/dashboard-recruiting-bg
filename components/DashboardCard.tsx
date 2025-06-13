// components/DashboardCard.tsx

import { Card } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
};

export default function DashboardCard({ label, value }: Props) {
  return (
    <Card className="p-4 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </Card>
  );
}
