export interface WatchSpecs {
  movement: string;
  caseMaterial: string;
  caseSize: string;
  waterResistance: string;
  powerReserve: string;
  crystal: string;
}

export interface Watch {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  specs: WatchSpecs;
  image: string;
  lifestyleImage?: string;
  images?: string[];
  modelUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
