import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Distretto Magnani - Dashboard',
  description: 'Area riservata Recruiting e Manager',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-bg-light p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
