"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Phone, Clock, UserPlus, MessageCircle, CalendarClock, ArrowRight, PhoneOff, PhoneCall } from "lucide-react"
import { cn } from "@/lib/utils"
import { ESTADOS } from "@/lib/buendia"
import { dispararLlamada } from "@/lib/api"
import { usePeople, type Persona } from "@/lib/people"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { AddPersonaModal } from "@/components/panel/add-persona-modal"

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
}

function formatDia(iso: string) {
  if (iso === "—") return "—"
  return new Date(iso + "T12:00:00").toLocaleDateString("es-AR", { weekday: "short", day: "numeric" })
}

function PersonaCard({ persona }: { persona: Persona }) {
  const ultima = persona.llamadas[0]
  const eUltima = ultima ? ESTADOS[ultima.estado] : null
  const semaforo = persona.llamadas.slice(0, 7).reverse()
  const recientes = persona.llamadas.slice(0, 3)
  const [prueba, setPrueba] = useState<"idle" | "llamando" | "ok" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  async function probarLlamada() {
    if (!persona.whatsappFamilia) return
    setPrueba("llamando")
    setError(null)
    try {
      await dispararLlamada({
        nombre: persona.nombre,
        telefono: persona.telefono,
        whatsappFamilia: persona.whatsappFamilia,
        medicacion: persona.medicacion,
      })
      setPrueba("ok")
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo llamar")
      setPrueba("error")
    }
  }

  return (
    <article className={cn("flex flex-col rounded-3xl border border-border bg-card p-6 ring-1", eUltima ? eUltima.ringClass : "ring-transparent")}>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-lg font-medium text-foreground">
          {iniciales(persona.nombre)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-xl font-medium text-card-foreground">{persona.nombre}</h2>
            {eUltima && (
              <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", eUltima.chipClass)}>
                {eUltima.label}
              </span>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" aria-hidden="true" />
              {persona.telefono}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {persona.horario} hs
            </span>
          </div>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            Parte a {persona.familiar}
          </p>
        </div>
      </div>

      {/* Semáforo */}
      {semaforo.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-1.5" role="img" aria-label="Últimas llamadas">
          {semaforo.map((l) => (
            <span
              key={l.id}
              className={cn("h-6 w-6 rounded-md ring-1 ring-inset ring-white/10", ESTADOS[l.estado].dotClass, l.estado === "ok" && "opacity-90")}
              title={`${formatDia(l.fecha)} · ${ESTADOS[l.estado].label}`}
              aria-hidden="true"
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5 text-sm text-foreground/90">
          <CalendarClock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>Primera llamada agendada para mañana a las {persona.horario} hs.</span>
        </div>
      )}

      {/* Últimas llamadas */}
      {recientes.length > 0 && (
        <div className="mt-5 flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Últimas llamadas</p>
          <ul className="space-y-2">
            {recientes.map((l) => {
              const e = ESTADOS[l.estado]
              return (
                <li key={l.id} className="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/30 px-3 py-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    {l.atendio ? (
                      <span className={cn("h-2.5 w-2.5 rounded-full", e.dotClass)} aria-hidden="true" />
                    ) : (
                      <PhoneOff className="h-3.5 w-3.5 text-warn" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{l.resumen}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {formatDia(l.fecha)} · {l.hora} hs
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className="mt-5 space-y-2 border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center"
          disabled={!persona.whatsappFamilia || prueba === "llamando"}
          onClick={probarLlamada}
          title={
            persona.whatsappFamilia
              ? `Llama a ${persona.telefono} y manda el parte a ${persona.whatsappFamilia}`
              : "Persona de ejemplo: no tiene WhatsApp real cargado"
          }
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          {prueba === "llamando" ? "Llamando…" : prueba === "ok" ? "Llamada en curso" : "Probar llamada"}
        </Button>
        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
        {prueba === "ok" && (
          <p className="text-xs text-muted-foreground">
            Suena en unos segundos. El parte llega al WhatsApp cuando corte.
          </p>
        )}

        <Button
          render={<Link href="/dashboard" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="w-full justify-between text-foreground hover:bg-secondary"
        >
          Ver historial completo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  )
}

export function Panel() {
  const { personas } = usePeople()
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const necesitanAtencion = useMemo(
    () => personas.filter((p) => p.llamadas[0] && p.llamadas[0].estado !== "ok").length,
    [personas],
  )

  function handleCreated(nombre: string) {
    setToast(`${nombre} quedó agendada. La llamamos mañana.`)
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Panel de la familia</span>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Tus personas mayores
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {user?.email} · {personas.length} {personas.length === 1 ? "persona" : "personas"}
            {necesitanAtencion > 0 && (
              <>
                {" · "}
                <span className="text-warn">
                  {necesitanAtencion} {necesitanAtencion === 1 ? "necesita" : "necesitan"} atención
                </span>
              </>
            )}
          </p>
        </div>
        <Button size="lg" onClick={() => setModalOpen(true)}>
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Agregar persona
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => (
          <PersonaCard key={p.id} persona={p} />
        ))}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-transparent p-6 text-center text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <UserPlus className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-medium">Agregar otra persona</span>
          <span className="text-sm">Sumá a un familiar para que Buendía lo acompañe.</span>
        </button>
      </div>

      <AddPersonaModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={handleCreated} />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-ok/30 bg-card px-5 py-3 text-sm text-foreground shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
