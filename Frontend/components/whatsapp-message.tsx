import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ESTADOS, type EstadoKey } from "@/lib/buendia"

export function WhatsappMessage({
  estado,
  persona = "Rosa",
  fecha = "martes 10:00",
  className,
}: {
  estado: EstadoKey
  persona?: string
  fecha?: string
  className?: string
}) {
  const e = ESTADOS[estado]
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl rounded-tl-sm bg-card p-4 shadow-lg ring-1 ring-border",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("h-2.5 w-2.5 rounded-full", e.dotClass)} aria-hidden="true" />
        <span className="text-xs font-medium text-muted-foreground">
          Buendía — {persona}, {fecha}
        </span>
      </div>
      <p className="mt-2 text-pretty text-[15px] leading-relaxed text-card-foreground">
        <span className={cn("font-semibold", e.textClass)}>{e.label}.</span>{" "}
        {e.ejemplo.replace(new RegExp(`^${e.label}\\.\\s*`), "")}
      </p>
      <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
        <span>10:03</span>
        <Check className="h-3 w-3 text-primary" aria-hidden="true" />
      </div>
    </div>
  )
}
