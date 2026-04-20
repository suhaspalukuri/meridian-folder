import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
}

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav className="flex items-center gap-2 text-xs text-stone-400 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>›</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-stone-700 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-stone-600">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
