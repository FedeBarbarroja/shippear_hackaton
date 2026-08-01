const STATS = [
  { valor: "+1 millón", label: "de personas mayores viven solas en Argentina" },
  { valor: "0 apps", label: "no usan smartwatch ni aprenden tecnología nueva" },
  { valor: "100%", label: "atienden el teléfono cuando suena" },
]

export function Problema() {
  return (
    <section className="border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <span className="text-xs font-medium uppercase tracking-widest text-primary">El problema</span>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <h2 className="text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Los botones antipánico se quedan sin batería o en el cajón. El teléfono, no.
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Del otro lado, las familias viven con culpa y ansiedad: no pueden llamar todos los días,
            y cuando pasa algo grave se enteran tarde. La alternativa real hoy no es la nieta que
            llama todas las mañanas: es el silencio.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-serif text-4xl font-medium text-primary md:text-5xl">{s.valor}</p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
