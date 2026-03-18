'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { JournalArticleMeta } from '@/types/journal'
import { getCategoryLabel } from '@/types/journal'

export function FeaturedArticleHero({ article }: { article: JournalArticleMeta }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/journal/${article.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-sm border border-cc-graphite hover:border-cc-gold/30 transition-all duration-500">
          {/* Image */}
          <div className="relative aspect-[21/9] md:aspect-[21/8]">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cc-black via-cc-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cc-black/40 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-cc-gold font-sans mb-3">
              Featured — {getCategoryLabel(article.category)}
            </span>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-cc-white mb-4 leading-tight max-w-3xl group-hover:text-cc-gold transition-colors duration-300">
              {article.title}
            </h2>

            <p className="text-sm md:text-base text-cc-cream/80 font-sans font-light leading-relaxed max-w-2xl mb-5 line-clamp-2">
              {article.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-[11px] text-cc-cream/60 font-sans tracking-wide">
                <time dateTime={article.publishedAt}>{date}</time>
                <span className="w-0.5 h-0.5 rounded-full bg-cc-cream/40" />
                <span>{article.readingTime}</span>
              </div>

              <span className="text-[11px] uppercase tracking-[0.15em] text-cc-gold font-sans ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Read Article →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
