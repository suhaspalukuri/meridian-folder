import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
}

export default function FeaturedPost({ post }: Props) {
  const href = `/blog/${post.category.slug.current}/${post.slug.current}`

  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-200">
      <Link href={href} className="block overflow-hidden aspect-[4/3] lg:aspect-auto bg-stone-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={900}
            height={700}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className="w-full h-full bg-stone-200" />
        )}
      </Link>

      <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 border border-amber-300 px-2 py-0.5">
            Featured
          </span>
          <Link
            href={`/blog/${post.category.slug.current}`}
            className="text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-stone-700"
          >
            {post.category.title}
          </Link>
        </div>

        <Link href={href}>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-4 hover:text-amber-800 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-stone-500 leading-relaxed mb-6">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-800">{post.author}</p>
            <p className="text-xs text-stone-400">{post.authorDesignation} · {formatDate(post.publishedAt)}</p>
          </div>
          <Link
            href={href}
            className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
          >
            Read Story →
          </Link>
        </div>
      </div>
    </article>
  )
}
