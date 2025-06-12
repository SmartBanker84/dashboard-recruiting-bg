"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState, createContext, useContext, ReactNode } from "react";

const SupabaseContext = createContext<ReturnType<typeof createBrowserClient> | null>(null);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("SupabaseProvider is missing");
  return context;
}

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
