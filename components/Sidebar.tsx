"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Home, Users, FileBarChart2, Database, ShieldCheck, UploadCloud, Cog,
  BarChart2, FileSearch, ClipboardList, UserPlus, Link2, Activity, UserCircle
} from 'lucide-react'

// Lista navigazione dinamica
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['manager', 'recruiter'] },
  { name: 'Recruiting', href: '/dashboard/recruiting', icon: Users, roles: ['manager', 'recruiter'] },
  { name: 'Candidates', href: '/dashboard/recruiting/candidates', icon: UserCircle, roles: ['manager', 'recruiter'] },
  { name: 'Users', href: '/dashboard/recruiting/users', icon: UserPlus, roles: ['recruiter'] },
  { name: 'Audit', href: '/dashboard/recruiting/audit', icon: FileSearch, roles: ['recruiter'] },
  { name: 'Backup', href: '/dashboard/recruiting/backup', icon: Database, roles: ['recruiter'] },
  { name: 'Conversion', href: '/dashboard/recruiting/conversion', icon: FileBarChart2, roles: ['recruiter'] },
  { name: 'Integrations', href: '/dashboard/recruiting/integrations', icon: Link2, roles: ['recruiter'] },
  { name: 'KPI', href: '/dashboard/recruiting/kpi', icon: BarChart2, roles: ['recruiter'] },
  { name: 'Monitoring', href: '/dashboard/recruiting/monitoring', icon: Activity, roles: ['recruiter'] },
  { name: 'Permissions', href: '/dashboard/recruiting/permissions', icon: Cog, roles: ['recruiter'] },
  { name: 'Security', href: '/dashboard/recruiting/security', icon: ShieldCheck, roles: ['recruiter'] },
  { name: 'Statistics', href: '/dashboard/recruiting/statistics', icon: BarChart2, roles: ['manager', 'recruiter'] },
  { name: 'Upload', href: '/dashboard/recruiting/upload', icon: UploadCloud, roles: ['manager', 'recruiter'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const [role, setRole] = useState<"manager" | "recruiter">("manager")

  useEffect(() => {
    const saved = localStorage.getItem("sidebarRole")
    if (saved === "manager" || saved === "recruiter") setRole(saved)
  }, [])

  const handleRoleChange = (newRole: "manager" | "recruiter") => {
    setRole(newRole)
    localStorage.setItem("sidebarRole", newRole)
  }

  const roleBtnClass = (r: string) =>
    `px-3 py-1 rounded ${role === r ? "bg-red-500 text-white" : "bg-gray-200"}`

  return (
    <aside className="w-full sm:w-64 bg-white border-r min-h-screen px-4 py-6 shadow-sm">
      <div className="text-xl font-bold text-red-600 mb-6">
        Distretto Magnani
      </div>

      {/* ⚠️ TOGGLE DI RUOLO → solo per test */}
      <div className="mb-4 flex gap-2">
        <button onClick={() => handleRoleChange("manager")} className={roleBtnClass("manager")}>Manager</button>
        <button onClick={() => handleRoleChange("recruiter")} className={roleBtnClass("recruiter")}>Recruiter</button>
      </div>

      <nav className="space-y-2">
        {navItems
          .filter(item => item.roles.includes(role))
          .map(({ href, icon: Icon, name }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-red-100 text-red-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            )
          })}
      </nav>
    </aside>
  )
}
