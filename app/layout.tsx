// app/layout.tsx
import "@/app/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distretto Magnani | Dashboard Recruiting",
  description: "Gestione candidati e performance per recruiting finanziario",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head />
      <body className="bg-bg-light text-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
