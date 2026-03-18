'use client'

import { motion } from 'framer-motion'
import { DIAL_OPTIONS } from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

export function DialStep() {
  const { config, setSelection, nextStep, prevStep } = useConfiguratorStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cc-cream">
          Choose Your Dial
        </h2>
        <p className="mt-2 text-base text-cc-cream font-light leading-relaxed">
          The face of your timepiece. Each dial colour transforms the
          character of your watch.
        </p>
      </div>

      {/* Color swatches grid */}
      <div className="grid grid-cols-5 gap-3">
        {DIAL_OPTIONS.map((dial, i) => {
          const isSelected = config.dial === dial.id

          return (
            <motion.button
              key={dial.id}
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelection('dial', dial.id)
              }}
              className="flex flex-col items-center gap-2 group"
              aria-label={dial.name}
            >
              <div
                className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300
                  ${
                    isSelected
                      ? 'ring-2 ring-cc-gold ring-offset-2 ring-offset-cc-black scale-110'
                      : 'ring-1 ring-cc-steel group-hover:ring-cc-gold/40'
                  }
                `}
                style={{ backgroundColor: dial.color }}
              />
              <span
                className={`
                  text-xs font-sans tracking-wide text-center leading-tight transition-colors duration-300
                  ${isSelected ? 'text-cc-gold' : 'text-cc-cream/80 group-hover:text-cc-cream'}
                `}
              >
                {dial.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Selected dial details */}
      {config.dial && (
        <motion.div
          key={config.dial}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 border border-cc-graphite"
        >
          {(() => {
            const selected = DIAL_OPTIONS.find((d) => d.id === config.dial)
            if (!selected) return null
            return (
              <>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg text-cc-cream">
                    {selected.name}
                  </h3>
                  <span className="font-mono text-xs text-cc-gold">
                    {selected.priceDelta === 0
                      ? 'Included'
                      : `+$${selected.priceDelta / 100}`}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-cc-gold">
                  {selected.style} finish
                </p>
                <p className="mt-2 text-sm text-cc-cream font-light leading-relaxed">
                  {selected.description}
                </p>
              </>
            )
          })()}
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 py-3 border border-cc-graphite text-cc-cream/80 font-sans text-xs uppercase tracking-[0.2em] hover:border-cc-gold/40 hover:text-cc-cream transition-all duration-300"
        >
          Back
        </button>
        {config.dial && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={nextStep}
            className="flex-[2] py-3 bg-cc-gold text-cc-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-cc-gold-light transition-colors duration-300"
          >
            Continue to Strap
          </motion.button>
        )}
      </div>
    </div>
  )
}
