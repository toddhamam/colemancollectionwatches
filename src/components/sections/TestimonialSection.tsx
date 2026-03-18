'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'
import Image from 'next/image'

// Pick the most compelling testimonials for the featured carousel
const FEATURED_INDICES = [0, 1, 2, 3, 4, 7, 8, 12, 13, 17, 18, 19]
const FEATURED = FEATURED_INDICES.map((i) => testimonials[i])

export function TestimonialSection() {
  const [current, setCurrent] = useState(0)

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % FEATURED.length)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, 7000)
    return () => clearInterval(id)
  }, [advance])

  const t = FEATURED[current]

  return (
    <section className="py-32 md:py-40 px-6 bg-[#050505] relative overflow-hidden">
      {/* Subtle gold radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Section heading */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-sans font-light mb-4">
          What Our Customers Say
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FAFAF7]">
          Worn With Pride
        </h2>
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-[#C9A96E]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-cc-cream/70 ml-2 font-sans">
            {testimonials.length}+ verified reviews
          </span>
        </div>
      </div>

      {/* Featured testimonial carousel */}
      <div className="max-w-3xl mx-auto text-center relative z-10 min-h-[320px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Customer photo */}
            {t.image && (
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#2A2A2A] mb-6">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <blockquote className="font-serif italic text-xl md:text-2xl text-[#F5F0E8] leading-relaxed">
              &ldquo;{t.review}&rdquo;
            </blockquote>

            <div className="mt-6">
              <p className="text-sm text-[#C9A96E] uppercase tracking-wider font-sans">
                {t.name}
              </p>
              <p className="text-xs text-cc-cream/70 mt-1 font-sans">
                {t.location} — {t.product}
                {t.verified && (
                  <span className="ml-2 text-[#C9A96E]">✓ Verified</span>
                )}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex items-center gap-2 mt-10">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'bg-[#C9A96E] w-4'
                  : 'bg-cc-cream/30 hover:bg-cc-cream/50 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Prev/Next arrows */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + FEATURED.length) % FEATURED.length)
            }
            className="text-cc-cream/50 hover:text-[#C9A96E] transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-cc-cream/60 font-mono">
            {String(current + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
          </span>
          <button
            onClick={advance}
            className="text-cc-cream/50 hover:text-[#C9A96E] transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
