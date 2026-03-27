import { useEffect, useState } from 'react'
import ConsentBanner from './components/system/ConsentBanner'
import PrivacyControlCenter from './components/system/PrivacyControlCenter'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import BenefitsSection from './components/sections/BenefitsSection'
import CaseStudySection from './components/sections/CaseStudySection'
import CtaSection from './components/sections/CtaSection'
import FaqSection from './components/sections/FaqSection'
import FounderSection from './components/sections/FounderSection'
import HeroSection from './components/sections/HeroSection'
import ProductAdvisorSection from './components/sections/ProductAdvisorSection'
import SocialProofSection from './components/sections/SocialProofSection'
import ParticleBackground from './components/ui/ParticleBackground'
import { navigationItems } from './data/landingContent'
import usePwaInstall from './hooks/usePwaInstall'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false)
  const pwa = usePwaInstall()

  useScrollReveal()

  useEffect(() => {
    document.body.style.overflow = isPrivacyCenterOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isPrivacyCenterOpen])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const focus = params.get('focus')

    if (!focus) {
      return
    }

    const element = document.getElementById(focus)

    if (!element) {
      return
    }

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 180)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-text">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,124,255,0.16),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(55,214,181,0.08),transparent_22%),linear-gradient(180deg,#090B10_0%,#0B0E14_48%,#090B10_100%)]" />
      
      <Navbar items={navigationItems} />
      <main className="relative z-10">
        <HeroSection />
        <BenefitsSection />
        <ProductAdvisorSection />
        <CaseStudySection />
        <FounderSection />
        <SocialProofSection />
        <FaqSection />
        <CtaSection
          onOpenPrivacyCenter={() => setIsPrivacyCenterOpen(true)}
          pwa={pwa}
        />
      </main>
      <Footer onOpenPrivacyCenter={() => setIsPrivacyCenterOpen(true)} />
      <ConsentBanner />
      <PrivacyControlCenter
        isOpen={isPrivacyCenterOpen}
        onClose={() => setIsPrivacyCenterOpen(false)}
      />
    </div>
  )
}
