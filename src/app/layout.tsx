import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { BRAND } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: `${BRAND.fullName} | ${BRAND.tagline}`,
  description: BRAND.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} antialiased`}>
        {children}
      </body>
    </html>
  );
}
