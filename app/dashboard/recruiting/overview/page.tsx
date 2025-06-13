// app/dashboard/recruiting/overview/page.tsx

import DashboardCard from "@/components/DashboardCard";
import MonthlyChart from "@/components/MonthlyChart";
import AgeDistributionChart from "@/components/AgeDistributionChart";
import ConversionTable from "@/components/ConversionTable";

export default async function OverviewPage() {
  // TODO: caricare i dati reali da Supabase
  const kpi = {
    candidatiAttivi: 57,
    cvCaricati: 34,
    conversionRate: "23%",
  };

  const candidateData = [
    { id: "1", name: "Mario Rossi", current_status: "Colloquio" },
    { id: "2", name: "Luca Verdi", current_status: "Da contattare" },
  ];

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Overview Recruiting</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard label="Candidati attivi" value={kpi.candidatiAttivi} />
        <DashboardCard label="CV caricati" value={kpi.cvCaricati} />
        <DashboardCard label="Conversioni" value={kpi.conversionRate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyChart />
        <AgeDistributionChart />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Conversioni in corso</h2>
        <ConversionTable data={candidateData} onConvert={(id) => {}} />
      </div>
    </main>
  );
}
