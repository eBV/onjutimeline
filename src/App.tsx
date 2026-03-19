import { Suspense, lazy, useEffect, useCallback } from 'react'
import { motion, useTransform } from 'framer-motion'
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom'
import { ThirdwebProvider } from 'thirdweb/react'
import './index.css'

import { StoreProvider, useStore } from './hooks/useStore'
import { useSlideScroll } from './hooks/useSlideScroll'
import NavigationDots from './components/NavigationDots'

const Slide0Hero = lazy(() => import('./features/hero/Slide0Hero'))
const Slide1Genesis = lazy(() => import('./features/genesis/Slide1Genesis'))
const Slide2Mint = lazy(() => import('./features/mint/Slide2Mint'))
const Slide3HBCU = lazy(() => import('./features/community/Slide3HBCU'))
const Slide4Collections = lazy(() => import('./features/gallery/Slide4Collections'))
const Slide5Livestreams = lazy(() => import('./features/community/Slide5Livestreams'))
const Slide6Socials = lazy(() => import('./features/community/Slide6Socials'))

const SLIDE_PATHS = ['/', '/genesis', '/mint', '/community', '/art', '/live', '/socials']

// Background colour per slide — applied to the outer shell so the nav footer
// and progress-bar header area always match the visible slide's colour.
const SLIDE_BG = [
  'bg-ohnahji-burgundy', // 0: hero
  'bg-ohnahji-pink',     // 1: genesis
  'bg-ohnahji-burgundy', // 2: mint
  'bg-ohnahji-pink',     // 3: hbcu
  'bg-ohnahji-burgundy', // 4: collections
  'bg-ohnahji-pink',     // 5: live
  'bg-ohnahji-gold',     // 6: socials
]

// Shared inner-wrapper class for non-hero slides:
// px-10 md:px-16 gives doubled gutters vs. the old px-5 on mobile and generous
// breathing room on wide desktop screens.
// No justify — each slide's own outer div uses min-h-full + justify-center so
// content centers when it fits and scrolls from the top when it overflows.
const SLIDE_INNER = 'h-full overflow-y-auto flex flex-col px-10 md:px-16'

const AppContent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentSlide, setCurrentSlide, isGalleryOpen, setIsGalleryOpen, totalSupply } = useStore()

  const { containerRef, scrollProgress } = useSlideScroll({ slidePaths: SLIDE_PATHS, currentSlide, isGalleryOpen, navigate })
  const progressWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%'])

  // Sync URL path → slide index
  useEffect(() => {
    const idx = SLIDE_PATHS.indexOf(location.pathname)
    if (idx !== -1 && idx !== currentSlide) setCurrentSlide(idx)
  }, [location.pathname, currentSlide, setCurrentSlide])

  const onSlideChange = useCallback((index: number) => navigate(SLIDE_PATHS[index]), [navigate])

  return (
    // h-dvh: dynamic viewport height — correctly sized on iOS even when the
    // browser chrome (URL bar / tab bar) is shown or hidden.
    <div className={`relative h-dvh w-screen overflow-hidden transition-colors duration-500 ${SLIDE_BG[currentSlide]}`}>
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <motion.div className="h-full bg-ohnahji-gold" style={{ width: progressWidth }} />
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
      >
        <Suspense fallback={<div className="min-w-full h-full bg-ohnahji-burgundy flex items-center justify-center text-white font-black">LOADING...</div>}>
          {/* Hero: always centered (its content is designed around center layout) */}
          <div className="min-w-full h-full snap-start bg-ohnahji-burgundy">
            <div className="h-full overflow-hidden flex flex-col items-center justify-center px-10 md:px-16 py-8">
              <Slide0Hero />
            </div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-pink">
            <div className={SLIDE_INNER}><Slide1Genesis totalSupply={totalSupply} onGalleryOpen={setIsGalleryOpen} /></div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-burgundy">
            <div className={SLIDE_INNER}><Slide2Mint /></div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-pink">
            <div className={SLIDE_INNER}><Slide3HBCU /></div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-burgundy">
            <div className={SLIDE_INNER}><Slide4Collections /></div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-pink">
            <div className={SLIDE_INNER}><Slide5Livestreams /></div>
          </div>

          <div className="min-w-full h-full snap-start bg-ohnahji-gold">
            <div className={SLIDE_INNER}><Slide6Socials /></div>
          </div>
        </Suspense>
      </div>

      {/* NavigationDots is fixed overlay — floats above full-bleed slide content */}
      <NavigationDots totalSlides={SLIDE_PATHS.length} currentSlide={currentSlide} onSlideChange={onSlideChange} />
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <ThirdwebProvider>
        <Router>
          <AppContent />
        </Router>
      </ThirdwebProvider>
    </StoreProvider>
  )
}

export default App
