import Image from 'next/image'
import { Post } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

interface Props {
  post: Post
}

export default function AuthorBlock({ post }: Props) {
  return (
    <div className="flex items-center gap-4 py-6 border-t border-b border-stone-200">
      {post.authorPhoto ? (
        <Image
          src={urlFor(post.authorPhoto).width(80).height(80).url()}
          alt={post.author}
          width={80}
          height={80}
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-serif text-xl">
          {post.author[0]}
        </div>
      )}
      <div>
        <p className="font-semibold text-stone-900">{post.author}</p>
        <p className="text-sm text-stone-500">{post.authorDesignation}</p>
      </div>
    </div>
  )
}
