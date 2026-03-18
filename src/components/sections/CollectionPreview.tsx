'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WATCHES } from '@/lib/watches'
import type { Watch } from '@/types'

function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US')}`
}

function WatchCard({ watch, index }: { watch: Watch; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link
        href="/build"
        className="group block relative overflow-hidden bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#C9A96E]/30 transition-all duration-500"
      >
        {/* Watch image */}
        <div className="aspect-square relative bg-[#0A0A0A] overflow-hidden">
          <Image
            src={watch.image}
            alt={watch.name}
            fill
            className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1A1A1A] to-transparent pointer-events-none" />
        </div>

        {/* Info area */}
        <div className="p-8">
          <h3 className="font-serif text-2xl text-[#FAFAF7]">{watch.name}</h3>
          <p className="text-sm text-[#C9A96E] mt-1 uppercase tracking-wider">
            {watch.tagline}
          </p>
          <p className="text-sm text-cc-cream/80 mt-4 font-light line-clamp-2">
            {watch.description}
          </p>
          <div className="flex items-center justify-between mt-6">
            <p className="text-lg text-[#F5F0E8] font-light">
              From {formatPrice(watch.price)}
            </p>
            <span className="text-sm text-[#C9A96E] uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              Build Yours
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function CollectionPreview() {
  return (
    <section className="py-32 md:py-40 px-6 bg-[#050505]">
      <SectionHeading subtitle="The Collection" title="Masterworks of Time" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
        {WATCHES.map((watch, index) => (
          <WatchCard key={watch.slug} watch={watch} index={index} />
        ))}
      </div>
    </section>
  )
}
