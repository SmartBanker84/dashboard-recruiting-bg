import StatisticsChart from "@/components/StatisticsChart";
import StatisticsFilters from "@/components/StatisticsFilters";

const fakeData = {
  "7": { labels: ["Lun", "Mar", "Mer", "Gio", "Ven"], values: [5, 8, 2, 9, 4] },
  "30": { labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"], values: [12, 18, 20, 15] },
  "90": { labels: ["Gen", "Feb", "Mar"], values: [40, 52, 47] },
};

export default function StatistichePage() {
  const [period, setPeriod] = useState("30");

  const { labels, values } = fakeData[period];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistiche recruiting</h1>
      <StatisticsFilters onFilter={setPeriod} />
      <StatisticsChart title="Candidati Convertiti" data={values} labels={labels} />
    </main>
  );
}
