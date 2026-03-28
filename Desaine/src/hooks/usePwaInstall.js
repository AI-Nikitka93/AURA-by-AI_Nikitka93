import { useEffect, useState } from 'react'

function getStandaloneState() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

export default function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(() => getStandaloneState())
  const [hasServiceWorker, setHasServiceWorker] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setCanInstall(true)
    }

    const handleInstalled = () => {
      setDeferredPrompt(null)
      setCanInstall(false)
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return undefined
    }

    let isMounted = true

    Promise.allSettled([
      navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister()))
      ),
      'caches' in window
        ? caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        : Promise.resolve(),
    ])
      .then(() => {
        if (isMounted) {
          setHasServiceWorker(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasServiceWorker(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false
    }

    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    const accepted = choice.outcome === 'accepted'

    if (accepted) {
      setDeferredPrompt(null)
      setCanInstall(false)
    }

    return accepted
  }

  return {
    canInstall,
    isInstalled,
    hasServiceWorker,
    promptInstall,
  }
}
