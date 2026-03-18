'use client'

import { CONFIG_STEPS, type ConfigStep } from '@/lib/configurator'
import { useConfiguratorStore } from '@/store/configurator'

export function StepProgress() {
  const { stepIndex, setStep, config } = useConfiguratorStore()

  function canNavigateTo(targetStep: ConfigStep): boolean {
    // Can always go back to earlier steps
    const targetIdx = CONFIG_STEPS.findIndex((s) => s.id === targetStep)
    if (targetIdx <= stepIndex) return true

    // Can go forward only if current step has a selection
    const stepKeys: (keyof typeof config)[] = ['model', 'movement', 'dial', 'strap']
    for (let i = 0; i < targetIdx; i++) {
      const key = stepKeys[i]
      if (key && !config[key]) return false
    }
    return true
  }

  return (
    <div className="flex items-center gap-1 w-full max-w-md">
      {CONFIG_STEPS.map((step, i) => {
        const isActive = i === stepIndex
        const isPast = i < stepIndex
        const canClick = canNavigateTo(step.id)

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => canClick && setStep(step.id)}
            disabled={!canClick}
            className={`
              group relative flex-1 h-1 rounded-full transition-all duration-500
              ${isActive ? 'bg-cc-gold' : isPast ? 'bg-cc-gold/60' : 'bg-cc-graphite'}
              ${canClick ? 'cursor-pointer' : 'cursor-default'}
            `}
            aria-label={`Step ${i + 1}: ${step.label}`}
          >
            {/* Hover tooltip */}
            <span
              className={`
                absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap
                transition-opacity duration-200
                ${isActive ? 'opacity-100 text-cc-gold' : 'opacity-0 group-hover:opacity-100 text-cc-cream/80'}
              `}
            >
              {step.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
