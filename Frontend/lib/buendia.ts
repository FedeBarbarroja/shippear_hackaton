export type EstadoKey = "ok" | "alerta" | "emergencia"

export type Estado = {
  key: EstadoKey
  label: string
  short: string
  descripcion: string
  dispara: string
  ejemplo: string
  dotClass: string
  textClass: string
  chipClass: string
  ringClass: string
}

export const ESTADOS: Record<EstadoKey, Estado> = {
  ok: {
    key: "ok",
    label: "Todo bien",
    short: "Todo bien",
    descripcion: "Atendió, coherente, comió, tomó la medicación y de ánimo normal.",
    dispara: "Atendió · coherente · comió · tomó la medicación · ánimo normal",
    ejemplo:
      "Todo bien. Durmió bien, desayunó y tomó la medicación. De buen ánimo, contó que la visitó su nieta.",
    dotClass: "bg-ok",
    textClass: "text-ok",
    chipClass: "bg-ok/15 text-ok border border-ok/30",
    ringClass: "ring-ok/40",
  },
  alerta: {
    key: "alerta",
    label: "Alerta",
    short: "Alerta",
    descripcion:
      "No comió, se olvidó la medicación, suena decaída, malestar leve, o no atendió la llamada.",
    dispara: "No comió · olvidó la medicación · suena decaída · malestar leve · no atendió",
    ejemplo:
      "Atención. No desayunó y sonó decaída. Sería bueno que la llames hoy.",
    dotClass: "bg-warn",
    textClass: "text-warn",
    chipClass: "bg-warn/15 text-warn border border-warn/30",
    ringClass: "ring-warn/40",
  },
  emergencia: {
    key: "emergencia",
    label: "Emergencia",
    short: "Emergencia",
    descripcion:
      "Mencionó una caída, dolor fuerte, confusión marcada, dificultad para respirar, o pidió ayuda.",
    dispara: "Caída · dolor fuerte · confusión · dificultad para respirar · pidió ayuda",
    ejemplo:
      "Emergencia. Mencionó que se cayó esta mañana y le duele la cadera. Llamala ya o acercate.",
    dotClass: "bg-emergency",
    textClass: "text-emergency",
    chipClass: "bg-emergency/15 text-emergency border border-emergency/40",
    ringClass: "ring-emergency/50",
  },
}

export const ESTADOS_LIST = [ESTADOS.ok, ESTADOS.alerta, ESTADOS.emergencia]

export type Llamada = {
  id: string
  fecha: string // ISO
  hora: string
  estado: EstadoKey
  resumen: string
  duracion: string
  detalles: {
    durmio?: string
    desayuno?: string
    medicacion?: string
    animo?: string
  }
  atendio: boolean
}

export const PERSONA = {
  nombre: "Rosa Giménez",
  edad: 82,
  telefono: "+54 341 555 0142",
  horario: "10:00",
  familiar: "Lucía (nieta)",
  intereses: ["Los nietos", "El jardín", "Central"],
}

// Últimas 14 llamadas — orden de más reciente a más antigua
export const HISTORIAL: Llamada[] = [
  {
    id: "l14",
    fecha: "2026-08-01",
    hora: "10:02",
    estado: "alerta",
    resumen: "No desayunó y sonó algo decaída. Se mareó un poco al levantarse.",
    duracion: "2:48",
    atendio: true,
    detalles: {
      durmio: "Regular, se despertó varias veces",
      desayuno: "No desayunó todavía",
      medicacion: "Tomó la de la presión",
      animo: "Decaída, un poco sola",
    },
  },
  {
    id: "l13",
    fecha: "2026-07-31",
    hora: "10:00",
    estado: "ok",
    resumen: "Durmió bien, desayunó y tomó la medicación. De buen ánimo.",
    duracion: "3:11",
    atendio: true,
    detalles: {
      durmio: "Bien, de un tirón",
      desayuno: "Té con tostadas",
      medicacion: "Completa",
      animo: "Contenta, esperaba a la nieta",
    },
  },
  {
    id: "l12",
    fecha: "2026-07-30",
    hora: "10:01",
    estado: "ok",
    resumen: "Charló del jardín. Todo en orden con la medicación.",
    duracion: "3:40",
    atendio: true,
    detalles: {
      durmio: "Bien",
      desayuno: "Sí",
      medicacion: "Completa",
      animo: "Muy bien",
    },
  },
  {
    id: "l11",
    fecha: "2026-07-29",
    hora: "—",
    estado: "alerta",
    resumen: "No atendió la llamada en dos intentos.",
    duracion: "—",
    atendio: false,
    detalles: {},
  },
  {
    id: "l10",
    fecha: "2026-07-28",
    hora: "10:00",
    estado: "ok",
    resumen: "Todo normal. Miró el partido anoche.",
    duracion: "2:55",
    atendio: true,
    detalles: {
      durmio: "Bien",
      desayuno: "Sí",
      medicacion: "Completa",
      animo: "De buen humor",
    },
  },
  {
    id: "l9",
    fecha: "2026-07-27",
    hora: "10:03",
    estado: "emergencia",
    resumen: "Mencionó que se cayó en el baño y le duele la cadera.",
    duracion: "1:52",
    atendio: true,
    detalles: {
      durmio: "Mal",
      desayuno: "No",
      medicacion: "No recordaba",
      animo: "Dolorida, asustada",
    },
  },
  {
    id: "l8",
    fecha: "2026-07-26",
    hora: "10:00",
    estado: "ok",
    resumen: "Bien. Contó que llamó su hijo de Córdoba.",
    duracion: "3:20",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Contenta" },
  },
  {
    id: "l7",
    fecha: "2026-07-25",
    hora: "10:01",
    estado: "ok",
    resumen: "Día tranquilo, sin novedades.",
    duracion: "2:30",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Normal" },
  },
  {
    id: "l6",
    fecha: "2026-07-24",
    hora: "10:00",
    estado: "alerta",
    resumen: "Se olvidó de tomar la medicación de la mañana.",
    duracion: "3:05",
    atendio: true,
    detalles: {
      durmio: "Bien",
      desayuno: "Sí",
      medicacion: "Olvidó la de la tiroides",
      animo: "Bien",
    },
  },
  {
    id: "l5",
    fecha: "2026-07-23",
    hora: "10:02",
    estado: "ok",
    resumen: "Todo bien, de buen ánimo.",
    duracion: "3:15",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Muy bien" },
  },
  {
    id: "l4",
    fecha: "2026-07-22",
    hora: "10:00",
    estado: "ok",
    resumen: "Charló de las plantas. Todo en orden.",
    duracion: "3:48",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Contenta" },
  },
  {
    id: "l3",
    fecha: "2026-07-21",
    hora: "10:01",
    estado: "ok",
    resumen: "Sin novedades. Buen descanso.",
    duracion: "2:42",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Normal" },
  },
  {
    id: "l2",
    fecha: "2026-07-20",
    hora: "10:00",
    estado: "ok",
    resumen: "Todo bien. Habló de sus nietos.",
    duracion: "3:30",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Feliz" },
  },
  {
    id: "l1",
    fecha: "2026-07-19",
    hora: "10:02",
    estado: "ok",
    resumen: "Primer día. Charla cálida, todo normal.",
    duracion: "4:02",
    atendio: true,
    detalles: { durmio: "Bien", desayuno: "Sí", medicacion: "Completa", animo: "Bien" },
  },
]
