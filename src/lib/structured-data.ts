import type { JournalArticle, JournalFAQ } from '@/types/journal'
import { BRAND } from '@/lib/constants'

const SITE_URL = 'https://colemancollectionwatches.com'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.fullName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: BRAND.subtitle,
    sameAs: [BRAND.instagramUrl],
  }
}

export function generateArticleSchema(article: JournalArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.featuredImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.fullName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${article.slug}`,
    },
    articleSection: article.category,
    keywords: article.tags.join(', '),
  }
}

export function generateFAQSchema(faqs: JournalFAQ[]) {
  if (faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}
