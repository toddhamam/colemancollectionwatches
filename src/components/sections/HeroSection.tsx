'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 121
const FRAME_PATH = '/frames/deconstruction/frame_'

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(
    4,
    '0'
  )
  return `${FRAME_PATH}${num}.jpg`
}

const FEATURE_CARDS = [
  {
    progress: 0.2,
    side: 'left' as const,
    title: 'Sapphire Crystal',
    description:
      'Scratch-resistant sapphire glass protects the dial while offering perfect clarity.',
    target: { x: 0.5, y: 0.28 },
  },
  {
    progress: 0.4,
    side: 'right' as const,
    title: 'Open Heart Dial',
    description:
      'The signature open-heart window reveals the beating balance wheel beneath.',
    target: { x: 0.48, y: 0.4 },
  },
  {
    progress: 0.6,
    side: 'left' as const,
    title: 'Miyota Movement',
    description:
      'Japanese automatic movement with 21 jewels and 42-hour power reserve.',
    target: { x: 0.5, y: 0.52 },
  },
  {
    progress: 0.8,
    side: 'right' as const,
    title: 'Exhibition Caseback',
    description:
      'Transparent caseback showcases the golden rotor and intricate mechanics within.',
    target: { x: 0.5, y: 0.5 },
  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const progressRef = useRef(0)
  const scrollIndicatorReady = useRef(false)

  // DOM refs for imperative scroll-driven updates (no re-renders)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const anatomyRef = useRef<HTMLDivElement>(null)
  const progressBarContainerRef = useRef<HTMLDivElement>(null)
  const progressBarFillRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const linePathRefs = useRef<(SVGPathElement | null)[]>([])
  const lineOuterRefs = useRef<(SVGCircleElement | null)[]>([])
  const lineInnerRefs = useRef<(SVGCircleElement | null)[]>([])

  // Viewport size — only state that triggers re-renders (on resize, which is rare)
  const [vw, setVw] = useState(1920)
  const [vh, setVh] = useState(1080)

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = []
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameSrc(i)
      images[i - 1] = img
    }
    imagesRef.current = images
  }, [])

  // Compute annotation line SVG paths (only recalculates on resize)
  const linePaths = useMemo(() => {
    const offset = vw >= 1024 ? 96 : 64
    const cardWidth = 280

    return FEATURE_CARDS.map((card) => {
      const startX =
        card.side === 'left' ? offset + cardWidth : vw - offset - cardWidth
      const startY = vh * 0.5
      const endX = vw * card.target.x
      const endY = vh * card.target.y

      const dx = endX - startX
      const cp1X = startX + dx * 0.4
      const cp1Y = startY
      const cp2X = endX - dx * 0.15
      const cp2Y = endY

      const pathD = `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`
      return { pathD, endX, endY }
    })
  }, [vw, vh])

  // Apply all scroll-driven styles directly to the DOM — zero React re-renders
  const applyProgress = useCallback((p: number) => {
    const heroOpacity = Math.max(0, 1 - p * 5)

    if (heroTextRef.current)
      heroTextRef.current.style.opacity = String(heroOpacity)
    if (scrollIndicatorRef.current && scrollIndicatorReady.current)
      scrollIndicatorRef.current.style.opacity = String(heroOpacity)
    if (anatomyRef.current)
      anatomyRef.current.style.opacity =
        p > 0.08 && p < 0.95 ? '1' : '0'
    if (progressBarContainerRef.current)
      progressBarContainerRef.current.style.opacity = p > 0.05 ? '1' : '0'
    if (progressBarFillRef.current)
      progressBarFillRef.current.style.height = `${p * 100}%`

    FEATURE_CARDS.forEach((card, i) => {
      const isVisible =
        p >= card.progress - 0.05 && p <= card.progress + 0.12

      const cardEl = cardRefs.current[i]
      if (cardEl) {
        cardEl.style.opacity = isVisible ? '1' : '0'
        cardEl.style.transform = isVisible
          ? 'translateX(0)'
          : `translateX(${card.side === 'left' ? '-2rem' : '2rem'})`
      }

      const pathEl = linePathRefs.current[i]
      if (pathEl) pathEl.style.strokeDashoffset = isVisible ? '0' : '2000'

      const outerEl = lineOuterRefs.current[i]
      if (outerEl) outerEl.style.opacity = isVisible ? '0.4' : '0'

      const innerEl = lineInnerRefs.current[i]
      if (innerEl) innerEl.style.opacity = isVisible ? '0.8' : '0'
    })
  }, [])

  // Scroll-driven frame sync + imperative DOM updates
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const imgEl = imgRef.current
      if (!section || !imgEl) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const rawProgress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      progressRef.current = rawProgress

      // Swap frame image
      const frameIndex = Math.floor(rawProgress * (TOTAL_FRAMES - 1))
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        const img = imagesRef.current[frameIndex]
        if (img?.complete) {
          imgEl.src = img.src
        }
      }

      // Update all visual elements imperatively
      applyProgress(rawProgress)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [applyProgress])

  // Re-apply scroll state after resize triggers a React re-render
  useEffect(() => {
    requestAnimationFrame(() => applyProgress(progressRef.current))
  }, [vw, vh, applyProgress])

  // Show scroll indicator after 2s entrance delay
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollIndicatorReady.current = true
      if (scrollIndicatorRef.current && progressRef.current < 0.05) {
        scrollIndicatorRef.current.style.opacity = '1'
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Frame image — full viewport, edge to edge */}
        <img
          ref={imgRef}
          src={getFrameSrc(1)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.5) 60%, rgba(5,5,5,0.9) 100%)',
              'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.4) 100%)',
            ].join(', '),
          }}
        />

        {/* Bottom fade — masks watermark across full width */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
          style={{
            height: '60px',
            background:
              'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.8) 40%, transparent 100%)',
          }}
        />

        {/* Hero text — fades out on scroll */}
        <div
          ref={heroTextRef}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          style={{ transition: 'opacity 0.1s ease-out' }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="text-[64px] md:text-[100px] lg:text-[140px] font-serif font-bold text-[#FAFAF7] tracking-[-0.02em] leading-[0.85]">
                COLEMAN
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="text-[64px] md:text-[100px] lg:text-[140px] font-serif font-bold text-[#FAFAF7] tracking-[-0.02em] leading-[0.85]">
                COLLECTION
              </h1>
            </motion.div>

            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              For The Moments That Define Us
            </motion.p>

            <motion.p
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#8A8A8A] font-sans font-light mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Character defining timepieces
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator — entrance via setTimeout, scroll-fade via ref */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          style={{ opacity: 0, transition: 'opacity 1s ease-out' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A] font-sans">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent animate-scroll-line" />
        </div>

        {/* "Anatomy of Excellence" label — appears once scrolling */}
        <div
          ref={anatomyRef}
          className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-500"
          style={{ opacity: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light">
            Anatomy of Excellence
          </p>
        </div>

        {/* Annotation lines — desktop only */}
        <svg className="absolute inset-0 w-full h-full z-[9] pointer-events-none hidden lg:block">
          {FEATURE_CARDS.map((_card, i) => {
            const { pathD, endX, endY } = linePaths[i]
            return (
              <g key={i}>
                <path
                  ref={(el) => {
                    linePathRefs.current[i] = el
                  }}
                  d={pathD}
                  stroke="#C9A96E"
                  strokeWidth="1"
                  fill="none"
                  style={{
                    opacity: 0.6,
                    strokeDasharray: 2000,
                    strokeDashoffset: 2000,
                    transition:
                      'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <circle
                  ref={(el) => {
                    lineOuterRefs.current[i] = el
                  }}
                  cx={endX}
                  cy={endY}
                  r="6"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  style={{ opacity: 0, transition: 'opacity 0.6s ease-out 1s' }}
                />
                <circle
                  ref={(el) => {
                    lineInnerRefs.current[i] = el
                  }}
                  cx={endX}
                  cy={endY}
                  r="2.5"
                  fill="#C9A96E"
                  style={{
                    opacity: 0,
                    transition: 'opacity 0.5s ease-out 1.2s',
                  }}
                />
              </g>
            )
          })}
        </svg>

        {/* Feature cards at scroll milestones */}
        {FEATURE_CARDS.map((card, i) => {
          const posClass =
            card.side === 'left'
              ? 'left-8 md:left-16 lg:left-24'
              : 'right-8 md:right-16 lg:right-24'

          return (
            <div
              key={i}
              className={`absolute ${posClass} top-1/2 -translate-y-1/2 z-10 max-w-[280px]`}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: 0,
                  transform: `translateX(${card.side === 'left' ? '-2rem' : '2rem'})`,
                }}
              >
                <div
                  className="bg-[#0A0A0A]/85 backdrop-blur-md border border-[#2A2A2A] rounded-sm p-7"
                  style={{
                    [card.side === 'left'
                      ? 'borderRightWidth'
                      : 'borderLeftWidth']: '2px',
                    [card.side === 'left'
                      ? 'borderRightColor'
                      : 'borderLeftColor']: 'rgba(201, 169, 110, 0.6)',
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] font-mono mb-3"
                    style={{ opacity: 0.7 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl font-serif font-bold text-[#FAFAF7] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm font-sans font-light text-[#A0A0A0] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Progress bar */}
        <div
          ref={progressBarContainerRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-1 transition-opacity duration-500"
          style={{ opacity: 0 }}
        >
          <div className="w-px h-32 bg-[#2A2A2A] relative">
            <div
              ref={progressBarFillRef}
              className="absolute top-0 left-0 w-full bg-[#C9A96E]"
              style={{ height: '0%' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
