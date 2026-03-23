import { useEffect, useRef, useState } from 'react'

export default function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Вычисляем прогресс видимости элемента
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height)

      // Применяем параллакс только когда элемент в видимости
      if (progress > 0 && progress < 1) {
        setOffset((progress - 0.5) * speed * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
