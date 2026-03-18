'use client'

import { motion } from 'framer-motion'
import { MODEL_OPTIONS } from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

export function ModelStep() {
  const { config, setSelection, nextStep } = useConfiguratorStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cc-cream">
          Choose Your Model
        </h2>
        <p className="mt-2 text-base text-cc-cream font-light leading-relaxed">
          Select the foundation of your timepiece. Each model defines the case
          material and finish.
        </p>
      </div>

      <div className="space-y-3">
        {MODEL_OPTIONS.map((model, i) => {
          const isSelected = config.model === model.id

          return (
            <motion.button
              key={model.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelection('model', model.id)
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
                      background: `linear-gradient(135deg, ${model.color} 0%, ${model.secondaryColor || model.color} 100%)`,
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg text-cc-cream">
                      {model.name}
                    </h3>
                    <span className="font-mono text-xs text-cc-gold whitespace-nowrap">
                      {model.priceDelta === 0
                        ? 'Included'
                        : `+$${model.priceDelta / 100}`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-cc-gold font-sans">
                    {model.tagline}
                  </p>
                  <p className="mt-2 text-sm text-cc-cream font-light leading-relaxed">
                    {model.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-mono text-xs text-cc-cream/80">
                      {model.caseSize}
                    </span>
                    <span className="font-mono text-xs text-cc-cream/80">
                      {model.caseMaterial}
                    </span>
                    <span className="font-mono text-xs text-cc-cream/80">
                      {model.crystal}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Continue */}
      {config.model && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={nextStep}
            className="w-full py-3 bg-cc-gold text-cc-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-cc-gold-light transition-colors duration-300"
          >
            Continue to Movement
          </button>
        </motion.div>
      )}
    </div>
  )
}
