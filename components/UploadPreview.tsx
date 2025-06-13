type Props = {
  file: File | null;
};

export default function UploadPreview({ file }: Props) {
  if (!file) return null;

  return (
    <div className="mt-4 p-4 border rounded shadow-sm">
      <h4 className="font-semibold">Anteprima file:</h4>
      <p><strong>Nome:</strong> {file.name}</p>
      <p><strong>Tipo:</strong> {file.type}</p>
      <p><strong>Dimensione:</strong> {(file.size / 1024).toFixed(2)} KB</p>
    </div>
  );
}
