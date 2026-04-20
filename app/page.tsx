import Link from 'next/link'
import { getFeaturedPost, getLatestPosts, getAllCategories } from '@/lib/queries'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import CategoryGrid from '@/components/CategoryGrid'
import NewsletterSignup from '@/components/NewsletterSignup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Meridian Folder — Stories of founders from every corner of the globe',
  description: 'An editorial platform publishing in-depth stories of founders, creators, and everyday achievers from all over the world.',
  openGraph: {
    title: 'The Meridian Folder',
    description: 'Stories of founders, creators, and everyday achievers from every corner of the globe.',
  },
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedPost(),
    getAllCategories(),
  ])
  const latest = await getLatestPosts(6, featured?._id)

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'The Meridian Folder',
            description: 'Stories of founders, creators, and everyday achievers from every corner of the globe.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com',
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-stone-900 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-6">
            An Editorial Platform
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-balance">
            Every remarkable story deserves a platform.
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            In-depth stories of founders, creators, and everyday achievers — famous or not — from every corner of the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-stone-900 px-8 py-3.5 font-semibold hover:bg-stone-100 transition-colors"
            >
              Read Stories
            </Link>
            <Link
              href="/submit"
              className="border border-white text-white px-8 py-3.5 font-semibold hover:bg-white hover:text-stone-900 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">

        {/* Featured Story */}
        {featured && (
          <section className="py-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Story</h2>
            </div>
            <FeaturedPost post={featured} />
          </section>
        )}

        {/* Latest Stories */}
        {latest.length > 0 && (
          <section className="py-16 border-t border-stone-200">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Latest Stories</h2>
              <Link href="/blog" className="text-sm text-amber-700 font-semibold hover:text-amber-900">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {latest.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Browse by Category */}
        {categories.length > 0 && (
          <section className="py-16 border-t border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-10">Browse by Category</h2>
            <CategoryGrid categories={categories} />
          </section>
        )}

      </div>

      {/* Newsletter CTA */}
      <section className="bg-stone-900 text-white py-20 px-6 mt-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Get the best stories, delivered.
          </h2>
          <p className="text-stone-400 mb-8">
            New stories straight to your inbox — no spam, ever.
          </p>
          <NewsletterSignup dark />
        </div>
      </section>
    </>
  )
}
