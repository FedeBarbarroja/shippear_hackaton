import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-primary"
      >
        {/* sunrise — the "buen día" morning mark */}
        <path d="M2 18h20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12 4v3M4.6 6.6l2.1 2.1M19.4 6.6l-2.1 2.1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path
          d="M5 18a7 7 0 0 1 14 0"
          fill="currentColor"
          fillOpacity="0.9"
        />
      </svg>
      <span className="font-serif text-xl font-medium tracking-tight text-foreground">Buendía</span>
    </span>
  )
}
