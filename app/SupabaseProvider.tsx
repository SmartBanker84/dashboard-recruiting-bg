"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { SessionContextProvider } from "@supabase/ssr";

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient()
  );

  return (
    <SessionContextProvider client={supabase}>
      {children}
    </SessionContextProvider>
  );
}
