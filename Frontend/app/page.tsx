import { Header } from "@/components/header"
import { HeroAbout } from "@/components/hero-about"
import { PlansSection } from "@/components/plans-section"
import { MenuSection } from "@/components/menu-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroAbout />
      <PlansSection />
      <MenuSection />
      <Contact />
      <Footer />
    </main>
  )
}
