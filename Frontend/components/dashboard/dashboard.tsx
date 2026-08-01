"use client"

import { useMemo, useState } from "react"
import {
  Phone,
  Clock,
  MessageCircle,
  ChevronDown,
  Moon,
  Coffee,
  Pill,
  Smile,
  PhoneOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ESTADOS, HISTORIAL, PERSONA, type Llamada } from "@/lib/buendia"
import { WhatsappMessage } from "@/components/whatsapp-message"

function formatFecha(iso: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-AR", opts ?? { weekday: "long", day: "numeric", month: "long" })
}

function formatDia(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-AR", { weekday: "short", day: "numeric" })
}

function DetalleFila({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}

function LlamadaCard({ llamada }: { llamada: Llamada }) {
  const [open, setOpen] = useState(false)
  const e = ESTADOS[llamada.estado]
  const tieneDetalle = llamada.atendio && Object.values(llamada.detalles).some(Boolean)

  return (
    <li className={cn("rounded-2xl border border-border bg-card ring-1 ring-transparent", e.ringClass)}>
      <button
        type="button"
        onClick={() => tieneDetalle && setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-4 p-4 text-left md:p-5",
          tieneDetalle ? "cursor-pointer" : "cursor-default",
        )}
        aria-expanded={tieneDetalle ? open : undefined}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            llamada.estado === "ok" ? "bg-ok/15" : llamada.estado === "alerta" ? "bg-warn/15" : "bg-emergency/15",
          )}
        >
          {llamada.atendio ? (
            <span className={cn("h-3 w-3 rounded-full", e.dotClass)} aria-hidden="true" />
          ) : (
            <PhoneOff className="h-4 w-4 text-warn" aria-hidden="true" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium capitalize text-foreground">{formatFecha(llamada.fecha)}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", e.chipClass)}>
              {e.label}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{llamada.resumen}</p>
        </div>

        <div className="hidden shrink-0 items-center gap-4 text-xs text-muted-foreground sm:flex">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {llamada.hora}
          </span>
          <span>{llamada.duracion}</span>
        </div>

        {tieneDetalle && (
          <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} aria-hidden="true" />
        )}
      </button>

      {tieneDetalle && open && (
        <div className="border-t border-border px-4 pb-5 pt-4 md:px-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <DetalleFila icon={Moon} label="Descanso" value={llamada.detalles.durmio} />
            <DetalleFila icon={Coffee} label="Desayuno" value={llamada.detalles.desayuno} />
            <DetalleFila icon={Pill} label="Medicación" value={llamada.detalles.medicacion} />
            <DetalleFila icon={Smile} label="Ánimo" value={llamada.detalles.animo} />
          </div>
          <div className="mt-5">
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Parte enviado a la familia</p>
            <WhatsappMessage estado={llamada.estado} fecha={formatDia(llamada.fecha)} className="max-w-md" />
          </div>
        </div>
      )}
    </li>
  )
}

export function Dashboard() {
  const [filtro, setFiltro] = useState<"todos" | "ok" | "alerta" | "emergencia">("todos")

  const conteos = useMemo(() => {
    const base = { ok: 0, alerta: 0, emergencia: 0 }
    for (const l of HISTORIAL) base[l.estado]++
    return base
  }, [])

  const ultima = HISTORIAL[0]
  const eUltima = ESTADOS[ultima.estado]

  const filtradas = useMemo(
    () => (filtro === "todos" ? HISTORIAL : HISTORIAL.filter((l) => l.estado === filtro)),
    [filtro],
  )

  // semáforo: cronológico (más antiguo a la izquierda)
  const semaforo = [...HISTORIAL].reverse()

  const FILTROS: { key: typeof filtro; label: string; count?: number }[] = [
    { key: "todos", label: "Todas", count: HISTORIAL.length },
    { key: "ok", label: "Todo bien", count: conteos.ok },
    { key: "alerta", label: "Alertas", count: conteos.alerta },
    { key: "emergencia", label: "Emergencias", count: conteos.emergencia },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      {/* Encabezado persona */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-primary">Panel de la familia</span>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {PERSONA.nombre}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {PERSONA.telefono}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Llamada diaria {PERSONA.horario} hs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Parte a {PERSONA.familiar}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Estado de hoy */}
        <div className={cn("rounded-3xl border border-border bg-card p-6 ring-1 md:p-8", eUltima.ringClass)}>
          <div className="flex items-center gap-2">
            <span className={cn("h-3 w-3 rounded-full", eUltima.dotClass)} aria-hidden="true" />
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide", eUltima.chipClass)}>
              Último parte · {eUltima.label}
            </span>
          </div>
          <p className="mt-4 text-balance font-serif text-2xl font-medium leading-snug text-card-foreground md:text-3xl">
            {ultima.resumen}
          </p>
          <p className="mt-3 text-sm capitalize text-muted-foreground">
            {formatFecha(ultima.fecha)} · {ultima.hora} hs · {ultima.duracion} min
          </p>
          <div className="mt-6">
            <WhatsappMessage estado={ultima.estado} fecha={formatDia(ultima.fecha)} className="max-w-md" />
          </div>
        </div>

        {/* Resumen últimos 14 días */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Últimos 14 días</p>
            <div className="mt-5 flex flex-wrap gap-2" role="img" aria-label="Semáforo de los últimos 14 días">
              {semaforo.map((l) => {
                const e = ESTADOS[l.estado]
                return (
                  <div key={l.id} className="group relative">
                    <span
                      className={cn("block h-9 w-9 rounded-lg ring-1 ring-inset ring-white/10", e.dotClass, l.estado === "ok" ? "opacity-90" : "")}
                      aria-hidden="true"
                    />
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-[11px] capitalize text-popover-foreground opacity-0 shadow-md ring-1 ring-border transition-opacity group-hover:opacity-100">
                      {formatDia(l.fecha)} · {e.label}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { key: "ok" as const, n: conteos.ok },
                { key: "alerta" as const, n: conteos.alerta },
                { key: "emergencia" as const, n: conteos.emergencia },
              ].map(({ key, n }) => {
                const e = ESTADOS[key]
                return (
                  <div key={key} className="rounded-xl border border-border bg-secondary/30 p-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-2 w-2 rounded-full", e.dotClass)} aria-hidden="true" />
                      <span className="text-xs text-muted-foreground">{e.label}</span>
                    </div>
                    <p className="mt-1 font-serif text-2xl font-medium text-foreground">{n}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Historial */}
      <div className="mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">Historial de llamadas</h2>
          <div className="flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFiltro(f.key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  filtro === f.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
                {typeof f.count === "number" && <span className="ml-1.5 opacity-70">{f.count}</span>}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {filtradas.map((l) => (
            <LlamadaCard key={l.id} llamada={l} />
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tocá una llamada para ver el detalle de la conversación y el parte enviado.
        </p>
      </div>
    </div>
  )
}
