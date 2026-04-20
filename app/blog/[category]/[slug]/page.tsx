import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import StickyImageLayout from '@/components/StickyImageLayout'

export const revalidate = 60

interface Props { params: { category: string; slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ category, slug }) => ({ category, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'
  const canonical = `${siteUrl}/blog/${params.category}/${params.slug}`
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : 'https://res.cloudinary.com/dhbtx0ajy/image/upload/v1776711825/frame-2_rx8t4z.avif'
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: canonical,
      publishedTime: post.publishedAt,
      siteName: 'The Meridian Folder',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
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
      <figure className="my-12">
        <Image src={urlFor(value).width(900).url()} alt={value.alt || ''} width={900} height={600} className="w-full object-cover" />
        {value.caption && <figcaption className="text-xs text-ink/35 mt-3 text-center">{value.caption}</figcaption>}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, datePublished: post.publishedAt, url: `${siteUrl}/blog/${params.category}/${params.slug}`, ...(post.coverImage && { image: urlFor(post.coverImage).width(1200).height(630).url() }) }) }} />

      {/* ── LAYOUT ── */}

      {/* Mobile: stacked */}
      {post.coverImage && (
        <div className="block lg:hidden w-full aspect-[4/3] relative bg-ink overflow-hidden">
          <Image src={urlFor(post.coverImage).width(800).height(600).url()} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Desktop: sticky image + scrolling content */}
      {post.coverImage ? (
        <StickyImageLayout
          imageSrc={urlFor(post.coverImage).width(900).height(675).url()}
          imageAlt={post.title}
        >
          <article className="px-6 lg:pl-14 lg:pr-14 pt-10 pb-24 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Link href={`/blog/${post.category.slug.current}`} className="text-xs uppercase tracking-normal text-accent hover:underline">
                {post.category.title}
              </Link>
              <span className="text-ink/20">·</span>
              <span className="text-xs text-ink/40">{formatDate(post.publishedAt)}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-5">{post.title}</h1>
            <p className="font-serif text-xl italic text-ink/50 leading-relaxed mb-10 pb-10 border-b border-ink/10">{post.excerpt}</p>
            <div>
              {post.body
                ? <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
                : <p className="text-ink/30 italic">Story content coming soon.</p>
              }
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-14 pt-6 border-t border-ink/10 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs border border-ink/15 px-3 py-1 text-ink/40 uppercase">{tag}</span>
                ))}
              </div>
            )}
          </article>
        </StickyImageLayout>
      ) : (
        <article className="px-6 md:px-14 pt-10 pb-24 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/blog/${post.category.slug.current}`} className="text-xs uppercase tracking-normal text-accent hover:underline">
              {post.category.title}
            </Link>
            <span className="text-ink/20">·</span>
            <span className="text-xs text-ink/40">{formatDate(post.publishedAt)}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-5">{post.title}</h1>
          <p className="font-serif text-xl italic text-ink/50 leading-relaxed mb-10 pb-10 border-b border-ink/10">{post.excerpt}</p>
          <div>
            {post.body
              ? <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
              : <p className="text-ink/30 italic">Story content coming soon.</p>
            }
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-14 pt-6 border-t border-ink/10 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs border border-ink/15 px-3 py-1 text-ink/40 uppercase">{tag}</span>
              ))}
            </div>
          )}
        </article>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t-2 border-ink bg-cream">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-14">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs uppercase tracking-normal text-ink">More from {post.category.title}</span>
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
