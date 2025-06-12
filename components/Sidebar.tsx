'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Users,
  FileBarChart2,
  Database,
  ShieldCheck,
  UploadCloud,
  Cog,
  BarChart2,
  FileSearch,
  ClipboardList,
  UserPlus,
  Link2,
  Activity,
} from 'lucide-react'

// Aggiungi i ruoli per ogni voce di menu
export const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Recruiting', href: '/dashboard/recruiting', icon: <Users className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Utenti', href: '/dashboard/recruiting/utenti', icon: <UserPlus className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Audit', href: '/dashboard/recruiting/audit', icon: <FileSearch className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Backup', href: '/dashboard/recruiting/backup', icon: <Database className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Conversione', href: '/dashboard/recruiting/conversione', icon: <FileBarChart2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Integrazioni', href: '/dashboard/recruiting/integrazioni', icon: <Link2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'KPI', href: '/dashboard/recruiting/kpi', icon: <BarChart2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Monitoring', href: '/dashboard/recruiting/monitoring', icon: <Activity className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Permessi', href: '/dashboard/recruiting/permessi', icon: <Cog className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Sicurezza', href: '/dashboard/recruiting/sicurezza', icon: <ShieldCheck className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Statistiche', href: '/dashboard/recruiting/statistiche', icon: <BarChart2 className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Upload', href: '/dashboard/recruiting/upload', icon: <UploadCloud className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
]

export function Sidebar({ user }: { user: { role: string } }) {
  const pathname = usePathname()

  return (
    <aside className="w-full sm:w-64 bg-white border-r min-h-screen px-4 py-6 shadow-sm">
      <div className="text-xl font-bold text-red-600 mb-6">
        Distretto Magnani
      </div>
      <nav className="space-y-2">
        {navItems
          .filter(item => item.roles.includes(user.role))
          .map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-red-100 text-red-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            )
        })}
      </nav>
    </aside>
  )
}
