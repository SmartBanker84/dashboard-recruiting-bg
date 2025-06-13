'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

type Props = {
  data: { month: string; count: number }[];
};

export default function KpiMonthlyChart({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: 'Assunzioni',
        data: data.map((d) => d.count),
        fill: false,
        borderColor: 'rgba(34,197,94,1)',
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}
