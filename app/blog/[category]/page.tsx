import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategoryBySlug, getPostsByCategory, getAllCategorySlugs } from '@/lib/queries'
import PostCard from '@/components/PostCard'
import Breadcrumb from '@/components/Breadcrumb'

interface Props {
  params: { category: string }
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map(slug => ({ category: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category)
  if (!category) return {}
  return {
    title: category.title,
    description: category.description || `Stories from ${category.title}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(params.category),
    getPostsByCategory(params.category),
  ])

  if (!category) notFound()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Breadcrumb crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Stories', href: '/blog' },
        { label: category.title },
      ]} />

      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-3">{category.title}</h1>
        {category.description && (
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">{category.description}</p>
        )}
        <p className="text-stone-400 text-sm mt-2">{posts.length} {posts.length === 1 ? 'story' : 'stories'}</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-stone-400 py-12 text-center">No stories in this category yet. Check back soon.</p>
      )}
    </div>
  )
}
