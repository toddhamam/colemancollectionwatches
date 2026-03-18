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
    progress: 0.15,
    side: 'left' as const,
    title: 'Sapphire Crystal',
    description: 'Scratch-resistant sapphire glass protects the dial while offering perfect clarity.',
  },
  {
    progress: 0.35,
    side: 'right' as const,
    title: 'Open Heart Dial',
    description: 'The signature open-heart window reveals the beating balance wheel beneath.',
  },
  {
    progress: 0.55,
    side: 'left' as const,
    title: 'Miyota Movement',
    description: 'Japanese automatic movement with 21 jewels and 42-hour power reserve.',
  },
  {
    progress: 0.75,
    side: 'right' as const,
    title: 'Exhibition Caseback',
    description: 'Transparent caseback showcases the golden rotor and intricate mechanics within.',
  },
]

export function DeconstructionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedCountRef = useRef(0)
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)

  // Draw a frame scaled to cover the full canvas (like object-fit: cover)
  function drawFrameCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const cw = ctx.canvas.width
    const ch = ctx.canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const sx = (cw - sw) / 2
    const sy = (ch - sh) / 2

    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }

  // Size canvas to viewport
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      // Redraw current frame at new size
      const img = imagesRef.current[currentFrameRef.current]
      if (img?.complete) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawFrameCover(ctx, img)
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = []
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameSrc(i)
      img.onload = () => {
        loadedCountRef.current++
        // Draw first frame once loaded
        if (i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) drawFrameCover(ctx, img)
        }
      }
      images[i - 1] = img
    }
    imagesRef.current = images
  }, [])

  // Scroll-driven frame sync
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const canvas = canvasRef.current
      if (!section || !canvas) return

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
          const ctx = canvas.getContext('2d')
          if (ctx) drawFrameCover(ctx, img)
        }
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // initial
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: '400vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas for frame playback */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Gradient overlays for blending into the dark background */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: [
              'linear-gradient(to right, rgba(5,5,5,0.85) 0%, transparent 15%, transparent 85%, rgba(5,5,5,0.85) 100%)',
              'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 10%, transparent 90%, rgba(5,5,5,0.5) 100%)',
            ].join(', '),
          }}
        />

        {/* Section title */}
        <motion.div
          className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.02 && progress < 0.95 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light">
            Anatomy of Excellence
          </p>
        </motion.div>

        {/* Feature cards that appear at specific scroll points */}
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
                <p className="text-sm font-sans font-light text-cc-cream/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          )
        })}

        {/* Progress indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-1">
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
