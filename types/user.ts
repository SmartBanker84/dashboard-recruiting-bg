export type UserRole = 'recruiter' | 'manager'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string // ISO timestamp, es. "2024-06-12T14:30:00Z"
}
