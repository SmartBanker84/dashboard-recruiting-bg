import { ReactNode } from "react";

interface KPIBoxProps {
  label: string;
  value: number;
  icon: ReactNode;
}

export default function KPIBox({ label, value, icon }: KPIBoxProps) {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border">
      <div>{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
