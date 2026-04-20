import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'
import AuthorBlock from '@/components/AuthorBlock'
import PostCard from '@/components/PostCard'

interface Props { params: { category: string; slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ category, slug }) => ({ category, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title, description: post.excerpt, type: 'article', publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 leading-[1.9] text-ink/75 text-[1.05rem]">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-3xl text-ink mt-14 mb-5 border-t border-ink/10 pt-10">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl text-ink mt-10 mb-4">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l border-accent pl-6 my-10 font-serif text-2xl text-ink/60 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-ink/70">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-ink/70">{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-12 -mx-6 md:-mx-16">
        <Image src={urlFor(value).width(1100).url()} alt={value.alt || ''} width={1100} height={733} className="w-full object-cover" />
        {value.caption && <figcaption className="text-2xs text-ink/35 mt-3 text-center px-6">{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.category._id, params.slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, author: { '@type': 'Person', name: post.author }, datePublished: post.publishedAt, url: `${siteUrl}/blog/${params.category}/${params.slug}`, ...(post.coverImage && { image: urlFor(post.coverImage).width(1200).height(630).url() }) }) }} />

      {post.coverImage && (
        <div className="w-full h-[55vh] md:h-[70vh] overflow-hidden relative bg-ink">
          <Image src={urlFor(post.coverImage).width(1600).height(900).url()} alt={post.title} fill className="object-cover opacity-75" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        </div>
      )}

      <article className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className={`max-w-3xl mx-auto ${post.coverImage ? '-mt-32 relative z-10' : 'pt-14'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/blog/${post.category.slug.current}`} className="text-2xs uppercase tracking-widest text-accent hover:underline">
              {post.category.title}
            </Link>
            <span className="text-ink/20">·</span>
            <span className="text-2xs text-ink/40">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className={`font-serif text-4xl md:text-5xl leading-tight mb-6 ${post.coverImage ? 'text-cream' : 'text-ink'}`}>
            {post.title}
          </h1>

          <p className={`font-serif text-xl italic leading-relaxed mb-0 ${post.coverImage ? 'text-cream/60' : 'text-ink/50'}`}>
            {post.excerpt}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AuthorBlock post={post} />

          <div className="mt-4">
            {post.body
              ? <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
              : <p className="text-ink/30 italic">Story content coming soon.</p>
            }
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-14 pt-6 border-t border-ink/10 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-2xs border border-ink/15 px-3 py-1 text-ink/40 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t-2 border-ink mt-16 bg-cream">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-14">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-2xs uppercase tracking-widest text-ink">More from {post.category.title}</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {related.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
