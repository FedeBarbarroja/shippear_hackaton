"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Credenciales falsas para la demo del hackathon.
export const DEMO_CREDENTIALS = {
  email: "familia@buendia.app",
  password: "buendia2026",
}

type User = { email: string }

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const STORAGE_KEY = "buendia_auth"

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  function login(email: string, password: string) {
    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const next = { email: normalized }
      setUser(next)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return { ok: true }
    }
    return { ok: false, error: "Email o contraseña incorrectos." }
  }

  function logout() {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return ctx
}
