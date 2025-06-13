"use client";

import { useState } from "react";

type Props = {
  onUpload: (file: File) => void;
};

export default function UploadForm({ onUpload }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-6 rounded-lg text-center ${
        dragging ? "bg-blue-50 border-blue-400" : "border-gray-300"
      }`}
    >
      <p className="mb-4">Trascina qui un file oppure</p>
      <input type="file" onChange={handleFileChange} className="mx-auto" />
    </div>
  );
}
