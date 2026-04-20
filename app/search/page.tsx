import { getAllPosts } from '@/lib/queries'
import SearchClient from './SearchClient'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search all stories on The Meridian Folder.',
}

export default async function SearchPage() {
  const posts = await getAllPosts()
  return <SearchClient posts={posts} />
}
