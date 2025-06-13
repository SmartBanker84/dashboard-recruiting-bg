import { Pie } from 'react-chartjs-2'

interface AgeStats {
  '<25': number
  '25-34': number
  '35-44': number
  '45-54': number
  '55+': number
}

interface Props {
  ageStats: AgeStats
  small?: boolean   // <-- AGGIUNGI QUESTA LINEA
}

export function AgeDistributionChart({ ageStats, small = false }: Props) {
  const data = {
    labels: ['<25', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [
          ageStats['<25'],
          ageStats['25-34'],
          ageStats['35-44'],
          ageStats['45-54'],
          ageStats['55+'],
        ],
        backgroundColor: [
          '#60A5FA',
          '#FBBF24',
          '#34D399',
          '#F87171',
          '#A78BFA',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Pie
      data={data}
      options={{
        plugins: { legend: { display: !small, position: 'bottom' } },
        maintainAspectRatio: false,
      }}
      height={small ? 80 : 200}
      width={small ? 80 : 200}
    />
  )
}
