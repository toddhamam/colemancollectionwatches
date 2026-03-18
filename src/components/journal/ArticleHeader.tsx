import Image from 'next/image'
import Link from 'next/link'
import type { JournalArticle } from '@/types/journal'
import { getCategoryLabel } from '@/types/journal'

export function ArticleHeader({ article }: { article: JournalArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header>
      {/* Hero image */}
      <div className="relative w-full aspect-[21/9] md:aspect-[21/7]">
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cc-black-rich via-cc-black/50 to-cc-black/20" />
      </div>

      {/* Article meta */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 -mt-32 md:-mt-40">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[11px] font-sans tracking-wide">
            <li>
              <Link href="/journal" className="text-cc-cream/60 hover:text-cc-gold transition-colors">
                Journal
              </Link>
            </li>
            <li className="text-cc-cream/40">/</li>
            <li>
              <Link
                href={`/journal/category/${article.category}`}
                className="text-cc-gold"
              >
                {getCategoryLabel(article.category)}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cc-white leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-cc-cream/60 font-sans tracking-wide mb-8">
          <span className="text-cc-cream/80">{article.author.name}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-cc-cream/40" />
          <time dateTime={article.publishedAt}>{date}</time>
          <span className="w-0.5 h-0.5 rounded-full bg-cc-cream/40" />
          <span>{article.readingTime}</span>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-cc-gold/60 to-transparent" />
      </div>
    </header>
  )
}
