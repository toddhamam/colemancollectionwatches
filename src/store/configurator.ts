'use client'

import { create } from 'zustand'
import {
  type ConfigStep,
  type WatchConfiguration,
  CONFIG_STEPS,
  calculatePrice,
} from '@/lib/configurator'

interface ConfiguratorState {
  // Current step
  step: ConfigStep
  stepIndex: number

  // Selections
  config: WatchConfiguration

  // Derived
  totalPrice: number

  // Actions
  setStep: (step: ConfigStep) => void
  nextStep: () => void
  prevStep: () => void
  setSelection: <K extends keyof WatchConfiguration>(
    key: K,
    value: WatchConfiguration[K]
  ) => void
  reset: () => void
}

const INITIAL_CONFIG: WatchConfiguration = {
  model: null,
  movement: null,
  dial: null,
  strap: null,
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  step: 'model',
  stepIndex: 0,
  config: { ...INITIAL_CONFIG },
  totalPrice: calculatePrice(INITIAL_CONFIG),

  setStep: (step) => {
    const idx = CONFIG_STEPS.findIndex((s) => s.id === step)
    set({ step, stepIndex: idx })
  },

  nextStep: () => {
    const { stepIndex } = get()
    if (stepIndex < CONFIG_STEPS.length - 1) {
      const next = CONFIG_STEPS[stepIndex + 1]
      set({ step: next.id, stepIndex: stepIndex + 1 })
    }
  },

  prevStep: () => {
    const { stepIndex } = get()
    if (stepIndex > 0) {
      const prev = CONFIG_STEPS[stepIndex - 1]
      set({ step: prev.id, stepIndex: stepIndex - 1 })
    }
  },

  setSelection: (key, value) => {
    const newConfig = { ...get().config, [key]: value }
    set({
      config: newConfig,
      totalPrice: calculatePrice(newConfig),
    })
  },

  reset: () => {
    set({
      step: 'model',
      stepIndex: 0,
      config: { ...INITIAL_CONFIG },
      totalPrice: calculatePrice(INITIAL_CONFIG),
    })
  },
}))
