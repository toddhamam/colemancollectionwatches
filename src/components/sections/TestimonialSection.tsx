'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  descriptor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Sovereign isn't just a watch — it's a statement of who I'm becoming. Every glance at my wrist reminds me why I chose to never settle.",
    author: 'James K.',
    descriptor: 'Entrepreneur',
  },
  {
    quote:
      'In a world of disposable everything, Coleman Collection creates objects that demand to be cherished. My Meridian is my daily companion in building something that matters.',
    author: 'Sarah L.',
    descriptor: 'Architect',
  },
  {
    quote:
      'The attention to detail is extraordinary. You can feel the precision in every movement of the second hand. This is what mechanical watchmaking should be.',
    author: 'Michael R.',
    descriptor: 'Collector',
  },
];

export function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 6000);
    return () => clearInterval(id);
  }, [advance]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-32 md:py-40 px-6 bg-[#050505]">
      <div className="max-w-3xl mx-auto text-center relative min-h-[280px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="font-serif italic text-xl md:text-2xl text-[#F5F0E8] leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-sm text-[#C9A96E] uppercase tracking-wider mt-6">
              {testimonial.author}
            </p>
            <p className="text-xs text-[#8A8A8A] mt-1">
              {testimonial.descriptor}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'bg-[#C9A96E] w-4'
                  : 'bg-[#4A4A4A] hover:bg-[#8A8A8A]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
