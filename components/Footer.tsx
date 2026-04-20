import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'

const cols = [
  {
    head: 'Categories',
    links: [
      { label: 'Founders', href: '/blog/founders' },
      { label: 'Creators', href: '/blog/creators' },
      { label: 'Everyday Achievers', href: '/blog/everyday-achievers' },
    ],
  },
  {
    head: 'Platform',
    links: [
      { label: 'All Stories', href: '/blog' },
      { label: 'About', href: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/40 border-t-2 border-cream/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <p className="font-serif text-cream text-3xl mb-3">The Meridian Folder</p>
            <p className="text-sm text-cream/40 leading-relaxed max-w-xs">
              In-depth stories of founders, creators, and everyday achievers from every corner of the globe.
            </p>
          </div>

          {cols.map(col => (
            <div key={col.head}>
              <p className="text-2xs uppercase tracking-[0.2em] text-cream/25 mb-4">{col.head}</p>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-cream/50 hover:text-cream transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-2xs text-cream/25">© {new Date().getFullYear()} The Meridian Folder. All rights reserved.</p>
          <p className="font-serif italic text-cream/20 text-sm">Every remarkable story deserves a platform.</p>
        </div>
      </div>
    </footer>
  )
}
