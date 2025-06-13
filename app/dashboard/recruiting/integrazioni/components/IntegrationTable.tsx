// components/IntegrationTable.tsx
type Candidate = {
  id: string;
  name: string;
  source: string;
  status: string;
};

export default function IntegrationTable({ data }: { data: Candidate[] }) {
  return (
    <table className="w-full text-sm border">
      <thead>
        <tr>
          <th className="border p-2">Nome</th>
          <th className="border p-2">Origine</th>
          <th className="border p-2">Stato</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td className="border p-2">{c.name}</td>
            <td className="border p-2">
              <span className={`px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs`}>
                {c.source}
              </span>
            </td>
            <td className="border p-2">{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
