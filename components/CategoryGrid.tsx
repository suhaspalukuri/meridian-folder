import Link from 'next/link'
import { Category } from '@/lib/queries'

interface Props {
  categories: Category[]
}

export default function CategoryGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map(cat => (
        <div key={cat._id} className="border border-stone-200 p-8 hover:border-stone-400 transition-colors">
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{cat.title}</h3>
          {cat.description && (
            <p className="text-sm text-stone-500 leading-relaxed mb-4">{cat.description}</p>
          )}
          <p className="text-xs text-stone-400 mb-4">{cat.postCount ?? 0} stories</p>
          <Link
            href={`/blog/${cat.slug.current}`}
            className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
          >
            Explore →
          </Link>
        </div>
      ))}
    </div>
  )
}
