'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import type { Post, Category } from '@/lib/queries'

const PER_PAGE = 9

export default function BlogClient({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = posts
    .filter(p => active === 'all' || p.category.slug.current === active)
    .filter(p => {
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))
    })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleCat(slug: string) { setActive(slug); setPage(1) }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) { setQuery(e.target.value); setPage(1) }

  const allCats = [{ _id: 'all', title: 'All', slug: { current: 'all' }, description: '' }, ...categories]

  return (
    <div className="min-h-screen">
      <div className="border-b-2 border-ink px-6 md:px-12 pt-10 pb-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div>
              <p className="text-2xs uppercase tracking-widest text-accent mb-2">Archive</p>
              <h1 className="font-serif text-5xl md:text-6xl text-ink leading-none">All Stories</h1>
            </div>
            <div className="relative w-full md:w-72">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" value={query} onChange={handleSearch}
                placeholder="Search…"
                className="w-full bg-transparent border border-ink/20 text-ink placeholder:text-ink/30 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-ink transition-colors"
              />
              {query && <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink transition-colors text-xs">✕</button>}
            </div>
          </div>

          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none border-t border-ink/10">
            {allCats.map(cat => (
              <button
                key={cat._id}
                onClick={() => handleCat(cat.slug.current)}
                className={`flex-shrink-0 px-5 py-3 text-2xs uppercase tracking-widest transition-all border-b-2 -mb-px ${
                  active === cat.slug.current
                    ? 'border-ink text-ink font-medium'
                    : 'border-transparent text-ink/40 hover:text-ink'
                }`}
              >
                {cat.title}
              </button>
            ))}
            <div className="ml-auto text-2xs text-ink/30 px-5 py-3 flex-shrink-0">
              {`${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'}`}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {paginated.map(post => <PostCard key={post._id} post={post} />)}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-ink/30">No stories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
