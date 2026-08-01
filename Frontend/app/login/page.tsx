import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Entrar — Buendía",
  description: "Accedé al panel de la familia de Buendía.",
}

export default function LoginPage() {
  return <LoginForm />
}
