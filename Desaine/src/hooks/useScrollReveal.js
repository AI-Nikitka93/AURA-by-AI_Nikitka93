import { useEffect } from 'react'

export function useScrollReveal(selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [selector])
}

export default useScrollReveal
