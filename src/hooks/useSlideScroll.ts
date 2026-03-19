import { useRef, useEffect, useCallback, RefObject } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

interface UseSlideScrollOptions {
  slidePaths: string[]
  currentSlide: number
  isGalleryOpen: boolean
  navigate: (path: string, options?: { replace: boolean }) => void
}

interface UseSlideScrollResult {
  containerRef: RefObject<HTMLDivElement>
  scrollProgress: MotionValue<number>
}

const SCROLL_COOLDOWN = 1000

export function useSlideScroll({
  slidePaths,
  currentSlide,
  isGalleryOpen,
  navigate,
}: UseSlideScrollOptions): UseSlideScrollResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useMotionValue(0)
  const lastScrollTime = useRef(0)
  // Prevents handleScroll from counter-navigating during a programmatic smooth scroll
  const isProgrammaticScroll = useRef(false)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    scrollProgress.set(scrollWidth - clientWidth > 0 ? scrollLeft / (scrollWidth - clientWidth) : 0)

    if (isProgrammaticScroll.current) return

    if (clientWidth > 0) {
      const newSlideIndex = Math.round(scrollLeft / clientWidth)
      if (newSlideIndex !== currentSlide && slidePaths[newSlideIndex]) {
        navigate(slidePaths[newSlideIndex], { replace: true })
      }
    }
  }, [currentSlide, navigate, scrollProgress, slidePaths])

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return
    const { scrollLeft, clientWidth } = containerRef.current
    const targetLeft = clientWidth * index
    // If already at the target (e.g. CSS snap just got there), skip
    if (Math.abs(scrollLeft - targetLeft) < 10) return
    isProgrammaticScroll.current = true
    containerRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' })
    setTimeout(() => { isProgrammaticScroll.current = false }, 600)
  }, [])

  useEffect(() => {
    scrollToSlide(currentSlide)
  }, [currentSlide, scrollToSlide])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      if (isGalleryOpen) return

      const currentSlideEl = container.children[currentSlide] as HTMLElement
      if (currentSlideEl) {
        const scrollable = currentSlideEl.querySelector('.overflow-y-auto') as HTMLElement
        if (scrollable) {
          const atTop = scrollable.scrollTop <= 0
          const atBottom = scrollable.scrollHeight - scrollable.scrollTop <= scrollable.clientHeight + 1
          if (e.deltaY > 0 && !atBottom) return
          if (e.deltaY < 0 && !atTop) return
        }
      }

      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return

      const sensitivity = currentSlide === 0 ? 10 : 20
      if (Math.abs(e.deltaY) < sensitivity) return

      if (e.deltaY > 0 && currentSlide < slidePaths.length - 1) {
        navigate(slidePaths[currentSlide + 1])
        lastScrollTime.current = now
      } else if (e.deltaY < 0 && currentSlide > 0) {
        navigate(slidePaths[currentSlide - 1])
        lastScrollTime.current = now
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, currentSlide, navigate, isGalleryOpen, slidePaths])

  return { containerRef, scrollProgress }
}
