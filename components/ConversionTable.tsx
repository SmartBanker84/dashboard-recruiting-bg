import ConversionForm from './ConversionForm';

type Candidate = {
  id: string;
  name: string;
  current_status: string;
};

type Props = {
  data: Candidate[];
};

export default function ConversionTable({ data }: Props) {
  return (
    <table className="w-full border">
      <thead>
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
              <ConversionForm id={c.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
