'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: { source: string; count: number }[];
};

export default function KpiSourcePie({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.source),
    datasets: [
      {
        label: 'Candidati',
        data: data.map((d) => d.count),
        backgroundColor: [
          '#34d399',
          '#60a5fa',
          '#facc15',
          '#f87171',
          '#a78bfa',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
}
