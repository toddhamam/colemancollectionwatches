'use client'

import { motion } from 'framer-motion'
import { MOVEMENT_OPTIONS } from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

export function MovementStep() {
  const { config, setSelection, nextStep, prevStep } = useConfiguratorStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cc-cream">
          Select Your Movement
        </h2>
        <p className="mt-2 text-base text-cc-cream font-light leading-relaxed">
          The heart of your timepiece. Choose between Japanese precision and
          Swiss heritage.
        </p>
      </div>

      <div className="space-y-3">
        {MOVEMENT_OPTIONS.map((movement, i) => {
          const isSelected = config.movement === movement.id
          const isSwiss = movement.origin === 'Switzerland'

          return (
            <motion.button
              key={movement.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelection('movement', movement.id)
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
                {/* Origin badge */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                      ${isSelected ? 'border-cc-gold' : 'border-cc-steel group-hover:border-cc-gold/40'}
                    `}
                    style={{ backgroundColor: `${movement.color}15` }}
                  >
                    <span className="font-mono text-[9px] font-medium text-cc-cream">
                      {isSwiss ? 'CH' : 'JP'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg text-cc-cream">
                      {movement.name}
                    </h3>
                    <span className="font-mono text-xs text-cc-gold whitespace-nowrap">
                      {movement.priceDelta === 0
                        ? 'Included'
                        : `+$${movement.priceDelta / 100}`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-cc-gold font-sans">
                    {movement.origin} &middot; {movement.type}
                  </p>
                  <p className="mt-2 text-sm text-cc-cream font-light leading-relaxed">
                    {movement.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-mono text-xs text-cc-cream/80">
                      {movement.powerReserve}
                    </span>
                    <span className="font-mono text-xs text-cc-cream/80">
                      {movement.frequency}
                    </span>
                  </div>
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
        {config.movement && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={nextStep}
            className="flex-[2] py-3 bg-cc-gold text-cc-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-cc-gold-light transition-colors duration-300"
          >
            Continue to Dial
          </motion.button>
        )}
      </div>
    </div>
  )
}
