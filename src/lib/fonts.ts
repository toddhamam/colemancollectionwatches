import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';

export const playfair = Playfair_Display({
  variable: '--font-playfair',
  weight: ['400', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const inter = Inter({
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const fontVariables = `${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`;
