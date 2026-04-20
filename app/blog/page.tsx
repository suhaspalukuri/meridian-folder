'use client'

import { useState, useEffect } from 'react'
import { getAllPosts, getAllCategories, Post, Category } from '@/lib/queries'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'

const POSTS_PER_PAGE = 9

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllPosts(), getAllCategories()]).then(([p, c]) => {
      setPosts(p)
      setCategories(c)
      setLoading(false)
    })
  }, [])

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category.slug.current === activeCategory)

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-2">All Stories</h1>
        <p className="text-stone-400">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-stone-200 pb-4">
        {[{ title: 'All', slug: { current: 'all' } }, ...categories].map(cat => {
          const slug = cat.slug.current
          return (
            <button
              key={slug}
              onClick={() => handleCategoryChange(slug)}
              className={`text-sm px-4 py-1.5 font-medium transition-colors ${
                activeCategory === slug
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {cat.title}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/9] bg-stone-200 mb-4" />
              <div className="h-4 bg-stone-200 mb-2 w-1/3" />
              <div className="h-6 bg-stone-200 mb-2" />
              <div className="h-4 bg-stone-200 w-3/4" />
            </div>
          ))}
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginated.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <p className="text-stone-400 py-12 text-center">No stories in this category yet.</p>
      )}
    </div>
  )
}
