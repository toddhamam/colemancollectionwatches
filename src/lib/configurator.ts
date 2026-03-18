// ============================================================
// Watch Configurator — Data & Types
// All options are placeholders. Todd will replace with real
// specs once the manufacturer & supply chain are confirmed.
// ============================================================

export type ConfigStep = 'model' | 'movement' | 'dial' | 'strap' | 'summary'

export const CONFIG_STEPS: { id: ConfigStep; label: string }[] = [
  { id: 'model', label: 'Model' },
  { id: 'movement', label: 'Movement' },
  { id: 'dial', label: 'Dial' },
  { id: 'strap', label: 'Strap' },
  { id: 'summary', label: 'Summary' },
]

// ------ Option Types ------

export interface ConfigOption {
  id: string
  name: string
  description: string
  priceDelta: number // cents added to base price
  color?: string // hex for swatch display
  secondaryColor?: string // for two-tone swatches
}

export interface ModelOption extends ConfigOption {
  caseSize: string
  caseMaterial: string
  waterResistance: string
  crystal: string
  tagline: string
}

export interface MovementOption extends ConfigOption {
  origin: string
  type: string
  powerReserve: string
  frequency: string
}

export interface DialOption extends ConfigOption {
  style: string
}

export interface StrapOption extends ConfigOption {
  material: string
  width: string
}

// ------ Configuration State ------

export interface WatchConfiguration {
  model: string | null
  movement: string | null
  dial: string | null
  strap: string | null
}

// ------ Options Data ------

export const BASE_PRICE = 49500 // $495.00 in cents

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'sovereign',
    name: 'The Sovereign',
    tagline: 'Command Every Moment',
    description:
      'The flagship. A 40mm open-heart automatic with Roman numeral indices and exhibition caseback. The watch that started it all.',
    priceDelta: 0,
    caseSize: '40mm',
    caseMaterial: 'Stainless Steel',
    waterResistance: '5 ATM',
    crystal: 'Sapphire Crystal',
    color: '#B8B8B8',
    secondaryColor: '#C9A96E',
  },
  {
    id: 'sovereign-black',
    name: 'The Sovereign Black',
    tagline: 'Lead From The Shadows',
    description:
      'PVD black-coated stainless steel with a matte-black open-heart dial. For those who command attention without asking.',
    priceDelta: 5000, // +$50
    caseSize: '40mm',
    caseMaterial: 'PVD Black Stainless Steel',
    waterResistance: '5 ATM',
    crystal: 'Sapphire Crystal',
    color: '#1A1A1A',
    secondaryColor: '#C9A96E',
  },
  {
    id: 'sovereign-rose',
    name: 'The Sovereign Rose',
    tagline: 'Elegance Refined',
    description:
      'Rose gold-tone stainless steel case with warm copper undertones. A statement of refined taste and quiet confidence.',
    priceDelta: 7500, // +$75
    caseSize: '40mm',
    caseMaterial: 'Rose Gold-Tone Stainless Steel',
    waterResistance: '5 ATM',
    crystal: 'Sapphire Crystal',
    color: '#B76E79',
    secondaryColor: '#E8C4B8',
  },
]

export const MOVEMENT_OPTIONS: MovementOption[] = [
  {
    id: 'miyota-9039',
    name: 'Miyota 9039',
    description:
      'Japanese automatic movement. Renowned for reliability and precision. The beating heart of every Coleman timepiece.',
    priceDelta: 0,
    origin: 'Japan',
    type: 'Automatic',
    powerReserve: '42 hours',
    frequency: '28,800 vph',
    color: '#B8B8B8',
  },
  {
    id: 'miyota-82s0',
    name: 'Miyota 82S0',
    description:
      'Japanese open-heart automatic. A window to the soul of your timepiece — the skeleton dial reveals the intricate mechanics within.',
    priceDelta: 2500, // +$25
    origin: 'Japan',
    type: 'Automatic (Open Heart)',
    powerReserve: '40 hours',
    frequency: '21,600 vph',
    color: '#C9A96E',
  },
  {
    id: 'sw-200',
    name: 'Sellita SW200-1',
    description:
      'Swiss-made automatic movement. The gold standard of precision watchmaking, with a decorated rotor visible through the exhibition caseback.',
    priceDelta: 15000, // +$150
    origin: 'Switzerland',
    type: 'Automatic',
    powerReserve: '38 hours',
    frequency: '28,800 vph',
    color: '#D4BC8A',
  },
  {
    id: 'sw-300',
    name: 'Sellita SW300-1',
    description:
      'Premium Swiss automatic with enhanced accuracy. For the collector who accepts nothing less than Swiss precision.',
    priceDelta: 25000, // +$250
    origin: 'Switzerland',
    type: 'Automatic',
    powerReserve: '42 hours',
    frequency: '28,800 vph',
    color: '#F5F0E8',
  },
]

