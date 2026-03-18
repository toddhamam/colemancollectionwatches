import Link from 'next/link'
import Image from 'next/image'
import type { JournalArticleMeta } from '@/types/journal'
import { getCategoryLabel } from '@/types/journal'

export function ArticleCard({ article }: { article: JournalArticleMeta }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <article className="bg-cc-charcoal border border-cc-graphite rounded-sm overflow-hidden hover:border-cc-gold/30 transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cc-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          {/* Category badge */}
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-cc-gold font-sans mb-3">
            {getCategoryLabel(article.category)}
          </span>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-serif font-bold text-cc-white mb-3 leading-snug group-hover:text-cc-gold transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-cc-cream/80 font-sans font-light leading-relaxed line-clamp-2 mb-5">
            {article.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-cc-cream/60 font-sans tracking-wide">
            <time dateTime={article.publishedAt}>{date}</time>
            <span className="w-0.5 h-0.5 rounded-full bg-cc-cream/40" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
