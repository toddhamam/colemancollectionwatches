'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { testimonials, type Testimonial } from '@/lib/testimonials'

// Extract unique product variants for filter tabs
const PRODUCT_VARIANTS = [
  'All',
  ...Array.from(new Set(testimonials.map((t) => t.product))).sort(),
]

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < rating ? 'text-cc-gold' : 'text-cc-steel'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-cc-charcoal border border-cc-graphite rounded-sm p-6 md:p-8 hover:border-cc-gold/30 transition-all duration-500"
    >
      {/* Header: photo, name, location */}
      <div className="flex items-start gap-4 mb-5">
        {testimonial.image ? (
          <div className="w-12 h-12 rounded-full overflow-hidden border border-cc-graphite flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-cc-graphite border border-cc-steel/30 flex items-center justify-center flex-shrink-0">
            <span className="text-cc-gold font-serif text-lg font-semibold">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm text-cc-white font-sans font-medium tracking-wide">
              {testimonial.name}
            </p>
            {testimonial.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-cc-gold font-sans">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-cc-silver font-sans mt-0.5">{testimonial.location}</p>
        </div>
      </div>

      {/* Star rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Review text */}
      <blockquote className="text-sm md:text-[15px] text-cc-cream leading-relaxed font-sans">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Product variant tag */}
      <div className="mt-5 pt-4 border-t border-cc-graphite">
        <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-cc-silver font-sans px-2.5 py-1 border border-cc-graphite rounded-sm">
          {testimonial.product}
        </span>
      </div>
    </motion.div>
  )
}

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'All') return testimonials
    return testimonials.filter((t) => t.product === activeFilter)
  }, [activeFilter])

  const averageRating = useMemo(() => {
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0)
    return (sum / testimonials.length).toFixed(1)
  }, [])

  return (
    <main className="min-h-screen bg-cc-black-rich">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[800px] h-[600px] rounded-full opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-cc-gold/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-cc-gold font-sans font-light mb-5"
          >
            Testimonials
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cc-white mb-6"
          >
            What Our Customers Say
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-cc-cream/80 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Every timepiece tells a story. Here are the moments our customers
            have shared about their Coleman Collection experience.
          </motion.p>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <StarRating rating={5} size="lg" />
              <span className="text-2xl font-serif font-bold text-cc-white">{averageRating}</span>
            </div>
            <p className="text-xs text-cc-silver font-sans tracking-wide">
              Based on {testimonials.length} verified reviews
            </p>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cc-gold/40 to-transparent" />
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {PRODUCT_VARIANTS.map((variant) => {
              const isActive = activeFilter === variant
              const count =
                variant === 'All'
                  ? testimonials.length
                  : testimonials.filter((t) => t.product === variant).length
              return (
                <button
                  key={variant}
                  onClick={() => setActiveFilter(variant)}
                  className={`font-sans text-[11px] uppercase tracking-[0.12em] px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-cc-gold/10 border-cc-gold/60 text-cc-gold'
                      : 'border-cc-graphite text-cc-silver hover:border-cc-gold/30 hover:text-cc-cream'
                  }`}
                >
                  {variant}
                  <span
                    className={`ml-1.5 text-[10px] ${
                      isActive ? 'text-cc-gold/70' : 'text-cc-steel'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6 space-y-5 md:space-y-6">
            {filteredTestimonials.map((testimonial, index) => (
              <div key={`${activeFilter}-${testimonial.name}`} className="break-inside-avoid">
                <ReviewCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredTestimonials.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cc-silver font-sans text-sm">
                No reviews found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-px bg-cc-gold/40 mx-auto mb-8" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-cc-white mb-4">
            Experience It Yourself
          </h2>
          <p className="text-sm text-cc-cream/70 font-sans font-light mb-8 max-w-lg mx-auto leading-relaxed">
            Join the growing community of Coleman Collection owners who wear
            their timepiece with pride.
          </p>
          <Link
            href="/collection"
            className="inline-block font-sans text-xs uppercase tracking-[0.2em] px-8 py-3 border border-cc-gold/60 text-cc-gold hover:bg-cc-gold hover:text-cc-black transition-all duration-300"
          >
            View Collection
          </Link>
        </div>
      </section>
    </main>
  )
}
