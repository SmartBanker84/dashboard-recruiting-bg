export interface AuditLog {
  id: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  user_id: string
  candidate_id?: string
  timestamp: string
  changes?: Record<string, any>
}
