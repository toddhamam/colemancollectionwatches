'use client';

import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function CTASection() {
  return (
    <section className="py-32 md:py-40 px-6 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(201,169,110,0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <RevealOnScroll>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-[#FAFAF7]">
            Own The Moment
          </h2>
          <p className="text-[#8A8A8A] font-sans font-light mt-6 text-base md:text-lg leading-relaxed">
            Join the Coleman Collection. Be the first to know when our next
            defining timepiece arrives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button variant="filled" size="lg" href="/collection">
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="https://www.instagram.com/colemancollectionwatches/"
            >
              Follow Our Journey
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
