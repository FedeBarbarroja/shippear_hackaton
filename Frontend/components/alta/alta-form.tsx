"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PersonaForm, type PersonaFormData } from "@/components/persona-form"
import { altaPersona } from "@/lib/api"

export function AltaForm() {
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [horario, setHorario] = useState("10:00")

  async function handleSubmit(data: PersonaFormData) {
    setError(null)
    setEnviando(true)
    try {
      await altaPersona({
        nombre: data.nombre,
        telefono: data.telefono,
        horario: data.horario,
        whatsappFamilia: data.whatsapp,
        medicacion: data.medicacion.map((m) => `${m.nombre} (${m.horario})`).join("; "),
        intereses: data.intereses.join(", "),
      })
      setHorario(data.horario)
      setEnviado(true)
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo dar de alta. Probá de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ok/15 text-ok">
          <Check className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="mt-6 font-serif text-3xl font-medium text-card-foreground">Listo, quedó dado de alta</h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Mañana a las {horario} Buendía hará la primera llamada. Al colgar vas a recibir el primer
          parte por WhatsApp y va a aparecer en el panel de la familia.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/panel" />} nativeButton={false} size="lg">
            Ir al panel de la familia
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="outline" size="lg" className="border-border bg-transparent hover:bg-secondary" onClick={() => setEnviado(false)}>
            Dar de alta a otra persona
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <p className="mx-auto mb-4 max-w-2xl text-center text-sm text-emergency">{error}</p>
      )}
      <PersonaForm
        onSubmit={handleSubmit}
        submitLabel={enviando ? "Dando de alta…" : "Dar de alta y agendar la primera llamada"}
      />
    </div>
  )
}
