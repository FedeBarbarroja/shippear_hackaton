import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Problema } from "@/components/landing/problema"
import { ComoFunciona } from "@/components/landing/como-funciona"
import { Estados } from "@/components/landing/estados"
import { Objeciones } from "@/components/landing/objeciones"
import { Cta } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <Hero />
        <Problema />
        <ComoFunciona />
        <Estados />
        <Objeciones />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
