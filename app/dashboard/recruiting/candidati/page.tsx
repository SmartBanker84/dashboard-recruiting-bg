"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Candidato = {
  id: string
  nome: string
  email: string
  posizione: string
  stato: string
}

export default function CandidatiPage() {
  const [candidati, setCandidati] = useState<Candidato[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchCandidati() {
    setLoading(true)
    setError(null)
    let query = supabase
      .from("candidati")
      .select("id, nome, email, posizione, stato")
      .order("created_at", { ascending: false })

    // Ricerca base su nome, email, posizione
    if (search) {
      query = query.or(
        `nome.ilike.%${search}%,email.ilike.%${search}%,posizione.ilike.%${search}%`
      )
    }

    const { data, error } = await query
    if (error) setError(error.message)
    else setCandidati(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidati()
    // eslint-disable-next-line
  }, [search])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Candidati</h1>
        <Link
          href="/dashboard/recruiting/candidati/nuovo"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          + Nuovo candidato
        </Link>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <input
          type="text"
          placeholder="Cerca per nome, email o posizione..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:max-w-sm"
        />
        <button
          className="text-sm text-gray-400 hover:text-gray-600"
          onClick={() => setSearch("")}
        >
          Pulisci ricerca
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Posizione</th>
              <th className="py-2 px-4 border-b">Stato</th>
              <th className="py-2 px-4 border-b text-center">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">Caricamento...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-red-600">{error}</td>
              </tr>
            ) : candidati.length ? (
              candidati.map((c) => (
                <tr key={c.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{c.nome}</td>
                  <td className="py-2 px-4 border-b">{c.email}</td>
                  <td className="py-2 px-4 border-b">{c.posizione}</td>
                  <td className="py-2 px-4 border-b">{c.stato}</td>
                  <td className="py-2 px-4 border-b text-center space-x-3">
                    <Link
                      href={`/dashboard/recruiting/candidati/${c.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Dettagli
                    </Link>
                    <Link
                      href={`/dashboard/recruiting/candidati/${c.id}/modifica`}
                      className="text-yellow-600 hover:underline"
                    >
                      Modifica
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">Nessun candidato trovato</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
