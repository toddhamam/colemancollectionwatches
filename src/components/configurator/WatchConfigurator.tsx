'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useConfiguratorStore } from '@/store/configurator'
import { getProductImage, formatPrice } from '@/lib/configurator'
import { StepProgress } from './StepProgress'
import { ModelStep } from './ModelStep'
import { MovementStep } from './MovementStep'
import { DialStep } from './DialStep'
import { StrapStep } from './StrapStep'
import { SummaryStep } from './SummaryStep'

function StepContent() {
  const step = useConfiguratorStore((s) => s.step)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {step === 'model' && <ModelStep />}
        {step === 'movement' && <MovementStep />}
        {step === 'dial' && <DialStep />}
        {step === 'strap' && <StrapStep />}
        {step === 'summary' && <SummaryStep />}
      </motion.div>
    </AnimatePresence>
  )
}

function WatchPreview() {
  const step = useConfiguratorStore((s) => s.step)
  const config = useConfiguratorStore((s) => s.config)
  const image = getProductImage(step, config)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={image.src}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
        />
      </motion.div>
    </AnimatePresence>
  )
}

export function WatchConfigurator() {
  const { totalPrice, step } = useConfiguratorStore()

  return (
    <div className="min-h-screen bg-cc-black-rich">
      {/* Top bar with step progress & running price */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cc-black-rich/95 backdrop-blur-md border-b border-cc-graphite/50">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <Link
            href="/"
            className="font-serif text-sm tracking-widest text-cc-cream hover:text-cc-gold transition-colors duration-300"
          >
            COLEMAN COLLECTION
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-12">
            <StepProgress />
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.2em] text-cc-cream/70 font-sans">
              {step === 'summary' ? 'Total' : 'Starting from'}
            </p>
            <p className="font-serif text-lg text-cc-gold leading-tight">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        <div className="md:hidden px-6 pb-3">
          <StepProgress />
        </div>
      </div>

      {/* Main content — fixed height viewport layout */}
      <div className="flex flex-col lg:flex-row pt-[72px]" style={{ height: 'calc(100vh)' }}>
        {/* Left: Product Image Preview — takes full remaining height */}
        <div className="relative flex-1 min-h-[60vh] lg:min-h-0">
          {/* Radial gradient backdrop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(201,169,110,0.07) 0%, rgba(40,35,28,0.12) 40%, transparent 70%)',
            }}
          />

          {/* Product image fills the entire preview area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
            <WatchPreview />
          </div>
        </div>

        {/* Right: Options Panel — scrollable sidebar */}
        <OptionsPanel />
      </div>
    </div>
  )
}

function OptionsPanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const step = useConfiguratorStore((s) => s.step)

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  return (
    <div
      ref={panelRef}
      className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 border-l border-cc-graphite/30 overflow-y-auto"
    >
      <div className="p-6 md:p-8 lg:p-10">
        <StepContent />
      </div>
    </div>
  )
}
