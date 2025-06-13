// components/ConversionTable.tsx
import { Button } from './ui/button'; // import componente UI riutilizzabile

type Candidate = {
  id: string;
  name: string;
  current_status: string;
};

type Props = {
  data: Candidate[];
  onConvert: (id: string) => void;
};

export default function ConversionTable({ data, onConvert }: Props) {
  return (
    <table className="w-full text-sm border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Nome</th>
          <th className="border px-4 py-2 text-left">Stato attuale</th>
          <th className="border px-4 py-2 text-left">Azione</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{c.name}</td>
            <td className="border px-4 py-2">
              <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">
                {c.current_status}
              </span>
            </td>
            <td className="border px-4 py-2">
              <Button variant="success" size="sm" onClick={() => onConvert(c.id)}>
                Converti
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
