import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AltaForm } from "@/components/alta/alta-form"

export const metadata: Metadata = {
  title: "Dar de alta — Buendía",
  description: "Registrá a un familiar en dos minutos. A partir de mañana, Buendía lo llama todos los días.",
}

export default function AltaPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.82_0.13_75/0.12),transparent_70%)]"
          />
          <div className="mx-auto max-w-6xl px-4 pt-16 md:px-6 md:pt-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Alta — una sola vez</span>
              <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
                Dar de alta a un familiar
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Lo completás vos, una sola vez. Cuanto más nos cuentes de la persona, más natural va
                a sentirse la llamada.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-12 md:px-6">
          <AltaForm />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
