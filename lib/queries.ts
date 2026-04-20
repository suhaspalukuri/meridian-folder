import { client } from './sanity'

function isSanityConfigured() {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
}

const EMPTY: never[] = []

async function safeFetch<T>(query: string, params?: Record<string, unknown>, fallbackValue: T | null | never[] = EMPTY): Promise<T> {
  if (!isSanityConfigured()) return fallbackValue as T
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await client.fetch<T>(query, params as any)
  } catch {
    return fallbackValue as T
  }
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description: string
  postCount?: number
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: string
  authorDesignation: string
  authorPhoto?: string
  category: Category
  coverImage?: string
  excerpt: string
  body?: unknown[]
  publishedAt: string
  featured: boolean
  tags?: string[]
}

const postFields = `
  _id,
  title,
  slug,
  author,
  authorDesignation,
  authorPhoto,
  category->{_id, title, slug, description},
  coverImage,
  excerpt,
  publishedAt,
  featured,
  tags
`

export async function getAllPosts(): Promise<Post[]> {
  return safeFetch(`*[_type == "post"] | order(publishedAt desc) { ${postFields} }`)
}

export async function getFeaturedPost(): Promise<Post | null> {
  return safeFetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0] { ${postFields} }`,
    undefined,
    null
  )
}

export async function getLatestPosts(limit = 6, excludeId?: string): Promise<Post[]> {
  const condition = excludeId
    ? `_type == "post" && _id != "${excludeId}"`
    : `_type == "post"`
  return safeFetch(`*[${condition}] | order(publishedAt desc)[0...${limit}] { ${postFields} }`)
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return safeFetch(
    `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) { ${postFields} }`,
    { categorySlug }
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safeFetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields}, body }`,
    { slug },
    null
  )
}

export async function getAllCategories(): Promise<Category[]> {
  return safeFetch(
    `*[_type == "category"] | order(title asc) {
      _id, title, slug, description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safeFetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id, title, slug, description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`,
    { slug },
    null
  )
}

export async function getAllPostSlugs(): Promise<{ category: string; slug: string }[]> {
  return safeFetch(
    `*[_type == "post"] { "category": category->slug.current, "slug": slug.current }`
  )
}

export async function getAllCategorySlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return []
  try {
    const cats = await client.fetch(`*[_type == "category"] { "slug": slug.current }`)
    return cats.map((c: { slug: string }) => c.slug)
  } catch {
    return []
  }
}

export async function getRelatedPosts(categoryId: string, excludeSlug: string, limit = 3): Promise<Post[]> {
  return safeFetch(
    `*[_type == "post" && category._ref == $categoryId && slug.current != $excludeSlug] | order(publishedAt desc)[0...${limit}] { ${postFields} }`,
    { categoryId, excludeSlug }
  )
}
