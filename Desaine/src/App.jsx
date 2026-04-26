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
import usePwaInstall from './hooks/usePwaInstall'
import useSiteCopy from './hooks/useSiteCopy'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pwa = usePwaInstall()
  const { copy } = useSiteCopy()

  useScrollReveal()

  useEffect(() => {
    document.body.style.overflow = isPrivacyCenterOpen || isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isPrivacyCenterOpen, isMobileMenuOpen])

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

  useEffect(() => {
    document.title = copy.document.title

    const descriptionTag = document.querySelector('meta[name="description"]')

    if (descriptionTag) {
      descriptionTag.setAttribute('content', copy.document.description)
    }
  }, [copy])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-text">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,124,255,0.16),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(55,214,181,0.08),transparent_22%),linear-gradient(180deg,#090B10_0%,#0B0E14_48%,#090B10_100%)]" />
      
      <Navbar
        items={copy.navigationItems}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuOpenChange={setIsMobileMenuOpen}
      />
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
      <ConsentBanner isMenuOpen={isMobileMenuOpen} />
      <PrivacyControlCenter
        isOpen={isPrivacyCenterOpen}
        onClose={() => setIsPrivacyCenterOpen(false)}
      />
    </div>
  )
}
