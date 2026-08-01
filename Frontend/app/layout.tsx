import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Fraunces, Geist } from "next/font/google"
import { AuthProvider } from "@/lib/auth"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Buendía — Compañía diaria por teléfono para adultos mayores",
  description:
    "Un agente de IA que llama todos los días a la persona mayor, charla unos minutos y le avisa a la familia por WhatsApp cómo está. Cero fricción: solo atiende el teléfono.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#111a24",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`dark ${fraunces.variable} ${geist.variable}`}>
      <body className="bg-background font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
