import { getAllPosts, getAllCategories } from '@/lib/queries'
import BlogClient from './BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Stories',
  description: 'Browse all stories from The Meridian Folder.',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return <BlogClient posts={posts} categories={categories} />
}
