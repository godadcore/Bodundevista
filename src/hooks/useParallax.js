import { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)

export default function useParallax(options = 24) {
  const ref = useRef(null)
  const settings = typeof options === 'number' ? { y: options } : options || {}
  const {
    x = 0,
    y = 0,
    revealX = 0,
    revealY = 0,
    revealScale = 0,
    fade = false,
    mobileFactor = 0.16,
    mobileBreakpoint = 810,
  } = settings

  useEffect(() => {
    const element = ref.current
    if (!element || typeof window === 'undefined') return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hasReveal = revealX || revealY || revealScale || fade
    let frame = 0

    const update = () => {
      frame = 0

      if (reducedMotion.matches) {
        element.style.willChange = 'auto'
        element.style.setProperty('--parallax-x', '0px')
        element.style.setProperty('--parallax-y', '0px')
        element.style.setProperty('--reveal-x', '0px')
        element.style.setProperty('--reveal-y', '0px')
        element.style.setProperty('--reveal-scale', '1')
        element.style.setProperty('--reveal-opacity', '1')
        return
      }

      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const viewportWidth = window.innerWidth || 0
      const centerOffset = rect.top + rect.height / 2 - viewport / 2
      const progress = clamp(centerOffset / viewport, -1, 1)
      const isMobileViewport = viewportWidth < mobileBreakpoint
      const motionScale = isMobileViewport ? mobileFactor : 1
      const parallaxX = progress * x * motionScale
      const parallaxY = progress * y * motionScale

      element.style.willChange = isMobileViewport ? 'auto' : 'transform, opacity'

      element.style.setProperty('--parallax-x', `${parallaxX.toFixed(2)}px`)
      element.style.setProperty('--parallax-y', `${parallaxY.toFixed(2)}px`)

      if (!hasReveal) {
        element.style.setProperty('--reveal-x', '0px')
        element.style.setProperty('--reveal-y', '0px')
        element.style.setProperty('--reveal-scale', '1')
        element.style.setProperty('--reveal-opacity', '1')
        return
      }

      const rawReveal = (viewport * 0.94 - rect.top) / (viewport * 0.72)
      const revealProgress = easeOutCubic(clamp(rawReveal, 0, 1))
      const remaining = 1 - revealProgress
      const revealOffsetX = revealX * remaining * motionScale
      const revealOffsetY = revealY * remaining * motionScale
      const scale = clamp(1 + revealScale * remaining, 0.82, 1.12)
      const opacity = fade ? 0.18 + revealProgress * 0.82 : 1

      element.style.setProperty('--reveal-x', `${revealOffsetX.toFixed(2)}px`)
      element.style.setProperty('--reveal-y', `${revealOffsetY.toFixed(2)}px`)
      element.style.setProperty('--reveal-scale', scale.toFixed(4))
      element.style.setProperty('--reveal-opacity', opacity.toFixed(3))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [x, y, revealX, revealY, revealScale, fade, mobileFactor, mobileBreakpoint])

  return ref
}
