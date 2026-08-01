"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Lock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { DEMO_CREDENTIALS, useAuth } from "@/lib/auth"

export function LoginForm() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) router.replace("/panel")
  }, [user, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = login(email, password)
    if (res.ok) {
      router.replace("/panel")
    } else {
      setError(res.error ?? "No se pudo iniciar sesión.")
    }
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setError(null)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8" aria-label="Ir al inicio">
        <Logo />
      </Link>

      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-medium text-card-foreground">Entrar al panel</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Accedé al panel de la familia.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="familia@buendia.app"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-emergency/30 bg-emergency/10 px-3 py-2 text-sm text-emergency">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="h-11 w-full">
            Iniciar sesión
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>

        <button
          type="button"
          onClick={fillDemo}
          className="mt-5 flex w-full items-start gap-2.5 rounded-xl border border-border bg-secondary/40 p-3 text-left text-sm transition-colors hover:bg-secondary/70"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Demo del hackathon.</span> Tocá acá para
            autocompletar: <span className="text-foreground">{DEMO_CREDENTIALS.email}</span> /{" "}
            <span className="text-foreground">{DEMO_CREDENTIALS.password}</span>
          </span>
        </button>
      </div>

      <Link href="/" className="mt-6 text-sm text-muted-foreground transition-colors hover:text-foreground">
        Volver al inicio
      </Link>
    </div>
  )
}
