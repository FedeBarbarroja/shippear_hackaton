"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

export function SiteHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="Inicio Buendía">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          <Link href="/#como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Cómo funciona
          </Link>
          <Link href="/#estados" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Los tres estados
          </Link>
          <Link href="/panel" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Panel de la familia
          </Link>
          <Link href="/#preguntas" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Preguntas
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button render={<Link href="/panel" />} nativeButton={false} variant="ghost" size="sm" className="hidden text-foreground hover:bg-secondary sm:inline-flex">
                Ir al panel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-border bg-transparent hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            <>
              <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="sm" className="hidden text-foreground hover:bg-secondary sm:inline-flex">
                Entrar
              </Button>
              <Button render={<Link href="/alta" />} nativeButton={false} size="sm">
                Dar de alta
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