export const DIAL_OPTIONS: DialOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    description: 'Deep black sunburst dial with luminous indices. The signature Coleman look.',
    priceDelta: 0,
    style: 'Sunburst',
    color: '#0A0A0A',
  },
  {
    id: 'pearl',
    name: 'Pearl White',
    description: 'Luminous white dial with silver indices. Clean, bright, commanding.',
    priceDelta: 0,
    style: 'Sunburst',
    color: '#F5F0E8',
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    description: 'Deep navy blue dial with a subtle sunburst pattern that shifts in the light.',
    priceDelta: 2500, // +$25
    style: 'Sunburst',
    color: '#1A2744',
  },
  {
    id: 'racing-green',
    name: 'Racing Green',
    description: 'British racing green with a textured guilloche pattern. Bold and distinguished.',
    priceDelta: 2500, // +$25
    style: 'Guilloche',
    color: '#1B3D2F',
  },
  {
    id: 'champagne',
    name: 'Champagne',
    description: 'Warm golden champagne dial. Catches light like a celebration.',
    priceDelta: 2500, // +$25
    style: 'Sunburst',
    color: '#D4BC8A',
  },
]

export const STRAP_OPTIONS: StrapOption[] = [
  {
    id: 'black-leather',
    name: 'Black Leather',
    description: 'Italian full-grain leather. Supple, durable, timeless.',
    priceDelta: 0,
    material: 'Full-Grain Leather',
    width: '20mm',
    color: '#1A1A1A',
  },
  {
    id: 'brown-leather',
    name: 'Saddle Brown',
    description: 'Rich brown Italian leather with a natural grain. Develops character with wear.',
    priceDelta: 0,
    material: 'Full-Grain Leather',
    width: '20mm',
    color: '#6B3A2A',
  },
  {
    id: 'tan-leather',
    name: 'Cognac Tan',
    description: 'Light tan leather with a warm amber tone. Classic European elegance.',
    priceDelta: 0,
    material: 'Full-Grain Leather',
    width: '20mm',
    color: '#A0714F',
  },
  {
    id: 'steel-bracelet',
    name: 'Steel Bracelet',
    description: 'Brushed and polished stainless steel bracelet with butterfly clasp. The ultimate statement.',
    priceDelta: 7500, // +$75
    material: 'Stainless Steel',
    width: '20mm',
    color: '#B8B8B8',
    secondaryColor: '#8A8A8A',
  },
  {
    id: 'rubber',
    name: 'Vulcanised Rubber',
    description: 'High-performance FKM rubber strap. Sport-ready without sacrificing style.',
    priceDelta: 2500, // +$25
    material: 'FKM Rubber',
    width: '20mm',
    color: '#2A2A2A',
  },
]

// ------ Helpers ------

export function getOption<T extends ConfigOption>(options: T[], id: string | null): T | undefined {
  return options.find((o) => o.id === id)
}

export function calculatePrice(config: WatchConfiguration): number {
  let total = BASE_PRICE
  const model = getOption(MODEL_OPTIONS, config.model)
  const movement = getOption(MOVEMENT_OPTIONS, config.movement)
  const dial = getOption(DIAL_OPTIONS, config.dial)
  const strap = getOption(STRAP_OPTIONS, config.strap)

  if (model) total += model.priceDelta
  if (movement) total += movement.priceDelta
  if (dial) total += dial.priceDelta
  if (strap) total += strap.priceDelta

  return total
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
}

