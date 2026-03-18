import Link from 'next/link';
import { NAV_LINKS, BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-cc-black-rich py-20">
      {/* Gold Divider */}
      <div className="mx-auto max-w-6xl px-8">
        <div className="h-px w-full bg-cc-gold/30 mb-16" />

        {/* Brand Wordmark */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="font-serif text-lg tracking-widest text-cc-cream hover:text-cc-gold transition-colors duration-300"
          >
            COLEMAN COLLECTION
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs uppercase tracking-[0.2em] text-cc-cream/80 hover:text-cc-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Instagram */}
        <div className="text-center mb-16">
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-cc-cream/80 hover:text-cc-gold transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {BRAND.instagram}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-cc-cream/60">
          &copy; {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
