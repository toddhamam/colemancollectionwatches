'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function LifestyleSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      {/* Full-bleed lifestyle image */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/watches/lifestyle-model.jpg"
            alt="Man wearing Coleman Collection watch"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </motion.div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-end z-10">
          <div className="max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24">
            <motion.p
              className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-sans font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              For Those Who Refuse To Settle
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#FAFAF7] leading-tight max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Worn By The Ambitious
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  )
}
