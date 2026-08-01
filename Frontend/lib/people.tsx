"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { HISTORIAL, type Llamada } from "@/lib/buendia"
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
  whatsappFamilia?: string
  medicacion?: string
}

// Unica persona de la demo, con numero real para poder probar el circuito.
const PERSONAS_INICIALES: Persona[] = [
  {
    id: "rosa",
    nombre: "Rosa Giménez",
    edad: 82,
    telefono: "+5493402529368",
    whatsappFamilia: "+5493402529368",
    medicacion: "presión, 1 comprimido después del desayuno",
    horario: "10:00",
    familiar: "Lucía (nieta)",
    intereses: ["Los nietos", "El jardín", "Central"],
    llamadas: HISTORIAL,
  },
]

type PeopleContextValue = {
  personas: Persona[]
  addPersona: (data: PersonaFormData) => Promise<Persona>
}

const PeopleContext = createContext<PeopleContextValue | null>(null)

export function PeopleProvider({ children }: { children: ReactNode }) {
  const [personas, setPersonas] = useState<Persona[]>(PERSONAS_INICIALES)

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
