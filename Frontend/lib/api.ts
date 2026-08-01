const API_URL = process.env.NEXT_PUBLIC_API_URL

export type AltaPersonaPayload = {
  nombre: string
  telefono: string
  horario: string
  whatsappFamilia: string
  medicacion: string
  intereses: string
}

async function post(path: string, payload: unknown, errorMsg: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `${errorMsg} (${res.status})`)
  }

  return res.json()
}

export function altaPersona(payload: AltaPersonaPayload) {
  return post("/personas", payload, "Error al dar de alta")
}

export type DispararLlamadaPayload = {
  nombre: string
  telefono: string
  whatsappFamilia: string
  medicacion?: string
}

export function dispararLlamada(payload: DispararLlamadaPayload) {
  return post("/llamadas/disparar", payload, "Error al disparar la llamada")
}
