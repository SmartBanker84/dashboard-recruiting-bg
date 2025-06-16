// app/dashboard/recruiting/overview/page.tsx
import { createServerClient } from '@/lib/supabase/server'

export default async function OverviewPage() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from('candidates').select('*')
  if (error) {
    console.error('Errore:', error.message)
    return <div>Errore nel caricamento dei dati</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
