export type JournalCategory = 'horology' | 'style' | 'craftsmanship' | 'guides'

export interface JournalAuthor {
  name: string
  role: string
  avatar?: string
}

export interface JournalFAQ {
  question: string
  answer: string
}

export interface JournalFrontmatter {
  title: string
  slug: string
  description: string
  category: JournalCategory
  tags: string[]
  author: JournalAuthor
  publishedAt: string
  updatedAt?: string
  featuredImage: string
  featuredImageAlt: string
  featured: boolean
  faq: JournalFAQ[]
}

export interface JournalArticle extends JournalFrontmatter {
  readingTime: string
  content: string
}

export interface JournalArticleMeta extends JournalFrontmatter {
  readingTime: string
}

export const JOURNAL_CATEGORIES: { slug: JournalCategory; label: string }[] = [
  { slug: 'horology', label: 'Horology' },
  { slug: 'style', label: 'Style' },
  { slug: 'craftsmanship', label: 'Craftsmanship' },
  { slug: 'guides', label: 'Guides' },
]

export function getCategoryLabel(category: JournalCategory): string {
  return JOURNAL_CATEGORIES.find((c) => c.slug === category)?.label ?? category
}
