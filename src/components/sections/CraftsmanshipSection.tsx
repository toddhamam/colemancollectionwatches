'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const STATS = [
  { value: '200+', label: 'Components' },
  { value: '40hr', label: 'Power Reserve' },
  { value: '5 ATM', label: 'Water Resistance' },
]

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="py-32 md:py-40 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — caseback image showing movement */}
        <RevealOnScroll direction="left">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-[#1A1A1A]">
            <Image
              src="/images/watches/caseback-movement.jpg"
              alt="Coleman Collection automatic movement exhibition caseback"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle dark overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
          </div>
        </RevealOnScroll>

        {/* Right — content */}
        <RevealOnScroll direction="right" delay={0.15}>
          <SectionHeading
            subtitle="Craftsmanship"
            title="Engineering Excellence"
            align="left"
          />

          <p className="text-cc-cream/80 font-sans font-light text-base md:text-lg leading-relaxed mt-6">
            Every Coleman Collection timepiece houses a Miyota automatic
            movement — visible through a sapphire exhibition caseback and the
            signature open-heart dial. Over 200 meticulously assembled
            components work in concert, protected by sapphire crystal and
            stainless steel.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-serif text-[#C9A96E]">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-cc-cream/80 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Second row — lifestyle image + detail */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
        <RevealOnScroll direction="left" delay={0.1}>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-sans font-medium mb-4">
              Open Heart
            </p>
            <h3 className="text-3xl md:text-4xl font-serif text-[#FAFAF7] leading-tight">
              The Soul Made Visible
            </h3>
            <p className="text-cc-cream/80 font-sans font-light text-base md:text-lg leading-relaxed mt-6">
              The open-heart aperture at six o&apos;clock reveals the balance
              wheel in motion — the beating heart of the timepiece. It is a
              window into the mechanical soul that most watches keep hidden.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.2}>
          <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-[#1A1A1A]">
            <Image
              src="/images/watches/white-dial-glove.jpg"
              alt="Coleman Collection white dial held with inspection gloves"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
