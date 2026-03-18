import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ArticleCard } from './ArticleCard'
import type { JournalArticleMeta } from '@/types/journal'

export function RelatedArticles({ articles }: { articles: JournalArticleMeta[] }) {
  if (articles.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-cc-gold font-sans mb-3">
          Continue Reading
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-cc-white">
          Related Articles
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article, index) => (
          <RevealOnScroll key={article.slug} delay={index * 0.1}>
            <ArticleCard article={article} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
