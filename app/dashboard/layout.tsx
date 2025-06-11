import { Sidebar } from '@/components/Sidebar'

export const metadata = {
  title: 'Distretto Magnani - Dashboard',
  description: 'Area riservata Recruiting e Manager',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-bg-light min-h-screen p-6">
        {children}
      </main>
    </div>
  )
}