// ------ Product Image Mapping ------
// Maps each configurator step + current selections to the best real product photo.
// When we don't have an exact photo for a combination, we show the closest match.

export interface ProductImage {
  src: string
  alt: string
}

const PRODUCT_IMAGES = {
  // Front-facing product shots
  blackDialBox: { src: '/images/watches/black-dial-box.png', alt: 'Coleman Collection — Black Dial' },
  whiteDialBox: { src: '/images/watches/white-dial-box.png', alt: 'Coleman Collection — White Dial' },
  productHero: { src: '/images/watches/Product Photo 2.png', alt: 'Coleman Collection — The Sovereign' },

  // Detail shots
  casebackMovement: { src: '/images/watches/caseback-movement.jpg', alt: 'Exhibition caseback — automatic movement' },
  dialMacro: { src: '/images/watches/hero-dial-macro.jpg', alt: 'Dial macro — open heart detail' },
  claspDetail: { src: '/images/watches/clasp-detail.jpg', alt: 'Deployment clasp detail' },
  bandOpen: { src: '/images/watches/Back Band Open.JPG', alt: 'Strap and caseback detail' },

  // Lifestyle
  lifestyleWrist: { src: '/images/watches/lifestyle-wrist.png', alt: 'Coleman Collection — on the wrist' },
  lifestyleBlazer: { src: '/images/watches/lifestyle-blazer.jpg', alt: 'Coleman Collection — suited style' },
} as const

export function getProductImage(
  step: ConfigStep,
  config: WatchConfiguration
): ProductImage {
  switch (step) {
    case 'model':
      return PRODUCT_IMAGES.productHero

    case 'movement':
      return PRODUCT_IMAGES.casebackMovement

    case 'dial': {
      // Show the dial that matches the selected color
      if (!config.dial) return PRODUCT_IMAGES.blackDialBox
      const darkDials = ['obsidian', 'midnight', 'racing-green']
      return darkDials.includes(config.dial)
        ? PRODUCT_IMAGES.blackDialBox
        : PRODUCT_IMAGES.whiteDialBox
    }

    case 'strap':
      return PRODUCT_IMAGES.bandOpen

    case 'summary':
      return PRODUCT_IMAGES.lifestyleBlazer

    default:
      return PRODUCT_IMAGES.productHero
  }
}

// 3D material colors derived from configuration
export interface WatchMaterials {
  caseColor: string
  caseMetal: number // metalness
  caseRough: number // roughness
  dialColor: string
  bezelColor: string
  handColor: string
  strapColor: string
  strapMetal: number
  strapRough: number
  markerColor: string
}

export function getWatchMaterials(config: WatchConfiguration): WatchMaterials {
  const model = getOption(MODEL_OPTIONS, config.model)
  const dial = getOption(DIAL_OPTIONS, config.dial)
  const strap = getOption(STRAP_OPTIONS, config.strap)

  // Case color based on model
  let caseColor = '#B8953F' // default gold-steel
  let caseMetal = 0.9
  let caseRough = 0.25
  let bezelColor = '#C9A96E'
  let handColor = '#C9A96E'
  let markerColor = '#C9A96E'

  if (model?.id === 'sovereign-black') {
    caseColor = '#1A1A1A'
    caseMetal = 0.85
    caseRough = 0.4
    bezelColor = '#2A2A2A'
    handColor = '#C9A96E'
    markerColor = '#C9A96E'
  } else if (model?.id === 'sovereign-rose') {
    caseColor = '#B76E79'
    caseMetal = 0.9
    caseRough = 0.2
    bezelColor = '#D4A0A0'
    handColor = '#E8C4B8'
    markerColor = '#E8C4B8'
  }

  // Dial color
  const dialColor = dial?.color ?? '#0A0A0A'

  // Strap
  const strapColor = strap?.color ?? '#1A1A1A'
  const isMetalStrap = strap?.id === 'steel-bracelet'
  const strapMetal = isMetalStrap ? 0.85 : 0
  const strapRough = isMetalStrap ? 0.3 : 0.9

  return {
    caseColor,
    caseMetal,
    caseRough,
    dialColor,
    bezelColor,
    handColor,
    strapColor,
    strapMetal,
    strapRough,
    markerColor,
  }
}
