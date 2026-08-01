import { cn } from "@/lib/utils"
import { ESTADOS_LIST } from "@/lib/buendia"
import { WhatsappMessage } from "@/components/whatsapp-message"

export function Estados() {
  return (
    <section id="estados" className="scroll-mt-20 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Los tres estados</span>
          <h2 className="mt-6 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Un semáforo simple que la familia entiende de un vistazo
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            El modelo evalúa la charla y decide, por su cuenta, si hace falta que alguien llame o se
            acerque. Estos son los tres partes posibles.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ESTADOS_LIST.map((e) => (
            <div
              key={e.key}
              className={cn("flex flex-col rounded-2xl border border-border bg-card p-6 ring-1 ring-transparent", e.ringClass)}
            >
              <div className="flex items-center gap-2">
                <span className={cn("h-3 w-3 rounded-full", e.dotClass)} aria-hidden="true" />
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide", e.chipClass)}>
                  {e.label}
                </span>
              </div>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{e.descripcion}</p>
              <div className="mt-6">
                <WhatsappMessage estado={e.key} className="max-w-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
