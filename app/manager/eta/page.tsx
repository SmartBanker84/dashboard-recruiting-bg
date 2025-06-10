'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AgeDistributionChart from '@/components/AgeDistributionChart'

interface Candidate {
  id: string
  name: string
  birthdate: string
}

export default function ManagerEtaPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [ageRanges, setAgeRanges] = useState({
    '<25': 0,
    '25-34': 0,
    '35-44': 0,
    '45-54': 0,
    '55+': 0,
  })

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase.from('candidates').select('*')
    if (error) return console.error(error)
    setCandidates(data || [])
    setAgeRanges(calculateAgeStats(data || []))
  }

  const calculateAgeStats = (data: Candidate[]) => {
    const ages: number[] = data
      .map((c) => {
        const birth = c.birthdate ? new Date(c.birthdate) : null
        if (!birth) return null
        const age = new Date().getFullYear() - birth.getFullYear()
        return age
      })
      .filter((a): a is number => a !== null)

    const ageRanges = {
      '<25': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55+': 0,
    }

    ages.forEach((age) => {
      if (age < 25) ageRanges['<25']++
      else if (age < 35) ageRanges['25-34']++
      else if (age < 45) ageRanges['35-44']++
      else if (age < 55) ageRanges['45-54']++
      else ageRanges['55+']++
    })

    return ageRanges
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Analisi Età Candidati</h1>
      <AgeDistributionChart ageRanges={ageRanges} />
    </div>
  )
}
