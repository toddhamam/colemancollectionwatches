'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function PhilosophySection() {
  return (
    <section className="py-32 md:py-40 px-6 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading subtitle="Our Philosophy" title="A Deeper Purpose" />

        <RevealOnScroll delay={0.2} className="mt-12">
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#F5F0E8] leading-relaxed">
            &ldquo;We believe a timepiece is more than an instrument of
            measurement. It is a declaration of intent&nbsp;&mdash; a companion
            for those who understand that every second carries the weight of
            possibility.&rdquo;
          </blockquote>
        </RevealOnScroll>

        <GoldDivider className="my-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <RevealOnScroll delay={0.1}>
            <p className="text-cc-cream/80 font-sans font-light text-base md:text-lg leading-relaxed">
              Born from a conviction that mechanical watchmaking represents
              humanity&apos;s most elegant marriage of art and engineering,
              Coleman Collection creates timepieces for the defining moments of
              ambitious lives.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.25}>
            <p className="text-cc-cream/80 font-sans font-light text-base md:text-lg leading-relaxed">
              Each watch is an invitation to join a lineage of individuals who
              measure their days not in hours, but in achievements. For those who
              refuse to settle.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
