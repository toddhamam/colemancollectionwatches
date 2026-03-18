import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles, getAllSlugs } from '@/lib/journal'
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data'
import { getCategoryLabel } from '@/types/journal'
import { ArticleHeader } from '@/components/journal/ArticleHeader'
import { ArticleBody } from '@/components/journal/ArticleBody'
import { ArticleTOC } from '@/components/journal/ArticleTOC'
import { ArticleFAQ } from '@/components/journal/ArticleFAQ'
import { RelatedArticles } from '@/components/journal/RelatedArticles'
import { ArticleCTA } from '@/components/journal/ArticleCTA'
import { GoldDivider } from '@/components/ui/GoldDivider'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      section: getCategoryLabel(article.category),
      tags: article.tags,
      images: [
        {
          url: article.featuredImage,
          alt: article.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug, 3)

  const articleSchema = generateArticleSchema(article)
  const faqSchema = generateFAQSchema(article.faq)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Journal', url: '/journal' },
    { name: getCategoryLabel(article.category), url: `/journal/category/${article.category}` },
    { name: article.title, url: `/journal/${article.slug}` },
  ])

  return (
    <main className="min-h-screen bg-cc-black-rich">
      {/* JSON-LD Structured Data for SEO/GEO — generated from our own content data, safe to inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <ArticleHeader article={article} />

      {/* Article content area */}
      <article className="px-6 pt-12 pb-16">
        <div className="max-w-7xl mx-auto flex gap-12">
          {/* Main content */}
          <div className="min-w-0 flex-1 max-w-3xl mx-auto lg:mx-0">
            <ArticleBody content={article.content} />
            <ArticleFAQ faqs={article.faq} />
          </div>

          {/* Table of Contents */}
          <ArticleTOC />
        </div>
      </article>

      <GoldDivider />
      <RelatedArticles articles={related} />
      <ArticleCTA />
    </main>
  )
}
