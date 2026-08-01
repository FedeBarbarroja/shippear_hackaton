"use client"

import { useEffect, useState } from "react"
import { X, UserPlus, ArrowRight } from "lucide-react"
import { usePeople } from "@/lib/people"
import { Button } from "@/components/ui/button"
import { PersonaForm, type PersonaFormData } from "@/components/persona-form"

export function AddPersonaModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated?: (nombre: string) => void
}) {
  const { addPersona } = usePeople()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  async function handleSubmit(data: PersonaFormData) {
    setError(null)
    setEnviando(true)
    try {
      await addPersona(data)
      onCreated?.(data.nombre)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo dar de alta. Probá de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-start sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-persona-title"
    >
      <button type="button" className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar" />

      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-3xl border border-border bg-card shadow-xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-6 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <UserPlus className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="add-persona-title" className="font-serif text-xl font-medium text-card-foreground">
                Dar de alta a un familiar
              </h2>
              <p className="text-sm text-muted-foreground">Empezamos a llamarla mañana.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          <PersonaForm onSubmit={handleSubmit} formId="add-persona-form" compact hideActions />
        </div>

        <div className="flex flex-col gap-3 border-t border-border bg-card p-6 md:px-8 md:py-5">
          {error && <p className="text-center text-sm text-emergency sm:text-right">{error}</p>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onClose}
              className="border-border bg-transparent hover:bg-secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" form="add-persona-form" size="lg" className="h-12 text-base" disabled={enviando}>
              {enviando ? "Dando de alta…" : "Dar de alta y agendar"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            Al continuar confirmás que la persona mayor y la familia dan su consentimiento para las llamadas.
          </p>
        </div>
      </div>
    </div>
  )
}
