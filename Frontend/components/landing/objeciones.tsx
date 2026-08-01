const QA = [
  {
    q: "¿Y si el agente falla en detectar una emergencia?",
    a: "No reemplaza al 107 ni a un botón antipánico. Es una capa de contención donde hoy no hay absolutamente nada. El fallback siempre es un humano.",
  },
  {
    q: "¿Qué pasa con la privacidad?",
    a: "La persona mayor y la familia consienten. Las transcripciones son de la familia y se usan solo para armar el parte diario.",
  },
  {
    q: "¿No es triste que hable con una máquina?",
    a: "La alternativa real hoy es el silencio. El agente no reemplaza a la nieta: le avisa a la nieta cuando hace falta que llame.",
  },
  {
    q: "¿Esto es realmente un agente?",
    a: "Sí: llama solo todos los días sin que nadie se lo pida, decide qué preguntar según lo que pasó ayer, evalúa por su cuenta si escalar y actúa. Si nadie toca el sistema, sigue trabajando.",
  },
  {
    q: "¿Cuál es el modelo de negocio?",
    a: "B2C con suscripción familiar, y B2G: el municipio lo ofrece como servicio de adultos mayores.",
  },
  {
    q: "¿Necesita la persona mayor aprender algo?",
    a: "Nada. No instala ni configura nada. Solo atiende el teléfono cuando suena, como cualquier llamada.",
  },
]

export function Objeciones() {
  return (
    <section id="preguntas" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Preguntas frecuentes</span>
          <h2 className="mt-6 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Lo que primero se preguntan las familias
          </h2>
        </div>

        <dl className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {QA.map((item) => (
            <div key={item.q} className="border-t border-border pt-6">
              <dt className="font-serif text-lg font-medium text-foreground">{item.q}</dt>
              <dd className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
