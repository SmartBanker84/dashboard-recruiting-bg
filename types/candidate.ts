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
 
