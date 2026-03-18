import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ArticleCard } from './ArticleCard'
import type { JournalArticleMeta } from '@/types/journal'

export function ArticleGrid({ articles }: { articles: JournalArticleMeta[] }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-cc-cream/70 font-sans text-sm">
          No articles found in this category yet.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {articles.map((article, index) => (
        <RevealOnScroll key={article.slug} delay={index * 0.1}>
          <ArticleCard article={article} />
        </RevealOnScroll>
      ))}
    </div>
  )
}
