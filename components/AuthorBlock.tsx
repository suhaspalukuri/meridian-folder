import Image from 'next/image'
import { Post } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export default function AuthorBlock({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-4 py-5 border-y border-ink/10 my-8">
      {post.authorPhoto ? (
        <Image
          src={urlFor(post.authorPhoto).width(80).height(80).url()}
          alt={post.author}
          width={80} height={80}
          className="w-12 h-12 rounded-full object-cover grayscale"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center font-serif text-xl text-ink/40 flex-shrink-0">
          {post.author[0]}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-ink">{post.author}</p>
        <p className="text-xs text-ink/40 mt-0.5">{post.authorDesignation}</p>
      </div>
    </div>
  )
}
