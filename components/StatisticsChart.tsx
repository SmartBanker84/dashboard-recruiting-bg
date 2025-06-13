"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

type Props = {
  data: number[];
  labels: string[];
  title: string;
};

export default function StatisticsChart({ data, labels, title }: Props) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Bar
        data={{
          labels,
          datasets: [{ label: title, data, backgroundColor: "#3b82f6" }],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
        }}
      />
    </div>
  );
}
