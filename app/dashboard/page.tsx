"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from 'next/link';

export default function DashboardOverview() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      }
    });
  }, [router]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bg-dark">Benvenuto nella Dashboard</h1>
      {/* resto del tuo codice */}
    </div>
  );
}
