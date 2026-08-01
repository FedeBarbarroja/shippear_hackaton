import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RequireAuth } from "@/components/require-auth"
import { PeopleProvider } from "@/lib/people"
import { Panel } from "@/components/panel/panel"

export const metadata: Metadata = {
  title: "Panel de la familia — Buendía",
  description: "Gestioná a las personas mayores, agregá familiares y mirá las últimas llamadas.",
}

export default function PanelPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <RequireAuth>
          <PeopleProvider>
            <Panel />
          </PeopleProvider>
        </RequireAuth>
      </main>
      <SiteFooter />
    </div>
  )
}
