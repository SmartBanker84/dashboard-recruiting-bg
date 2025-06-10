'use client'

import { ReactNode } from 'react'
import {
  Home,
  Users,
  ShieldCheck,
  BarChart,
  Settings,
  FileText,
  Database,
  AlertTriangle,
  Activity,
  KeyRound,
} from 'lucide-react'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: ReactNode
}

const sidebarLinks = [
  { label: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/dashboard/recruiting' },
  { label: 'Gestione Utenti', icon: <Users className="w-5 h-5" />, href: '#' },
  { label: 'Permessi & Ruoli', icon: <ShieldCheck className="w-5 h-5" />, href: '#' },
  { label: 'Configurazione KPI', icon: <BarChart className="w-5 h-5" />, href: '#' },
  { label: 'Backup & Ripristino', icon: <Database className="w-5 h-5" />, href: '#' },
  { label: 'Audit Log', icon: <FileText className="w-5 h-5" />, href: '#' },
  { label: 'Monitoring', icon: <Activity className="w-5 h-5" />, href: '#' },
  { label: 'Sicurezza', icon: <KeyRound className="w-5 h-5" />, href: '#' },
  { label: 'Manutenzione', icon: <Settings className="w-5 h-5" />, href: '#' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col space-y-6">
        <div>
          <h2 className="text-lg font-bold text-bg-dark leading-tight">Admin Panel</h2>
          <p className="text-sm text-gray-500">Distretto Magnani</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
