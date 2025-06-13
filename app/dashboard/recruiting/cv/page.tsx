import CVList from "@/components/CVList";
import { createServerClient } from "@/lib/supabase/server";

export default async function CVPage() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("cv_uploads")
    .select("id, filename, url, uploaded_at")
    .order("uploaded_at", { ascending: false });

  if (error) {
    return (
      <div className="text-red-500">
        Errore nel caricamento dei CV: {error.message}
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">CV Caricati</h1>
      <CVList data={data || []} />
    </main>
  );
}
