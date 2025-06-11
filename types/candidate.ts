export interface Candidate {
  id: string
  name: string
  email: string
  birthdate?: string // ISO format: "YYYY-MM-DD"
  company?: string

  gender?: 'Maschio' | 'Femmina' | 'Altro'
  segment?: 'CF' | 'Banker'
  status?: 'Nuovo' | 'Contattato' | 'Colloquio' | 'Onboarded' | 'Scartato'

  note?: string
  created_at?: string // ISO timestamp: "YYYY-MM-DDTHH:MM:SSZ"
}
