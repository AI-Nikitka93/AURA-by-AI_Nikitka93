import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import BenefitsSection from './components/sections/BenefitsSection'
import CaseStudySection from './components/sections/CaseStudySection'
import CtaSection from './components/sections/CtaSection'
import FaqSection from './components/sections/FaqSection'
import FounderSection from './components/sections/FounderSection'
import HeroSection from './components/sections/HeroSection'
import SocialProofSection from './components/sections/SocialProofSection'
import { navigationItems } from './data/landingContent'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,124,255,0.16),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(55,214,181,0.08),transparent_22%),linear-gradient(180deg,#090B10_0%,#0B0E14_48%,#090B10_100%)]" />
      <Navbar items={navigationItems} />
      <main className="relative z-10">
        <HeroSection />
        <BenefitsSection />
        <CaseStudySection />
        <FounderSection />
        <SocialProofSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
