"use client";

import { useState } from "react";

type Props = {
  onFilter: (period: string) => void;
};

export default function StatisticsFilters({ onFilter }: Props) {
  const [period, setPeriod] = useState("30");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      <label htmlFor="period" className="font-medium">Periodo:</label>
      <select
        id="period"
        value={period}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      >
        <option value="7">Ultimi 7 giorni</option>
        <option value="30">Ultimi 30 giorni</option>
        <option value="90">Ultimi 90 giorni</option>
      </select>
    </div>
  );
}
