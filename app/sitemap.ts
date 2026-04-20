import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs } from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, categorySlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllCategorySlugs(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/submit`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map(slug => ({
    url: `${siteUrl}/blog/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = postSlugs.map(({ category, slug }) => ({
    url: `${siteUrl}/blog/${category}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...postPages]
}
