import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TechStack from "@/components/tech-stack"
import DownloadSection from "@/components/download-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStack />
      <DownloadSection />
      <Footer />
    </main>
  )
}
