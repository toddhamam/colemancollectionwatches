'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JOURNAL_CATEGORIES } from '@/types/journal'

export function CategoryFilter() {
  const pathname = usePathname()

  const isAll = pathname === '/journal'

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {/* All tab */}
      <Link
        href="/journal"
        className={`font-sans text-[11px] uppercase tracking-[0.12em] px-4 py-2 border rounded-sm transition-all duration-300 ${
          isAll
            ? 'bg-cc-gold/10 border-cc-gold/60 text-cc-gold'
            : 'border-cc-graphite text-cc-cream/70 hover:border-cc-gold/30 hover:text-cc-cream'
        }`}
      >
        All
      </Link>

      {/* Category tabs */}
      {JOURNAL_CATEGORIES.map((cat) => {
        const isActive = pathname === `/journal/category/${cat.slug}`
        return (
          <Link
            key={cat.slug}
            href={`/journal/category/${cat.slug}`}
            className={`font-sans text-[11px] uppercase tracking-[0.12em] px-4 py-2 border rounded-sm transition-all duration-300 ${
              isActive
                ? 'bg-cc-gold/10 border-cc-gold/60 text-cc-gold'
                : 'border-cc-graphite text-cc-cream/70 hover:border-cc-gold/30 hover:text-cc-cream'
            }`}
          >
            {cat.label}
          </Link>
        )
      })}
    </div>
  )
}
