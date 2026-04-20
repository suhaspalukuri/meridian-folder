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
    <nav className="flex items-center gap-2 text-[11px] text-stone-500 mb-5 uppercase tracking-normal">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-stone-700">›</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-stone-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-stone-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
