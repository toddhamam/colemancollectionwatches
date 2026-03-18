import type { Watch } from '@/types'

export const WATCHES: Watch[] = [
  {
    slug: 'noir',
    name: 'The Open-Heart Noir',
    tagline: 'Command Every Second',
    description:
      'The dark heart of the collection. A black open-heart dial reveals the Miyota automatic movement beneath, framed by polished stainless steel and Roman numeral indices. For those who lead from the shadows.',
    price: 495,
    image: '/images/watches/black-dial-box.png',
    lifestyleImage: '/images/watches/lifestyle-wrist.png',
    specs: {
      movement: 'Miyota Automatic',
      caseMaterial: 'Stainless Steel',
      caseSize: '40mm',
      waterResistance: '5 ATM',
      powerReserve: '40 hours',
      crystal: 'Sapphire Crystal',
    },
  },
  {
    slug: 'blanc',
    name: 'The Open-Heart Blanc',
    tagline: 'Where Light Meets Precision',
    description:
      'A luminous white open-heart dial set against polished steel, revealing the mechanical heartbeat within. The Blanc is clarity of purpose, made visible. For those who refuse to settle.',
    price: 495,
    image: '/images/watches/white-dial-box.png',
    lifestyleImage: '/images/watches/white-dial-wrist.png',
    specs: {
      movement: 'Miyota Automatic',
      caseMaterial: 'Stainless Steel',
      caseSize: '40mm',
      waterResistance: '5 ATM',
      powerReserve: '40 hours',
      crystal: 'Sapphire Crystal',
    },
  },
]
