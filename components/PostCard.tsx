import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const href = `/blog/${post.category.slug.current}/${post.slug.current}`

  return (
    <article className="group flex flex-col">
      <Link href={href} className="block overflow-hidden aspect-[16/9] bg-stone-100 mb-4">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(640).height(360).url()}
            alt={post.title}
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-stone-200" />
        )}
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href={`/blog/${post.category.slug.current}`}
            className="text-xs font-semibold uppercase tracking-widest text-amber-700 hover:text-amber-800"
          >
            {post.category.title}
          </Link>
          <span className="text-xs text-stone-400">{formatDate(post.publishedAt)}</span>
        </div>

        <Link href={href}>
          <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-stone-500 leading-relaxed mb-3 line-clamp-3 flex-1">{post.excerpt}</p>

        <p className="text-xs text-stone-600 font-medium">
          {post.author} · <span className="text-stone-400">{post.authorDesignation}</span>
        </p>
      </div>
    </article>
  )
}
