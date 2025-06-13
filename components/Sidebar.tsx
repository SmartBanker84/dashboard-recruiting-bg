"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Home, Users, FileBarChart2, Database, ShieldCheck, UploadCloud, Cog,
  BarChart2, FileSearch, ClipboardList, UserPlus, Link2, Activity, UserCircle
} from 'lucide-react'

// Navigation items
export const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Recruiting', href: '/dashboard/recruiting', icon: <Users className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Candidates', href: '/dashboard/recruiting/candidates', icon: <UserCircle className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Users', href: '/dashboard/recruiting/users', icon: <UserPlus className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Audit', href: '/dashboard/recruiting/audit', icon: <FileSearch className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Backup', href: '/dashboard/recruiting/backup', icon: <Database className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Conversion', href: '/dashboard/recruiting/conversion', icon: <FileBarChart2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Integrations', href: '/dashboard/recruiting/integrations', icon: <Link2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'KPI', href: '/dashboard/recruiting/kpi', icon: <BarChart2 className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Monitoring', href: '/dashboard/recruiting/monitoring', icon: <Activity className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Permissions', href: '/dashboard/recruiting/permissions', icon: <Cog className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Security', href: '/dashboard/recruiting/security', icon: <ShieldCheck className="h-5 w-5" />, roles: ['manager'] },
  { name: 'Statistics', href: '/dashboard/recruiting/statistics', icon: <BarChart2 className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
  { name: 'Upload', href: '/dashboard/recruiting/upload', icon: <UploadCloud className="h-5 w-5" />, roles: ['manager', 'recruiter'] },
]

// Sidebar component
export function Sidebar() {
  const pathname = usePathname()
  const [role, setRole] = useState<"manager" | "recruiter">("manager")

  // On mount, load role from localStorage for persistence
  useEffect(() => {
    const savedRole = window.localStorage.getItem("sidebarRole")
    if (savedRole === "manager" || savedRole === "recruiter") setRole(savedRole)
  }, [])

  // Handler to change and persist role
  function selectRole(newRole: "manager" | "recruiter") {
    setRole(newRole)
    window.localStorage.setItem("sidebarRole", newRole)
  }

  return (
    <aside className="w-full sm:w-64 bg-white border-r min-h-screen px-4 py-6 shadow-sm">
      <div className="text-xl font-bold text-red-600 mb-6">
        Distretto Magnani
      </div>
      {/* Role selector for testing */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => selectRole("manager")}
          className={`px-3 py-1 rounded ${role === "manager" ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          Manager
        </button>
        <button
          onClick={() => selectRole("recruiter")}
          className={`px-3 py-1 rounded ${role === "recruiter" ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          Recruiter
        </button>
      </div>
      <nav className="space-y-2">
        {navItems
          .filter(item => item.roles.includes(role))
          .map((item) => {
            // Check if the current path matches (highlights the tab)
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-red-100 text-red-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                ].join(' ')}
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
