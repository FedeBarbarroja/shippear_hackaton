import { ClipboardList, PhoneCall, Brain, MessageCircle } from "lucide-react"

const PASOS = [
  {
    icon: ClipboardList,
    titulo: "Alta, una sola vez",
    texto:
      "La familia completa un formulario simple: nombre, teléfono, horario preferido, WhatsApp de contacto, medicación e intereses de la persona.",
  },
  {
    icon: PhoneCall,
    titulo: "La llamada diaria",
    texto:
      "A la hora acordada el agente llama. Saluda con calidez y, sin sonar a interrogatorio, averigua cómo durmió, si comió, si tomó la medicación y cómo se siente.",
  },
  {
    icon: Brain,
    titulo: "Análisis post-llamada",
    texto:
      "Al colgar, un modelo analiza la transcripción completa y devuelve un estado, los datos concretos y un resumen en una frase.",
  },
  {
    icon: MessageCircle,
    titulo: "El parte a la familia",
    texto:
      "Un mensaje de WhatsApp automático con el estado y el resumen. Todo bien, alerta o emergencia. Y queda guardado en el historial.",
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Cómo funciona</span>
          <h2 className="mt-6 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Cuatro pasos. La persona mayor solo atiende un llamado.
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => {
            const Icon = p.icon
            return (
              <li key={p.titulo} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="font-serif text-sm text-muted-foreground">0{i + 1}</span>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium text-card-foreground">{p.titulo}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
