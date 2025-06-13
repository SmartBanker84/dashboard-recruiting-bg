"use client";

type CV = {
  id: string;
  filename: string;
  url: string;
  uploaded_at: string;
};

type Props = {
  data: CV[];
};

export default function CVList({ data }: Props) {
  return (
    <div className="space-y-4">
      {data.map((cv) => (
        <div
          key={cv.id}
          className="p-4 border rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{cv.filename}</h3>
            <p className="text-sm text-gray-500">
              Caricato il {new Date(cv.uploaded_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={cv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Visualizza
            </a>
            <a
              href={cv.url}
              download
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Scarica
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
