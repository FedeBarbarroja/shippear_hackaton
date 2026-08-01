"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PAISES = [
  { code: "AR", dial: "+549", flag: "🇦🇷", label: "Argentina (+54 9)" },
  { code: "UY", dial: "+598", flag: "🇺🇾", label: "Uruguay (+598)" },
  { code: "CL", dial: "+56", flag: "🇨🇱", label: "Chile (+56)" },
  { code: "BR", dial: "+55", flag: "🇧🇷", label: "Brasil (+55)" },
  { code: "PY", dial: "+595", flag: "🇵🇾", label: "Paraguay (+595)" },
  { code: "BO", dial: "+591", flag: "🇧🇴", label: "Bolivia (+591)" },
  { code: "ES", dial: "+34", flag: "🇪🇸", label: "España (+34)" },
  { code: "US", dial: "+1", flag: "🇺🇸", label: "Estados Unidos (+1)" },
]

// name: nombre del input visible (el que autocompleta el navegador).
// El codigo de pais viaja en un input oculto "{name}-dial". El submit
// del formulario combina ambos leyendo el DOM directo, no el estado de
// React, para no perder el autocompletado del navegador.
export function PhoneInput({
  id,
  name,
  required,
  placeholder,
  defaultValue,
}: {
  id?: string
  name: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
}) {
  const [pais, setPais] = useState(PAISES[0].code)
  const dial = PAISES.find((p) => p.code === pais)?.dial ?? ""

  return (
    <div className="flex gap-2">
      <Select value={pais} onValueChange={(v) => v && setPais(v)}>
        <SelectTrigger className="w-[92px] shrink-0" aria-label="Código de país">
          <SelectValue>{PAISES.find((p) => p.code === pais)?.flag}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {PAISES.map((p) => (
            <SelectItem key={p.code} value={p.code}>
              {p.flag} {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" name={`${name}-dial`} value={dial} />
      <Input
        id={id}
        name={name}
        autoComplete="tel-national"
        type="tel"
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue?.replace(/^\+\d+/, "").trim()}
        className="flex-1"
      />
    </div>
  )
}

// Combina el numero tipeado/autocompletado con el codigo de pais elegido,
// leyendo ambos directo del DOM del formulario (no de estado de React).
export function leerTelefonoCompleto(form: HTMLFormElement, campo: string) {
  const digitos = (form.elements.namedItem(campo) as HTMLInputElement | null)?.value.replace(/\D/g, "") ?? ""
  const dial = (form.elements.namedItem(`${campo}-dial`) as HTMLInputElement | null)?.value ?? ""
  return digitos ? `${dial}${digitos}` : ""
}
