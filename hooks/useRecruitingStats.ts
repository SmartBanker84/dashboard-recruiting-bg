// ✅ File: hooks/useRecruitingStats.ts
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'

export function useRecruitingStats() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [interviewing, setInterviewing] = useState(0)
  const [hired, setHired] = useState(0)
  const [monthlyStats, setMonthlyStats] = useState<number[]>([])
  const [ageStats, setAgeStats] = useState<{ [key: string]: number }>({})

  const supabase = createBrowserClient()

  useEffect(() => {
    fetchCandidates()
  }, [])

  async function fetchCandidates() {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)

    setCandidates(data)
    setInterviewing(data.filter((c) => c.status === 'colloquio').length)
    setHired(data.filter((c) => c.status === 'assunto').length)
    setMonthlyStats(calculateMonthlyStats(data))
    setAgeStats(calculateAgeStats(data))
  }

  function calculateMonthlyStats(data: any[]) {
    const counts = Array(12).fill(0)
    data.forEach((c) => {
      const month = new Date(c.created_at).getMonth()
      counts[month]++
    })
    return counts
  }

  function calculateAgeStats(data: any[]) {
    const stats: { [key: string]: number } = {}
    data.forEach((c) => {
      const age = c.age || 0
      const group = age < 30 ? '<30' : age < 40 ? '30-39' : age < 50 ? '40-49' : '50+'
      stats[group] = (stats[group] || 0) + 1
    })
    return stats
  }

  return { candidates, interviewing, hired, monthlyStats, ageStats, fetchCandidates }
}
