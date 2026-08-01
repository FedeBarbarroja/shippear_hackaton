"use client"

import { useState } from "react"
import { Plus, X, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const INTERESES_SUGERIDOS = [
  "Los nietos",
  "El jardín",
  "Fútbol",
  "Cocina",
  "Tejido",
  "Novelas",
  "Música",
  "Sus plantas",
  "La iglesia",
  "El barrio",
]

const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"]

export type Medicacion = { nombre: string; horario: string }

export type PersonaFormData = {
  nombre: string
  telefono: string
  horario: string
  familiar: string
  whatsapp: string
  intereses: string[]
  medicacion: Medicacion[]
  notas: string
}

export function PersonaForm({
  onSubmit,
  submitLabel = "Dar de alta y agendar la primera llamada",
  onCancel,
  compact = false,
  formId,
  hideActions = false,
}: {
  onSubmit: (data: PersonaFormData) => void
  submitLabel?: string
  onCancel?: () => void
  compact?: boolean
  formId?: string
  hideActions?: boolean
}) {
  const [intereses, setIntereses] = useState<string[]>(["Los nietos"])
  const [interesInput, setInteresInput] = useState("")
  const [medicacion, setMedicacion] = useState<Medicacion[]>([{ nombre: "", horario: "" }])
  const [horario, setHorario] = useState("10:00")

  function toggleInteres(i: string) {
    setIntereses((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
  }

  function addInteresInput() {
    const v = interesInput.trim()
    if (v && !intereses.includes(v)) setIntereses((prev) => [...prev, v])
    setInteresInput("")
  }

  function updateMed(idx: number, patch: Partial<Medicacion>) {
    setMedicacion((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)))
  }

  function addMed() {
    setMedicacion((prev) => [...prev, { nombre: "", horario: "" }])
  }

  function removeMed(idx: number) {
    setMedicacion((prev) => prev.filter((_, i) => i !== idx))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data: PersonaFormData = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value.trim(),
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value.trim(),
      familiar: (form.elements.namedItem("familiar") as HTMLInputElement).value.trim(),
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value.trim(),
      notas: (form.elements.namedItem("notas") as HTMLTextAreaElement).value.trim(),
      horario,
      intereses,
      medicacion: medicacion.filter((m) => m.nombre.trim() !== ""),
    }
    onSubmit(data)
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className={compact ? "" : "mx-auto max-w-2xl"}>
      <div
        className={cn(
          "space-y-10",
          !compact && "rounded-3xl border border-border bg-card p-6 md:p-10",
        )}
      >
        {/* Datos de la persona */}
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-2 font-serif text-xl font-medium text-card-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm text-primary">1</span>
            La persona mayor
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre y apellido</Label>
              <Input id="nombre" name="nombre" required placeholder="Rosa Giménez" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono al que llamamos</Label>
              <Input id="telefono" name="telefono" type="tel" required placeholder="+54 341 555 0142" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="horario">Horario preferido de llamada</Label>
            <Select value={horario} onValueChange={setHorario}>
              <SelectTrigger id="horario" className="w-full">
                <SelectValue placeholder="Elegí un horario" />
              </SelectTrigger>
              <SelectContent>
                {HORARIOS.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h} hs
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">A esta hora, todos los días, el agente la va a llamar.</p>
          </div>
        </fieldset>

        <div className="h-px bg-border" />

        {/* Contacto familia */}
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-2 font-serif text-xl font-medium text-card-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm text-primary">2</span>
            El parte a la familia
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="familiar">Tu nombre (quien recibe el aviso)</Label>
              <Input id="familiar" name="familiar" required placeholder="Lucía, la nieta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp donde llega el parte</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" required placeholder="+54 341 555 0199" />
            </div>
          </div>
        </fieldset>

        <div className="h-px bg-border" />

        {/* Medicación */}
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-2 font-serif text-xl font-medium text-card-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm text-primary">3</span>
            Medicación y horarios
          </legend>
          <p className="text-sm text-muted-foreground">
            Para que el agente pueda recordarle y avisar si se la olvida. Podés dejarlo vacío.
          </p>

          <div className="space-y-3">
            {medicacion.map((m, idx) => (
              <div key={idx} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                  aria-label={`Medicación ${idx + 1}`}
                  placeholder="Ej: pastilla de la presión"
                  value={m.nombre}
                  onChange={(e) => updateMed(idx, { nombre: e.target.value })}
                  className="flex-1"
                />
                <Input
                  aria-label={`Horario medicación ${idx + 1}`}
                  placeholder="Ej: 09:00 y 21:00"
                  value={m.horario}
                  onChange={(e) => updateMed(idx, { horario: e.target.value })}
                  className="sm:w-48"
                />
                {medicacion.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMed(idx)}
                    aria-label="Quitar medicación"
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" size="sm" onClick={addMed} className="border-border bg-transparent hover:bg-secondary">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Agregar otra medicación
          </Button>
        </fieldset>

        <div className="h-px bg-border" />

        {/* Intereses */}
        <fieldset className="space-y-5">
          <legend className="flex items-center gap-2 font-serif text-xl font-medium text-card-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-sm text-primary">4</span>
            Intereses de la persona
          </legend>
          <div className="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/10 p-3 text-sm text-foreground/90">
            <Heart className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-pretty leading-relaxed">
              Este es el campo clave: es lo que hace que la llamada se sienta como un vecino que
              saluda y no un formulario hablado.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESES_SUGERIDOS.map((i) => {
              const active = intereses.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInteres(i)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                  aria-pressed={active}
                >
                  {i}
                </button>
              )
            })}
          </div>

          <div className="flex gap-2">
            <Input
              value={interesInput}
              onChange={(e) => setInteresInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  addInteresInput()
                }
              }}
              placeholder="Agregar otro interés y presionar Enter"
            />
            <Button type="button" variant="outline" onClick={addInteresInput} className="shrink-0 border-border bg-transparent hover:bg-secondary">
              Agregar
            </Button>
          </div>

          {intereses.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {intereses.map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  {i}
                  <button
                    type="button"
                    onClick={() => toggleInteres(i)}
                    aria-label={`Quitar ${i}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </fieldset>

        <div className="h-px bg-border" />

        <fieldset className="space-y-2">
          <Label htmlFor="notas">Algo más que debamos saber (opcional)</Label>
          <Textarea id="notas" name="notas" rows={3} placeholder="Escucha poco del oído izquierdo, le gusta que le hablen despacio…" />
        </fieldset>

        {!hideActions && (
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  className="border-border bg-transparent hover:bg-secondary"
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit" size="lg" className={cn("h-12 text-base", !onCancel && "w-full")}>
                {submitLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Al continuar confirmás que la persona mayor y la familia dan su consentimiento para las llamadas.
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
