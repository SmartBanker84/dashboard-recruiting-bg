// components/ConversionTable.tsx

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
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Nome</th>
          <th className="border px-4 py-2">Stato attuale</th>
          <th className="border px-4 py-2">Azione</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td className="border px-4 py-2">{c.name}</td>
            <td className="border px-4 py-2">{c.current_status}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onConvert(c.id)}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Converti
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
