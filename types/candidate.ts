export type CandidateStatus =
  | 'Nuovo'
  | 'Contattato'
  | 'Colloquio'
  | 'Onboarded'
  | 'Scartato'

export type CandidateGender = 'Maschio' | 'Femmina' | 'Altro'

export type CandidateSegment = 'CF' | 'Banker'

export interface Candidate {
  id: string
  name: string
  email: string
  birthdate?: string // ISO date string es. "1990-05-01"
  company?: string
  gender?: CandidateGender
  segment?: CandidateSegment
  status?: CandidateStatus
  note?: string
  created_at?: string // timestamp ISO es. "2024-06-12T14:30:00Z"
  cv_url?: string // URL pubblico del CV (opzionale)
}
