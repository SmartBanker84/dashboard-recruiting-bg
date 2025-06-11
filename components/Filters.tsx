'use client'
import { useState } from 'react'

export function Filters({ onApply }: { onApply: (f: any) => void }) {
  const [status, setStatus] = useState('')
  return (
    <div className="flex gap-4">
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Tutti</option>
        <option value="Nuovo">Nuovo</option>
        <option value="Colloquio">Colloquio</option>
        <option value="Onboarded">Onboarded</option>
      </select>
      <button onClick={() => onApply({ status })}>Applica</button>
    </div>
  )
}
