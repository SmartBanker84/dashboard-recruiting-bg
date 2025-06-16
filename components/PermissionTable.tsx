'use client'

import * as React from "react";

export interface Permission {
  id: string | number;
  user: string;
  role: string;
  resource: string;
  status: string;
}

interface PermissionTableProps {
  data: Permission[];
}

export default function PermissionTable({ data }: PermissionTableProps) {
  if (!data || data.length === 0) {
    return <div>Nessun permesso trovato.</div>;
  }

  return (
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Utente</th>
          <th className="px-4 py-2 text-left">Ruolo</th>
          <th className="px-4 py-2 text-left">Risorsa</th>
          <th className="px-4 py-2 text-left">Stato</th>
        </tr>
      </thead>
      <tbody>
        {data.map((perm) => (
          <tr key={perm.id} className="border-t">
            <td className="px-4 py-2">{perm.user}</td>
            <td className="px-4 py-2">{perm.role}</td>
            <td className="px-4 py-2">{perm.resource}</td>
            <td className="px-4 py-2">{perm.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
