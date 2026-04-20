import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
  variant?: 'default' | 'horizontal' | 'minimal'
}

export default function PostCard({ post, variant = 'default' }: Props) {
  const href = `/blog/${post.category.slug.current}/${post.slug.current}`

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-5 py-5 border-b border-ink/10 last:border-0">
        <Link href={href} className="flex-shrink-0 w-24 h-16 overflow-hidden bg-ink/5">
          {post.coverImage
            ? <Image src={urlFor(post.coverImage).width(240).height(160).url()} alt={post.title} width={240} height={160} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
            : <div className="w-full h-full bg-ink/10" />}
        </Link>
        <div className="min-w-0">
          <Link href={`/blog/${post.category.slug.current}`} className="text-2xs uppercase tracking-widest text-accent">{post.category.title}</Link>
          <Link href={href}><h3 className="font-serif text-base text-ink leading-snug mt-0.5 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3></Link>
          <p className="text-2xs text-ink/40 mt-1">{post.author} · {formatDate(post.publishedAt)}</p>
        </div>
      </article>
    )
  }

  if (variant === 'minimal') {
    return (
      <article className="group py-4 border-b border-ink/10 last:border-0">
        <Link href={`/blog/${post.category.slug.current}`} className="text-2xs uppercase tracking-widest text-accent">{post.category.title}</Link>
        <Link href={href}><h3 className="font-serif text-lg text-ink leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3></Link>
        <p className="text-2xs text-ink/40 mt-1">{post.author} · {formatDate(post.publishedAt)}</p>
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={href} className="block overflow-hidden aspect-[3/2] bg-ink/5 mb-4">
        {post.coverImage
          ? <Image src={urlFor(post.coverImage).width(720).height(480).url()} alt={post.title} width={720} height={480} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
          : <div className="w-full h-full bg-ink/10" />}
      </Link>
      <Link href={`/blog/${post.category.slug.current}`} className="text-2xs uppercase tracking-widest text-accent hover:underline">
        {post.category.title}
      </Link>
      <Link href={href}>
        <h3 className="font-serif text-xl text-ink leading-snug mt-1.5 mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
      </Link>
      <p className="text-sm text-ink/55 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
      <p className="text-2xs text-ink/40">{post.author} · {post.authorDesignation} · {formatDate(post.publishedAt)}</p>
    </article>
  )
}
