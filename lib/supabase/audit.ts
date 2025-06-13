// lib/supabase/audit.ts

import { supabase } from "@/lib/supabase/supabaseClient";
import { EventLog } from "@/types/audit";

export async function getAuditLogs(): Promise<EventLog[]> {
  const { data, error } = await supabase
    .from("audit")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Errore nel fetch audit logs:", error);
    return [];
  }

  return data as EventLog[];
}
