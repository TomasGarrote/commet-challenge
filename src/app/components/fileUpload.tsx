"use client";

import { useState } from "react";

export default function FileUploadClient({ onDataProcessed }: { onDataProcessed: (deals: any[]) => void }) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        onDataProcessed(jsonData);  // Pasar datos procesados al componente principal
      } catch (err) {
        setError("Error al procesar el archivo JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label>Selecciona un archivo JSON o CSV:</label>
      <input type="file" accept=".csv, application/json" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
