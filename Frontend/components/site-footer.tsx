import Link from "next/link"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              Compañía diaria por teléfono para adultos mayores. Una capa de contención donde hoy no hay nada.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Producto</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/#como-funciona" className="text-foreground/80 transition-colors hover:text-foreground">
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link href="/#estados" className="text-foreground/80 transition-colors hover:text-foreground">
                    Los tres estados
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-foreground/80 transition-colors hover:text-foreground">
                    Panel de la familia
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Empezar</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/alta" className="text-foreground/80 transition-colors hover:text-foreground">
                    Dar de alta
                  </Link>
                </li>
                <li>
                  <Link href="/#preguntas" className="text-foreground/80 transition-colors hover:text-foreground">
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Contacto</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="text-foreground/80">hola@buendia.app</li>
                <li className="text-foreground/80">Rosario, Argentina</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Buendía. Hackathon Rosario — Track Impacto Social.</p>
          <p>No reemplaza al 107 ni a un botón antipánico. El fallback siempre es un humano.</p>
        </div>
      </div>
    </footer>
  )
}
