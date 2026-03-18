import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { BRAND } from '@/lib/constants';
import { generateOrganizationSchema } from '@/lib/structured-data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://colemancollectionwatches.com'),
  title: {
    default: `${BRAND.fullName} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.fullName}`,
  },
  description: BRAND.subtitle,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BRAND.fullName,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD for SEO/GEO — content is hardcoded, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${fontVariables} antialiased`}>
        {children}
      </body>
    </html>
  );
}
