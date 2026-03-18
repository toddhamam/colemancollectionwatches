import type { Metadata } from 'next'
import { getAllArticles, getFeaturedArticle } from '@/lib/journal'
import { FeaturedArticleHero } from '@/components/journal/FeaturedArticleHero'
import { ArticleGrid } from '@/components/journal/ArticleGrid'
import { CategoryFilter } from '@/components/journal/CategoryFilter'
import { GoldDivider } from '@/components/ui/GoldDivider'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Insights on horology, watch craftsmanship, styling guides, and the art of mechanical watchmaking from Coleman Collection Watches.',
  openGraph: {
    title: 'Journal | Coleman Collection Watches',
    description:
      'Insights on horology, watch craftsmanship, styling guides, and the art of mechanical watchmaking.',
  },
}

export default function JournalPage() {
  const allArticles = getAllArticles()
  const featured = getFeaturedArticle()
  const gridArticles = featured
    ? allArticles.filter((a) => a.slug !== featured.slug)
    : allArticles

  return (
    <main className="min-h-screen bg-cc-black-rich">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[800px] h-[600px] rounded-full opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-cc-gold/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cc-gold font-sans font-light mb-5">
            The Journal
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cc-white mb-6">
            Insights & Expertise
          </h1>
          <p className="text-base md:text-lg text-cc-cream/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Deep dives into horology, craftsmanship, and the art of wearing a
            timepiece with intention.
          </p>
        </div>

        {/* Featured article */}
        {featured && (
          <div className="relative z-10 max-w-7xl mx-auto">
            <FeaturedArticleHero article={featured} />
          </div>
        )}
      </section>

      {/* Divider + Filter */}
      <section className="px-6 pb-10">
        <GoldDivider className="mb-10" />
        <CategoryFilter />
      </section>

      {/* Article Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <ArticleGrid articles={gridArticles} />
        </div>
      </section>
    </main>
  )
}
