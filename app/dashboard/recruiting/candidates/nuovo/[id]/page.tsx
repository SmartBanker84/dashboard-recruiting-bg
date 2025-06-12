import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { notFound } from "next/navigation"
import DeleteCandidatoButton from "./DeleteCandidatoButton"

export default async function CandidatoDetailPage({ params }: { params: { id: string } }) {
  const { data: candidato, error } = await supabase
    .from("candidati")
    .select("id, nome, email, posizione, stato")
    .eq("id", params.id)
    .single()

  if (error || !candidato) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dettaglio candidato</h1>
      <div className="bg-white rounded shadow p-6 max-w-lg space-y-3">
        <div>
          <span className="font-medium">Nome:</span> {candidato.nome}
        </div>
        <div>
          <span className="font-medium">Email:</span> {candidato.email}
        </div>
        <div>
          <span className="font-medium">Posizione:</span> {candidato.posizione}
        </div>
        <div>
          <span className="font-medium">Stato:</span> {candidato.stato}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Link
          href={`/dashboard/recruiting/candidati/${candidato.id}/modifica`}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Modifica
        </Link>
        <DeleteCandidatoButton id={candidato.id} />
        <Link
          href="/dashboard/recruiting/candidati"
          className="inline-block mt-2 text-red-600 hover:underline"
        >
          ← Torna all’elenco candidati
        </Link>
      </div>
    </div>
  )
}
