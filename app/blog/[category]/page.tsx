import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategoryBySlug, getPostsByCategory, getAllCategorySlugs } from '@/lib/queries'
import PostCard from '@/components/PostCard'

export const revalidate = 60

interface Props { params: { category: string } }

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map(slug => ({ category: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.category)
  if (!cat) return {}
  return { title: cat.title, description: cat.description }
}

export default async function CategoryPage({ params }: Props) {
  const [category, posts] = await Promise.all([getCategoryBySlug(params.category), getPostsByCategory(params.category)])
  if (!category) notFound()

  return (
    <div className="min-h-screen">
      <div className="border-b-2 border-ink px-6 md:px-12 pt-10 pb-10">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-2xs uppercase tracking-normal text-accent mb-2">
            <Link href="/blog" className="text-ink/30 hover:text-ink/60 transition-colors">Stories</Link>
            {' '}›{' '}{category.title}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-none mb-4">{category.title}</h1>
          {category.description && <p className="text-ink/50 text-lg max-w-2xl leading-relaxed">{category.description}</p>}
          <p className="text-2xs text-ink/30 uppercase tracking-normal mt-4">{posts.length} stories</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-ink/20">No stories yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
