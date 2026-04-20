import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'
import AuthorBlock from '@/components/AuthorBlock'
import Breadcrumb from '@/components/Breadcrumb'
import PostCard from '@/components/PostCard'

interface Props {
  params: { category: string; slug: string }
}

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
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 leading-relaxed text-stone-700">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-2xl font-bold text-stone-900 mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-xl font-bold text-stone-900 mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-400 pl-6 py-1 my-8 italic text-stone-600 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-5 text-stone-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-5 text-stone-700">{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt || ''}
          width={900}
          height={600}
          className="w-full object-cover"
        />
        {value.caption && (
          <figcaption className="text-xs text-stone-400 mt-2 text-center">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.category._id, params.slug)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'
  const canonicalUrl = `${siteUrl}/blog/${params.category}/${params.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorDesignation },
    datePublished: post.publishedAt,
    url: canonicalUrl,
    ...(post.coverImage && { image: urlFor(post.coverImage).width(1200).height(630).url() }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <link rel="canonical" href={canonicalUrl} />

      <article>
        {/* Cover image */}
        {post.coverImage && (
          <div className="w-full aspect-[21/9] overflow-hidden bg-stone-200">
            <Image
              src={urlFor(post.coverImage).width(1400).height(600).url()}
              alt={post.title}
              width={1400}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 py-14">
          <Breadcrumb crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Stories', href: '/blog' },
            { label: post.category.title, href: `/blog/${post.category.slug.current}` },
            { label: post.title },
          ]} />

          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/blog/${post.category.slug.current}`}
              className="text-xs font-semibold uppercase tracking-widest text-amber-700 hover:text-amber-900"
            >
              {post.category.title}
            </Link>
            <span className="text-xs text-stone-400">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-8">
            {post.title}
          </h1>

          <AuthorBlock post={post} />

          {/* Body */}
          <div className="mt-10">
            {post.body ? (
              <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
            ) : (
              <p className="text-stone-400 italic">Story content coming soon.</p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs border border-stone-200 px-3 py-1 text-stone-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section className="border-t border-stone-200 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-10">More from {post.category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
