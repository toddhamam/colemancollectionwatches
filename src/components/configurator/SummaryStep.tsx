'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MODEL_OPTIONS,
  MOVEMENT_OPTIONS,
  DIAL_OPTIONS,
  STRAP_OPTIONS,
  getOption,
  formatPrice,
  BASE_PRICE,
} from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

function SummaryRow({
  label,
  name,
  detail,
  price,
  onEdit,
}: {
  label: string
  name: string
  detail?: string
  price: string
  onEdit: () => void
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-cc-graphite/50">
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-cc-cream/80 font-sans">
          {label}
        </p>
        <p className="mt-1 font-serif text-lg text-cc-cream">{name}</p>
        {detail && (
          <p className="mt-0.5 text-sm text-cc-cream/80 font-light">{detail}</p>
        )}
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        <span className="font-mono text-xs text-cc-gold">{price}</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs uppercase tracking-[0.15em] text-cc-cream/80 hover:text-cc-gold transition-colors duration-200"
        >
          Change
        </button>
      </div>
    </div>
  )
}

export function SummaryStep() {
  const { config, totalPrice, setStep, prevStep, reset } = useConfiguratorStore()
  const [reserved, setReserved] = useState(false)

  const model = getOption(MODEL_OPTIONS, config.model)
  const movement = getOption(MOVEMENT_OPTIONS, config.movement)
  const dial = getOption(DIAL_OPTIONS, config.dial)
  const strap = getOption(STRAP_OPTIONS, config.strap)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cc-cream">
          Your Timepiece
        </h2>
        <p className="mt-2 text-base text-cc-cream font-light leading-relaxed">
          Review your custom build. Every detail, chosen by you.
        </p>
      </div>

      {/* Configuration summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {model && (
          <SummaryRow
            label="Model"
            name={model.name}
            detail={`${model.caseSize} ${model.caseMaterial}`}
            price={model.priceDelta === 0 ? 'Base' : `+${formatPrice(model.priceDelta)}`}
            onEdit={() => setStep('model')}
          />
        )}
        {movement && (
          <SummaryRow
            label="Movement"
            name={movement.name}
            detail={`${movement.origin} ${movement.type} \u00B7 ${movement.powerReserve}`}
            price={
              movement.priceDelta === 0
                ? 'Included'
                : `+${formatPrice(movement.priceDelta)}`
            }
            onEdit={() => setStep('movement')}
          />
        )}
        {dial && (
          <SummaryRow
            label="Dial"
            name={dial.name}
            detail={`${dial.style} finish`}
            price={
              dial.priceDelta === 0
                ? 'Included'
                : `+${formatPrice(dial.priceDelta)}`
            }
            onEdit={() => setStep('dial')}
          />
        )}
        {strap && (
          <SummaryRow
            label="Strap"
            name={strap.name}
            detail={`${strap.material} \u00B7 ${strap.width}`}
            price={
              strap.priceDelta === 0
                ? 'Included'
                : `+${formatPrice(strap.priceDelta)}`
            }
            onEdit={() => setStep('strap')}
          />
        )}
      </motion.div>

      {/* Total price */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-baseline justify-between pt-4"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-cc-cream/70 font-sans">
          Total
        </span>
        <span className="font-serif text-3xl text-cc-gold">
          {formatPrice(totalPrice)}
        </span>
      </motion.div>

      <p className="text-xs text-cc-cream/80 font-light leading-relaxed">
        Base price {formatPrice(BASE_PRICE)}. Pricing shown is indicative and
        subject to change. Final pricing will be confirmed when you place your
        order.
      </p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="space-y-3 pt-2"
      >
        <AnimatePresence mode="wait">
          {reserved ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 border border-cc-gold/30 space-y-3"
            >
              <p className="font-serif text-lg text-cc-cream">
                Thank you for your interest
              </p>
              <p className="text-xs text-cc-cream/70 font-light leading-relaxed px-4">
                Custom orders are opening soon. Follow us on Instagram to be
                the first to know when reservations go live.
              </p>
              <a
                href="https://www.instagram.com/colemancollectionwatches/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-sans text-xs uppercase tracking-[0.2em] px-6 py-2.5 bg-cc-gold text-cc-black hover:bg-cc-gold-light transition-colors duration-300"
              >
                Follow @colemancollectionwatches
              </a>
            </motion.div>
          ) : (
            <motion.button
              key="reserve"
              type="button"
              onClick={() => setReserved(true)}
              className="w-full py-4 bg-cc-gold text-cc-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-cc-gold-light transition-colors duration-300"
            >
              Reserve Your Timepiece
            </motion.button>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 py-3 border border-cc-graphite text-cc-cream/80 font-sans text-xs uppercase tracking-[0.2em] hover:border-cc-gold/40 hover:text-cc-cream transition-all duration-300"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              setReserved(false)
              reset()
            }}
            className="flex-1 py-3 border border-cc-graphite text-cc-cream/80 font-sans text-xs uppercase tracking-[0.2em] hover:border-cc-gold/40 hover:text-cc-cream transition-all duration-300"
          >
            Start Over
          </button>
        </div>
      </motion.div>
    </div>
  )
}
