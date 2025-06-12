"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: 32,
        border: "1px solid #ddd",
        borderRadius: 8,
        minWidth: 320,
        background: "#fff"
      }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 8, fontSize: 16 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 8, fontSize: 16 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 10,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {loading ? "Attendi..." : "Accedi"}
          </button>
        </form>
        {error && (
          <div style={{ color: "red", marginTop: 12 }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
