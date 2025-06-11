export interface KPI {
  id: string
  label: string
  value: number
  type?: 'monthly' | 'conversion' | 'segment'
}
