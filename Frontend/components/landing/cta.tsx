import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,oklch(0.82_0.13_75/0.16),transparent_70%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-card-foreground md:text-5xl">
              Rosa no instaló nada. No aprendió nada. Solo atendió el teléfono.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Dar de alta a un familiar lleva dos minutos. A partir de mañana, alguien pregunta cómo
              está todos los días.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button render={<Link href="/alta" />} nativeButton={false} size="lg" className="h-12 text-base">
                Dar de alta a un familiar
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button render={<Link href="/dashboard" />} nativeButton={false} size="lg" variant="outline" className="h-12 border-border bg-transparent text-base hover:bg-secondary">
                Ver el panel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
