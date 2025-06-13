import DashboardCard from "@/components/DashboardCard";
import MonthlyChart from "@/components/MonthlyChart";
import AgeDistributionChart from "@/components/AgeDistributionChart";
import ConversionTable from "@/components/ConversionTable";
import { createServerClient } from "@/lib/supabase/server";

export default async function OverviewPage() {
  const supabase = createServerClient();

  const { data: candidati, error: errorCandidati } = await supabase
    .from("candidati")
    .select("id, current_status");

  const { data: cvData, error: errorCv } = await supabase
    .from("upload")
    .select("id");

  const attivi = candidati?.filter(c => c.current_status !== "Assunto") ?? [];
  const totale = candidati?.length ?? 0;
  const conversionRate =
    totale > 0 ? ((1 - attivi.length / totale) * 100).toFixed(1) + "%" : "N/A";

  const kpi = {
    candidatiAttivi: attivi.length,
    cvCaricati: cvData?.length ?? 0,
    conversionRate,
  };

  const candidateData = attivi.map(c => ({
    id: c.id,
    name: `Candidato ${c.id}`, // da sostituire con nome reale se disponibile
    current_status: c.current_status,
  }));

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
