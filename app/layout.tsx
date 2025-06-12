import { Sidebar } from "@/components/Sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-bg-light min-h-screen p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
