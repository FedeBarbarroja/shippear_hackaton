"use client"

import { useEffect, useState } from "react"
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
  const [numero, setNumero] = useState(defaultValue?.replace(/^\+\d+/, "").trim() ?? "")
  const [valor, setValor] = useState("")

  useEffect(() => {
    const dial = PAISES.find((p) => p.code === pais)?.dial ?? ""
    const digitos = numero.replace(/\D/g, "")
    setValor(digitos ? `${dial}${digitos}` : "")
  }, [pais, numero])

  return (
    <div className="flex gap-2">
      <Select value={pais} onValueChange={setPais}>
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
      <Input
        id={id}
        type="tel"
        required={required}
        placeholder={placeholder}
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className="flex-1"
      />
      <input type="hidden" name={name} value={valor} />
    </div>
  )
}
