import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RequireAuth } from "@/components/require-auth"
import { Dashboard } from "@/components/dashboard/dashboard"

export const metadata: Metadata = {
  title: "Panel de la familia — Buendía",
  description: "El historial diario de llamadas con el semáforo de estado: todo bien, alerta o emergencia.",
}

export default function DashboardPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      </main>
      <SiteFooter />
    </div>
  )
}
