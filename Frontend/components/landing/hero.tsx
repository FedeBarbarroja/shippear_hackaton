import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsappMessage } from "@/components/whatsapp-message"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* warm sunrise glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.82_0.13_75/0.14),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Compañía diaria por teléfono
          </span>

          <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Que nadie pase el día sin que alguien pregunte cómo está
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Un agente de IA llama todos los días a la persona mayor, charla dos o tres minutos como
            un vecino que saluda, y después le manda un parte a la familia por WhatsApp. Cero
            fricción: solo hay que atender el teléfono.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/alta" />} nativeButton={false} size="lg" className="h-12 text-base">
              Dar de alta a un familiar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button render={<Link href="/dashboard" />} nativeButton={false} size="lg" variant="outline" className="h-12 border-border bg-transparent text-base hover:bg-secondary">
              Ver el panel de la familia
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Nada que instalar. Nada que aprender. Pensado para quien no usa apps.
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-4">
            <WhatsappMessage estado="ok" fecha="lunes 10:00" className="ml-auto" />
            <WhatsappMessage estado="alerta" fecha="martes 10:00" />
            <WhatsappMessage estado="emergencia" fecha="miércoles 10:00" className="ml-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
