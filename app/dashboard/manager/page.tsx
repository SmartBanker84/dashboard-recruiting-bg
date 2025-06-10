'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bg-dark">Dashboard Manager</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Candidati Totali</p>
            <p className="text-3xl font-bold text-bg-dark">128</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Team Recruiter</p>
            <p className="text-3xl font-bold text-bg-dark">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Conversione Media</p>
            <p className="text-3xl font-bold text-bg-dark">38%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
