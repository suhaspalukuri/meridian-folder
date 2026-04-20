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
    <footer className="bg-ink text-cream/40">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-14 pb-28">
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
              <p className="text-2xs uppercase tracking-normal text-cream/25 mb-4">{col.head}</p>
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
          <div className="flex items-center gap-5">
            <a href="mailto:contact@themeridianfolder.site" className="text-2xs text-cream/40 hover:text-cream transition-colors">
              contact@themeridianfolder.site
            </a>
            <a href="https://www.linkedin.com/company/themeridianfolder/" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-cream transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
