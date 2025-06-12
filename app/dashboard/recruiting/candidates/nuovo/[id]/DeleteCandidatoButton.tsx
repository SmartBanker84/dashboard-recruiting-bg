"use client"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function DeleteCandidatoButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Sei sicuro di voler cancellare questo candidato?")) return
    setLoading(true)
    setError(null)
    const { error } = await supabase.from("candidati").delete().eq("id", id)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push("/dashboard/recruiting/candidati")
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      {loading ? "Cancellazione..." : "Cancella"}
      {error && <span className="text-red-200 ml-2">{error}</span>}
    </button>
  )
}
