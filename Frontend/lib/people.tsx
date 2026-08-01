"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { HISTORIAL, type EstadoKey, type Llamada } from "@/lib/buendia"
import { altaPersona as altaPersonaApi } from "@/lib/api"
import type { PersonaFormData } from "@/components/persona-form"

export type Persona = {
  id: string
  nombre: string
  edad?: number
  telefono: string
  horario: string
  familiar: string
  intereses: string[]
  llamadas: Llamada[]
  // Solo las personas dadas de alta por la familia los tienen: las de ejemplo
  // llevan numeros ficticios, asi que no se les puede probar la llamada.
  whatsappFamilia?: string
  medicacion?: string
}

function llamada(
  id: string,
  fecha: string,
  hora: string,
  estado: EstadoKey,
  resumen: string,
  duracion: string,
  atendio = true,
): Llamada {
  return { id, fecha, hora, estado, resumen, duracion, atendio, detalles: {} }
}

// Numero propio para probar la demo: las personas de ejemplo tienen telefonos
// ficticios, asi que sin esto el boton "Probar llamada" queda deshabilitado.
// Se define en Frontend/.env.local (que no se commitea) para no dejar un
// numero personal en el repo.
const TEL_DEMO = process.env.NEXT_PUBLIC_TEST_PHONE

// Personas de ejemplo para la demo del hackathon.
const PERSONAS_INICIALES: Persona[] = [
  {
    id: "rosa",
    nombre: "Rosa Giménez",
    edad: 82,
    telefono: "+54 341 555 0142",
    horario: "10:00",
    familiar: "Lucía (nieta)",
    intereses: ["Los nietos", "El jardín", "Central"],
    llamadas: HISTORIAL,
  },
  {
    id: "hector",
    nombre: "Héctor Duarte",
    edad: 78,
    telefono: "+54 351 555 0188",
    horario: "09:00",
    familiar: "Marcos (hijo)",
    intereses: ["El ajedrez", "Tango", "Sus perros"],
    llamadas: [
      llamada("h4", "2026-08-01", "09:01", "ok", "Todo bien. Salió a caminar con los perros temprano.", "3:22"),
      llamada("h3", "2026-07-31", "09:00", "ok", "De buen humor. Ganó una partida de ajedrez online.", "2:58"),
      llamada("h2", "2026-07-30", "09:03", "ok", "Día tranquilo, tomó toda la medicación.", "3:10"),
      llamada("h1", "2026-07-29", "09:00", "ok", "Sin novedades. Charló de tango.", "2:41"),
    ],
  },
  {
    id: "elba",
    nombre: "Elba Sosa",
    edad: 85,
    telefono: "+54 341 555 0210",
    horario: "11:00",
    familiar: "Paula (hija)",
    intereses: ["Tejido", "Las novelas", "La iglesia"],
    llamadas: [
      llamada("e4", "2026-08-01", "11:02", "alerta", "Suena cansada y no almorzó todavía.", "2:15"),
      llamada("e3", "2026-07-31", "11:00", "ok", "Bien. Terminó una bufanda que estaba tejiendo.", "3:05"),
      llamada("e2", "2026-07-30", "—", "alerta", "No atendió en dos intentos.", "—", false),
      llamada("e1", "2026-07-29", "11:01", "ok", "Contenta, la visitó una amiga.", "3:30"),
    ],
  },
]

type PeopleContextValue = {
  personas: Persona[]
  addPersona: (data: PersonaFormData) => Promise<Persona>
}

const PeopleContext = createContext<PeopleContextValue | null>(null)

export function PeopleProvider({ children }: { children: ReactNode }) {
  const [personas, setPersonas] = useState<Persona[]>(() =>
    TEL_DEMO
      ? PERSONAS_INICIALES.map((p) => ({ ...p, telefono: TEL_DEMO, whatsappFamilia: TEL_DEMO }))
      : PERSONAS_INICIALES,
  )

  async function addPersona(data: PersonaFormData) {
    const medicacion = data.medicacion.map((m) => `${m.nombre} (${m.horario})`).join("; ")

    await altaPersonaApi({
      nombre: data.nombre,
      telefono: data.telefono,
      horario: data.horario,
      whatsappFamilia: data.whatsapp,
      medicacion,
      intereses: data.intereses.join(", "),
    })

    const nueva: Persona = {
      id: `p-${Date.now()}`,
      nombre: data.nombre,
      telefono: data.telefono,
      horario: data.horario,
      familiar: data.familiar,
      intereses: data.intereses,
      llamadas: [], // aún sin llamadas: la primera se agenda para mañana
      whatsappFamilia: data.whatsapp,
      medicacion,
    }
    setPersonas((prev) => [nueva, ...prev])
    return nueva
  }

  const value = useMemo(() => ({ personas, addPersona }), [personas])

  return <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
}

export function usePeople() {
  const ctx = useContext(PeopleContext)
  if (!ctx) throw new Error("usePeople debe usarse dentro de PeopleProvider")
  return ctx
}
