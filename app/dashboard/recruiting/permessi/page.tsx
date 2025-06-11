'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const initialPermissions = [
  { id: 1, role: 'Recruiter', canExport: true, canEdit: false },
  { id: 2, role: 'Manager', canExport: true, canEdit: true },
  { id: 3, role: 'Admin', canExport: true, canEdit: true },
]

export default function PermessiPage() {
  const [permissions, setPermissions] = useState(initialPermissions)

  const togglePermission = (id: number, field: 'canExport' | 'canEdit') => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: !p[field] } : p
      )
    )
  }

  return (
    <div className="min-h-screen bg-bg-light px-6 py-10">
      <h1 className="text-2xl font-bold text-bg-dark mb-6">Permessi Utente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {permissions.map((perm) => (
          <Card key={perm.id}>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-bg-dark">{perm.role}</h2>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Esporta Dati</Label>
               <Switch
  checked={perm.canExport}
  onChange={() => togglePermission(perm.id, 'canExport')}
/>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Modifica Candidati</Label>
                <Switch
                  checked={perm.canEdit}
                  onCheckedChange={() => togglePermission(perm.id, 'canEdit')}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
