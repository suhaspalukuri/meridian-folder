import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-3">The Meridian Folder</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              Stories of founders, creators, and everyday achievers from every corner of the globe.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'All Stories', href: '/blog' },
                { label: 'Founders', href: '/blog/founders' },
                { label: 'Creators', href: '/blog/creators' },
                { label: 'Everyday Achievers', href: '/blog/everyday-achievers' },
                { label: 'About', href: '/about' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Stay in the loop</h4>
            <NewsletterSignup dark />
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Meridian Folder. All rights reserved.</p>
          <Link href="/submit" className="hover:text-white transition-colors">
            Submit Your Story →
          </Link>
        </div>
      </div>
    </footer>
  )
}
