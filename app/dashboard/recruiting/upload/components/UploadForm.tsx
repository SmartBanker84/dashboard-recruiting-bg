// components/UploadForm.tsx
import { useState } from 'react';

type Props = {
  onUpload: (file: File) => void;
};

export default function UploadForm({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) onUpload(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Carica
      </button>
    </div>
  );
}
