'use client'

import { CV } from '@/types/cv'

type Props = {
  data: CV[]
}

export default function CVTable({ data }: Props) {
  return (
    <table className="w-full text-left border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Nome Candidato</th>
          <th className="border px-4 py-2">CV</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={2} className="text-center py-4 text-gray-500">
              Nessun CV disponibile
            </td>
          </tr>
        ) : (
          data.map((cv) => (
            <tr key={cv.id} className="hover:bg-gray-50 transition">
              <td className="border px-4 py-2">{cv.candidate_name}</td>
              <td className="border px-4 py-2">
                <a
                  href={cv.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  📄 Visualizza CV
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
