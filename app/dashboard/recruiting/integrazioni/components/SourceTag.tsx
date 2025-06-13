// components/SourceTag.tsx

type Props = {
  source: string;
};

const sourceColors: Record<string, string> = {
  LinkedIn: 'bg-blue-100 text-blue-800',
  WeConnect: 'bg-green-100 text-green-800',
  SalesNavigator: 'bg-purple-100 text-purple-800',
  Referral: 'bg-yellow-100 text-yellow-800',
  Evento: 'bg-pink-100 text-pink-800',
  Altro: 'bg-gray-100 text-gray-800',
};

export default function SourceTag({ source }: Props) {
  const style = sourceColors[source] || sourceColors["Altro"];
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${style}`}>
      {source}
    </span>
  );
}
