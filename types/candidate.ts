export interface Candidate {
  id: string
  name: string
  email: string
  birthdate?: string // ISO date string es. "1990-05-01"
  company?: string
  gender?: 'Maschio' | 'Femmina' | 'Altro'
  segment?: 'CF' | 'Banker'
  status?: 'Nuovo' | 'Contattato' | 'Colloquio' | 'Onboarded' | 'Scartato'
  note?: string
  created_at?: string // timestamp ISO es. "2024-06-12T14:30:00Z"
}  
