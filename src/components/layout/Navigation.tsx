'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, BRAND } from '@/lib/constants';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cc-black/90 backdrop-blur-md border-b border-cc-gold/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-5">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="font-serif text-sm tracking-widest text-cc-cream hover:text-cc-gold transition-colors duration-300"
          >
            COLEMAN COLLECTION
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Right: Shop Button + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <Link
              href="/build"
              className="hidden md:inline-block font-sans text-xs uppercase tracking-[0.2em] px-5 py-2 border border-cc-gold/60 text-cc-gold hover:bg-cc-gold hover:text-cc-black transition-all duration-300"
            >
              Build Yours
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden relative w-6 h-5 flex flex-col justify-between"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`block w-full h-px bg-cc-cream transition-all duration-300 origin-center ${
                  mobileOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block w-full h-px bg-cc-cream transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-full h-px bg-cc-cream transition-all duration-300 origin-center ${
                  mobileOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-cc-black-rich flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={closeMobile}
                  className="font-serif text-2xl tracking-widest text-cc-cream hover:text-cc-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + NAV_LINKS.length * 0.06, duration: 0.4 }}
            >
              <Link
                href="/build"
                onClick={closeMobile}
                className="mt-4 font-sans text-xs uppercase tracking-[0.2em] px-8 py-3 border border-cc-gold/60 text-cc-gold hover:bg-cc-gold hover:text-cc-black transition-all duration-300"
              >
                Build Yours
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
