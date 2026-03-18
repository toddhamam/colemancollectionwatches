import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticlesByCategory } from '@/lib/journal'
import { JOURNAL_CATEGORIES, getCategoryLabel } from '@/types/journal'
import type { JournalCategory } from '@/types/journal'
import { ArticleGrid } from '@/components/journal/ArticleGrid'
import { CategoryFilter } from '@/components/journal/CategoryFilter'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function generateStaticParams() {
  return JOURNAL_CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const valid = JOURNAL_CATEGORIES.some((c) => c.slug === category)
  if (!valid) return {}

  const label = getCategoryLabel(category as JournalCategory)
  return {
    title: `${label} — Journal`,
    description: `Articles about ${label.toLowerCase()} from Coleman Collection Watches.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const valid = JOURNAL_CATEGORIES.some((c) => c.slug === category)
  if (!valid) notFound()

  const label = getCategoryLabel(category as JournalCategory)
  const articles = getArticlesByCategory(category as JournalCategory)

  return (
    <main className="min-h-screen bg-cc-black-rich">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
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

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cc-gold font-sans font-light mb-5">
            The Journal
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cc-white mb-6">
            {label}
          </h1>
          <p className="text-base md:text-lg text-cc-cream/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} in{' '}
            {label.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 pb-10">
        <GoldDivider className="mb-10" />
        <CategoryFilter />
      </section>

      {/* Article Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </main>
  )
}
