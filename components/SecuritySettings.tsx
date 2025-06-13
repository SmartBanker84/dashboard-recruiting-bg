// components/SecuritySettings.tsx

"use client";

import { useState } from "react";

export default function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [ipLock, setIpLock] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Impostazioni di sicurezza</h2>

      <div className="flex items-center justify-between border-b py-4">
        <span>Richiedi verifica in due passaggi (MFA)</span>
        <input
          type="checkbox"
          checked={mfaEnabled}
          onChange={() => setMfaEnabled(!mfaEnabled)}
          className="w-5 h-5"
        />
      </div>

      <div className="flex items-center justify-between border-b py-4">
        <span>Limitare accesso a IP aziendali</span>
        <input
          type="checkbox"
          checked={ipLock}
          onChange={() => setIpLock(!ipLock)}
          className="w-5 h-5"
        />
      </div>

      <button
        onClick={() => alert("Impostazioni salvate")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Salva modifiche
      </button>
    </section>
  );
}
