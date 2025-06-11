// app/dashboard/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Distretto Magnani - Dashboard',
  description: 'Area riservata Recruiting e Manager',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-bg-light min-h-screen p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
