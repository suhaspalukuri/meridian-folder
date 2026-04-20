'use client'

import { useState, useEffect, useRef } from 'react'
import { getAllPosts, Post } from '@/lib/queries'
import PostCard from '@/components/PostCard'

export default function SearchPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAllPosts().then(p => { setPosts(p); setLoading(false) })
    inputRef.current?.focus()
  }, [])

  const results = query.trim()
    ? posts.filter(p => {
        const q = query.toLowerCase()
        return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.authorDesignation.toLowerCase().includes(q) || p.category.title.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))
      })
    : []

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-ink px-6 md:px-12 pt-10 pb-8">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-2xs uppercase tracking-normal text-accent mb-4">Search</p>
          <div className="relative max-w-2xl">
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search stories, people, places…"
              className="w-full bg-transparent border-b-2 border-ink text-ink placeholder:text-ink/25 pl-8 pr-4 pb-3 text-3xl md:text-4xl font-serif outline-none"
            />
          </div>
          {query && !loading && (
            <p className="text-2xs text-ink/40 mt-4 uppercase tracking-normal">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <p className="text-2xs text-ink/30 uppercase tracking-normal">Loading…</p>
        ) : !query.trim() ? (
          <div className="py-20 text-center">
            <p className="font-serif text-4xl text-ink/20">What are you looking for?</p>
            <p className="text-sm text-ink/30 mt-3">Title, author, category, or tag.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {results.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-4xl text-ink/20">No results.</p>
            <p className="text-sm text-ink/30 mt-3">Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  )
}
