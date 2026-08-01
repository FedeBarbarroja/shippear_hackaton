const API_URL = process.env.NEXT_PUBLIC_API_URL

export type AltaPersonaPayload = {
  nombre: string
  telefono: string
  horario: string
  whatsappFamilia: string
  medicacion: string
  intereses: string
}

export async function altaPersona(payload: AltaPersonaPayload) {
  const res = await fetch(`${API_URL}/personas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Error al dar de alta (${res.status})`)
  }

  return res.json()
}
