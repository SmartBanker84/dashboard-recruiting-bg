"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";

// Leggi le env come vuoi, qui esempio Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const SupabaseContext = createContext<ReturnType<typeof createBrowserClient> | null>(null);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("SupabaseProvider is missing");
  return context;
}

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(supabaseUrl, supabaseAnonKey)
  );

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
