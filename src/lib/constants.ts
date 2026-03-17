import type { NavLink } from '@/types';

export const BRAND = {
  name: 'Coleman Collection',
  fullName: 'Coleman Collection Watches',
  tagline: 'For The Moments That Define Us',
  subtitle: 'Character defining timepieces — For those who refuse to settle',
  instagram: '@colemancollectionwatches',
  instagramUrl: 'https://www.instagram.com/colemancollectionwatches/',
  website: 'colemancollectionwatches.com',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Collection', href: '/collection' },
  { label: 'Craftsmanship', href: '/#craftsmanship' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const COLORS = {
  black: '#0A0A0A',
  blackRich: '#050505',
  charcoal: '#1A1A1A',
  graphite: '#2A2A2A',
  steel: '#4A4A4A',
  silver: '#8A8A8A',
  cream: '#F5F0E8',
  white: '#FAFAF7',
  gold: '#C9A96E',
  goldLight: '#D4BC8A',
  goldDark: '#A68B5B',
} as const;
