"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Candidate = {
  id: string
  name: string
  email: string
  telefono?: string
  posizione: string
  stato: string
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchCandidates() {
    setLoading(true)
    setError(null)
    let query = supabase
      .from("candidates")
      .select("id, name, email, telefono, posizione, stato")
      .order("created_at", { ascending: false })

    // Ricerca base su name, email, posizione, telefono
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,posizione.ilike.%${search}%,telefono.ilike.%${search}%`
      )
    }

    const { data, error } = await query
    if (error) setError(error.message)
    else setCandidates(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidates()
    // eslint-disable-next-line
  }, [search])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <Link
          href="/dashboard/recruiting/candidates/new"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          + New Candidate
        </Link>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search by name, email, phone or position..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:max-w-sm"
        />
        <button
          className="text-sm text-gray-400 hover:text-gray-600"
          onClick={() => setSearch("")}
        >
          Clear search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-red-600">{error}</td>
              </tr>
            ) : candidates.length ? (
              candidates.map((c) => (
                <tr key={c.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{c.name}</td>
                  <td className="py-2 px-4 border-b">{c.email}</td>
                  <td className="py-2 px-4 border-b">{c.telefono || "—"}</td>
                  <td className="py-2 px-4 border-b">{c.posizione}</td>
                  <td className="py-2 px-4 border-b">{c.stato}</td>
                  <td className="py-2 px-4 border-b text-center space-x-3">
                    <Link
                      href={`/dashboard/recruiting/candidates/${c.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/dashboard/recruiting/candidates/${c.id}/edit`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">No candidates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
