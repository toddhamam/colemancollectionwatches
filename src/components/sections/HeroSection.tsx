'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 121
const FRAME_PATH = '/frames/deconstruction/frame_'

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(4, '0')
  return `${FRAME_PATH}${num}.jpg`
}

const FEATURE_CARDS = [
  {
    progress: 0.2,
    side: 'left' as const,
    title: 'Sapphire Crystal',
    description: 'Scratch-resistant sapphire glass protects the dial while offering perfect clarity.',
  },
  {
    progress: 0.4,
    side: 'right' as const,
    title: 'Open Heart Dial',
    description: 'The signature open-heart window reveals the beating balance wheel beneath.',
  },
  {
    progress: 0.6,
    side: 'left' as const,
    title: 'Miyota Movement',
    description: 'Japanese automatic movement with 21 jewels and 42-hour power reserve.',
  },
  {
    progress: 0.8,
    side: 'right' as const,
    title: 'Exhibition Caseback',
    description: 'Transparent caseback showcases the golden rotor and intricate mechanics within.',
  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [progress, setProgress] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)

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

  // Scroll-driven frame sync
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const imgEl = imgRef.current
      if (!section || !imgEl) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const rawProgress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      setProgress(rawProgress)

      const frameIndex = Math.floor(rawProgress * (TOTAL_FRAMES - 1))
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        const img = imagesRef.current[frameIndex]
        if (img?.complete) {
          imgEl.src = img.src
        }
      }
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
  }, [])

  // Hero text fades out as scroll begins
  const heroOpacity = Math.max(0, 1 - progress * 5)

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
            background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.8) 40%, transparent 100%)',
          }}
        />

        {/* Hero text — fades out on scroll */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          style={{ opacity: heroOpacity, transition: 'opacity 0.1s ease-out' }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[64px] md:text-[100px] lg:text-[140px] font-serif font-bold text-[#FAFAF7] tracking-[-0.02em] leading-[0.85]">
                COLEMAN
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[64px] md:text-[100px] lg:text-[140px] font-serif font-bold text-[#FAFAF7] tracking-[-0.02em] leading-[0.85]">
                COLLECTION
              </h1>
            </motion.div>

            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Scroll indicator — only visible before scrolling */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A] font-sans">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent animate-scroll-line" />
        </motion.div>

        {/* "Anatomy of Excellence" label — appears once scrolling */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-500"
          style={{ opacity: progress > 0.08 && progress < 0.95 ? 1 : 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light">
            Anatomy of Excellence
          </p>
        </div>

        {/* Feature cards at scroll milestones */}
        {FEATURE_CARDS.map((card, i) => {
          const isVisible =
            progress >= card.progress - 0.05 && progress <= card.progress + 0.12
          const posClass =
            card.side === 'left'
              ? 'left-8 md:left-16 lg:left-24'
              : 'right-8 md:right-16 lg:right-24'

          return (
            <div
              key={i}
              className={`absolute ${posClass} top-1/2 -translate-y-1/2 z-10 max-w-[280px] transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : card.side === 'left'
                    ? 'opacity-0 -translate-x-8'
                    : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-sm p-6">
                <h3 className="text-lg font-serif font-bold text-[#FAFAF7] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm font-sans font-light text-[#8A8A8A] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          )
        })}

        {/* Progress bar */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-1 transition-opacity duration-500"
          style={{ opacity: progress > 0.05 ? 1 : 0 }}
        >
          <div className="w-px h-32 bg-[#2A2A2A] relative">
            <div
              className="absolute top-0 left-0 w-full bg-[#C9A96E] transition-all duration-100"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
