'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i} className="bg-accent/15 text-accent">{part}</mark> : part
      )}
    </>
  )
}

function score(post: Post, q: string): number {
  const t = q.toLowerCase()
  let s = 0
  if (post.title.toLowerCase().includes(t)) s += 3
  if (post.excerpt.toLowerCase().includes(t)) s += 2
  if (post.category.title.toLowerCase().includes(t)) s += 2
  if (post.tags?.some(tag => tag.toLowerCase().includes(t))) s += 1
  return s
}

export default function SearchClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(t)
  }, [query])

  const results = debouncedQuery.trim()
    ? posts
        .map(p => ({ post: p, score: score(p, debouncedQuery) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ post }) => post)
    : posts.slice(0, 9)

  const isSearching = debouncedQuery.trim().length > 0

  return (
    <div className="min-h-screen">
      <div className="border-b-2 border-ink px-6 md:px-12 pt-10 pb-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative max-w-2xl">
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search stories…"
              className="w-full bg-transparent border-b-2 border-ink text-ink placeholder:text-ink/25 pl-8 pr-10 pb-3 text-3xl md:text-4xl font-serif outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink transition-colors text-2xl leading-none">×</button>
            )}
          </div>
          <p className="text-xs text-ink/40 mt-4">
            {isSearching
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${debouncedQuery}"`
              : `${posts.length} stories`}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {isSearching && results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-4xl text-ink/20">No results.</p>
            <p className="text-sm text-ink/30 mt-3">Try a different keyword.</p>
          </div>
        ) : (
          <>
            {!isSearching && (
              <p className="text-xs text-ink/30 uppercase mb-8">Recent stories</p>
            )}
            <div className="divide-y divide-ink/10">
              {results.map(post => {
                const href = `/blog/${post.category.slug.current}/${post.slug.current}`
                return (
                  <article key={post._id} className="group py-6 flex gap-6 items-start">
                    <Link href={href} className="flex-shrink-0 w-24 h-16 md:w-36 md:h-24 overflow-hidden bg-ink/5">
                      {post.coverImage
                        ? <Image src={urlFor(post.coverImage).width(288).height(192).url()} alt={post.title} width={288} height={192} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                        : <div className="w-full h-full bg-ink/10" />}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <Link href={`/blog/${post.category.slug.current}`} className="text-xs text-accent hover:underline">
                          {post.category.title}
                        </Link>
                        <span className="text-ink/20 text-xs">·</span>
                        <span className="text-xs text-ink/40">{formatDate(post.publishedAt)}</span>
                      </div>
                      <Link href={href}>
                        <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug group-hover:text-accent transition-colors mb-2">
                          {isSearching ? highlight(post.title, debouncedQuery) : post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-ink/50 leading-relaxed line-clamp-2">
                        {isSearching ? highlight(post.excerpt, debouncedQuery) : post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map(tag => (
                            <span key={tag} className={`text-xs border px-2 py-0.5 ${isSearching && tag.toLowerCase().includes(debouncedQuery.toLowerCase()) ? 'border-accent text-accent' : 'border-ink/15 text-ink/40'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
