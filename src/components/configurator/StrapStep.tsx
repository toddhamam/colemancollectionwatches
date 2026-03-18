'use client'

import { motion } from 'framer-motion'
import { STRAP_OPTIONS } from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

export function StrapStep() {
  const { config, setSelection, nextStep, prevStep } = useConfiguratorStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cc-cream">
          Select Your Strap
        </h2>
        <p className="mt-2 text-base text-cc-cream font-light leading-relaxed">
          The final touch. From Italian leather to brushed steel, your strap
          defines how your timepiece meets the world.
        </p>
      </div>

      <div className="space-y-3">
        {STRAP_OPTIONS.map((strap, i) => {
          const isSelected = config.strap === strap.id

          return (
            <motion.button
              key={strap.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelection('strap', strap.id)
              }}
              className={`
                w-full text-left p-5 border transition-all duration-300 group
                ${
                  isSelected
                    ? 'border-cc-gold bg-cc-gold/5'
                    : 'border-cc-graphite hover:border-cc-gold/40 bg-transparent'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Color swatch */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full border-2 transition-colors duration-300
                      ${isSelected ? 'border-cc-gold' : 'border-cc-steel group-hover:border-cc-gold/40'}
                    `}
                    style={{
                      background: strap.secondaryColor
                        ? `linear-gradient(135deg, ${strap.color} 0%, ${strap.secondaryColor} 100%)`
                        : strap.color,
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg text-cc-cream">
                      {strap.name}
                    </h3>
                    <span className="font-mono text-xs text-cc-gold whitespace-nowrap">
                      {strap.priceDelta === 0
                        ? 'Included'
                        : `+$${strap.priceDelta / 100}`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-cc-gold font-sans">
                    {strap.material} &middot; {strap.width}
                  </p>
                  <p className="mt-2 text-sm text-cc-cream font-light leading-relaxed">
                    {strap.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 py-3 border border-cc-graphite text-cc-cream/80 font-sans text-xs uppercase tracking-[0.2em] hover:border-cc-gold/40 hover:text-cc-cream transition-all duration-300"
        >
          Back
        </button>
        {config.strap && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={nextStep}
            className="flex-[2] py-3 bg-cc-gold text-cc-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-cc-gold-light transition-colors duration-300"
          >
            Review Your Build
          </motion.button>
        )}
      </div>
    </div>
  )
}
