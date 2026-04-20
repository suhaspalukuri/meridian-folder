import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedPost, getLatestPosts } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/utils'
import NewsletterSignup from '@/components/NewsletterSignup'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'The Meridian Folder',
  description: 'In-depth stories of founders, creators, and everyday achievers from every corner of the globe.',
}

export default async function HomePage() {
  const featured = await getFeaturedPost()
  const latest = await getLatestPosts(7, featured?._id)

  const lead = latest[0] ?? null
  const secondary = latest.slice(1, 3)
  const grid = latest.slice(3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'The Meridian Folder', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com' }) }} />

      {/* ── MASTHEAD ── */}
      <header className="pt-12 pb-6 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          {/* Wordmark */}
          <div className="text-center py-6">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-ink leading-none">
              The Meridian Folder
            </h1>
            <p className="text-2xs uppercase text-ink/40 mt-4 tracking-normal">
              Stories of founders · creators · everyday achievers
            </p>
          </div>

          {/* Issue line */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink/10">
            <span className="text-2xs text-ink/30">Vol. I</span>
            <Link href="/blog" className="text-2xs uppercase text-accent hover:underline tracking-normal">
              All Stories →
            </Link>
          </div>
        </div>
      </header>

      {/* ── FEATURED HERO ── */}
      {featured && (
        <section className="border-y border-ink/10">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Image */}
              <Link
                href={`/blog/${featured.category.slug.current}/${featured.slug.current}`}
                className="lg:col-span-3 block relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-ink/5 border-r border-ink/10"
              >
                {featured.coverImage ? (
                  <Image
                    src={urlFor(featured.coverImage).width(1100).height(800).url()}
                    alt={featured.title}
                    fill
                    className="object-cover hover:scale-[1.02] transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-ink/10" />
                )}
              </Link>

              {/* Text */}
              <div className="lg:col-span-2 flex flex-col justify-between p-8 lg:p-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xs uppercase text-accent tracking-normal">Featured</span>
                    <span className="text-ink/20">·</span>
                    <Link
                      href={`/blog/${featured.category.slug.current}`}
                      className="text-2xs uppercase text-ink/40 tracking-normal hover:text-ink transition-colors"
                    >
                      {featured.category.title}
                    </Link>
                  </div>
                  <Link href={`/blog/${featured.category.slug.current}/${featured.slug.current}`}>
                    <h2 className="font-serif text-3xl lg:text-4xl text-ink leading-tight mb-5 hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">{featured.author}</p>
                    <p className="text-2xs text-ink/40 mt-0.5">{featured.authorDesignation}</p>
                  </div>
                  <Link
                    href={`/blog/${featured.category.slug.current}/${featured.slug.current}`}
                    className="text-2xs uppercase tracking-normal text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── EDITORIAL GRID ── */}
      {(lead || secondary.length > 0) && (
        <section className="border-b border-ink/10">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 py-4 border-b border-ink/10">
              <span className="text-2xs uppercase tracking-normal text-ink font-medium">Latest</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-9 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
              {lead && (
                <article className="lg:col-span-5 py-8 pr-0 lg:pr-10 group">
                  <Link href={`/blog/${lead.category.slug.current}/${lead.slug.current}`} className="block aspect-[16/10] overflow-hidden bg-ink/5 mb-6">
                    {lead.coverImage ? (
                      <Image src={urlFor(lead.coverImage).width(800).height(500).url()} alt={lead.title} width={800} height={500} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                    ) : <div className="w-full h-full bg-ink/10" />}
                  </Link>
                  <CategoryLabel category={lead.category.title} slug={lead.category.slug.current} />
                  <Link href={`/blog/${lead.category.slug.current}/${lead.slug.current}`}>
                    <h3 className="font-serif text-2xl lg:text-3xl text-ink leading-tight mt-2 mb-3 group-hover:text-accent transition-colors">{lead.title}</h3>
                  </Link>
                  <p className="text-sm text-ink/55 leading-relaxed line-clamp-3 mb-4">{lead.excerpt}</p>
                  <Byline author={lead.author} designation={lead.authorDesignation} date={lead.publishedAt} />
                </article>
              )}

              {secondary.length > 0 && (
                <div className="lg:col-span-4 flex flex-col divide-y divide-ink/10">
                  {secondary.map(post => (
                    <article key={post._id} className="py-8 px-0 lg:px-8 group flex gap-5">
                      <Link href={`/blog/${post.category.slug.current}/${post.slug.current}`} className="flex-shrink-0 w-28 h-20 overflow-hidden bg-ink/5">
                        {post.coverImage ? (
                          <Image src={urlFor(post.coverImage).width(280).height(200).url()} alt={post.title} width={280} height={200} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                        ) : <div className="w-full h-full bg-ink/10" />}
                      </Link>
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <CategoryLabel category={post.category.title} slug={post.category.slug.current} />
                          <Link href={`/blog/${post.category.slug.current}/${post.slug.current}`}>
                            <h3 className="font-serif text-base text-ink leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                          </Link>
                        </div>
                        <p className="text-xs text-ink/40 mt-2">{post.author} · {formatDate(post.publishedAt)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── LOWER GRID ── */}
      {grid.length > 0 && (
        <section className="border-b border-ink/10">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ink/10">
              {grid.map(post => (
                <article key={post._id} className="group px-0 sm:px-6 first:pl-0 last:pr-0 py-6 sm:py-0">
                  <Link href={`/blog/${post.category.slug.current}/${post.slug.current}`} className="block aspect-[4/3] overflow-hidden bg-ink/5 mb-4">
                    {post.coverImage ? (
                      <Image src={urlFor(post.coverImage).width(500).height(375).url()} alt={post.title} width={500} height={375} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                    ) : <div className="w-full h-full bg-ink/10" />}
                  </Link>
                  <CategoryLabel category={post.category.title} slug={post.category.slug.current} />
                  <Link href={`/blog/${post.category.slug.current}/${post.slug.current}`}>
                    <h3 className="font-serif text-lg text-ink leading-snug mt-1.5 mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-xs text-ink/40">{post.author} · {formatDate(post.publishedAt)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DISPATCH / NEWSLETTER ── */}
      <section className="bg-ink">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-2xs uppercase tracking-normal text-accent mb-5">Dispatch</p>
              <h2 className="font-serif text-5xl md:text-6xl text-cream leading-[1.05] mb-4">
                Stories worth<br />reading.
              </h2>
              <p className="text-cream/35 text-sm leading-relaxed max-w-xs">
                One email when something worth reading is published. No noise, no schedule, no spam.
              </p>
            </div>
            <div className="border-l border-cream/10 pl-16">
              <NewsletterSignup dark />
              <p className="text-2xs text-cream/20 mt-5 uppercase tracking-normal">Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CategoryLabel({ category, slug }: { category: string; slug: string }) {
  return (
    <Link href={`/blog/${slug}`} className="text-2xs uppercase tracking-normal text-accent hover:underline">
      {category}
    </Link>
  )
}

function Byline({ author, designation, date }: { author: string; designation: string; date: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-ink/40">
      <span>{author}</span>
      <span className="text-ink/20">·</span>
      <span>{designation}</span>
      <span className="text-ink/20">·</span>
      <span>{formatDate(date)}</span>
    </div>
  )
}
