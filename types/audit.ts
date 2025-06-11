export interface AuditLog {
  id: string
  candidate_id: string
  action: 'CREATO' | 'MODIFICATO' | 'ELIMINATO'
  performed_by: string
  timestamp: string
  changes?: Record<string, any>
