"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function NuovoCandidatoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    posizione: "",
    stato: "In valutazione",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.from("candidati").insert([form])
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push("/dashboard/recruiting/candidati")
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nuovo candidato</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-lg space-y-4">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Posizione</label>
          <input
            type="text"
            name="posizione"
            value={form.posizione}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Stato</label>
          <select
            name="stato"
            value={form.stato}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>In valutazione</option>
            <option>Colloquio</option>
            <option>Assunto</option>
            <option>Respinto</option>
          </select>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          disabled={loading}
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {loading ? "Salvataggio..." : "Salva"}
        </button>
      </form>
    </div>
  )
}
