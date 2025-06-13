"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import UploadPreview from "@/components/UploadPreview";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (f: File) => {
    setFile(f);
    // TODO: aggiungi qui logica upload su Supabase
    console.log("File selezionato:", f.name);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carica un documento</h1>
      <UploadForm onUpload={handleUpload} />
      <UploadPreview file={file} />
    </main>
  );
}
