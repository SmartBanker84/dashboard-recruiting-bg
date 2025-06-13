// components/CVTable.tsx
type CV = {
  id: string;
  file_url: string;
  candidate_name: string;
};

type Props = {
  data: CV[];
};

export default function CVTable({ data }: Props) {
  return (
    <table className="w-full text-left border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Nome Candidato</th>
          <th className="border px-4 py-2">CV</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cv) => (
          <tr key={cv.id}>
            <td className="border px-4 py-2">{cv.candidate_name}</td>
            <td className="border px-4 py-2">
              <a
                href={cv.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Visualizza
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
