import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type {
  JournalArticle,
  JournalArticleMeta,
  JournalCategory,
} from '@/types/journal'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'journal')

function parseMDXFile(filePath: string): JournalArticle {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    category: data.category,
    tags: data.tags ?? [],
    author: data.author ?? { name: 'Coleman Collection', role: 'Watchmaker & Brand' },
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    featuredImage: data.featuredImage,
    featuredImageAlt: data.featuredImageAlt ?? '',
    featured: data.featured ?? false,
    faq: data.faq ?? [],
    readingTime: stats.text,
    content,
  }
}

function stripContent(article: JournalArticle): JournalArticleMeta {
  const { content: _, ...meta } = article
  return meta
}

export function getAllArticles(): JournalArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  const articles = files.map((f) => parseMDXFile(path.join(CONTENT_DIR, f)))

  return articles
    .map(stripContent)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): JournalArticle | null {
  if (!fs.existsSync(CONTENT_DIR)) return null

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  for (const file of files) {
    const article = parseMDXFile(path.join(CONTENT_DIR, file))
    if (article.slug === slug) return article
  }

  return null
}

export function getArticlesByCategory(category: JournalCategory): JournalArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category)
}

export function getFeaturedArticle(): JournalArticleMeta | null {
  const articles = getAllArticles()
  return articles.find((a) => a.featured) ?? articles[0] ?? null
}

export function getRelatedArticles(slug: string, limit = 3): JournalArticleMeta[] {
  const current = getAllArticles().find((a) => a.slug === slug)
  if (!current) return []

  const all = getAllArticles().filter((a) => a.slug !== slug)
  const sameCategory = all.filter((a) => a.category === current.category)
  const otherCategory = all.filter((a) => a.category !== current.category)

  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug)
}
