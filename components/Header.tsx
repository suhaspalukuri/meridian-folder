'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Stories', href: '/blog' },
  { label: 'Founders', href: '/blog/founders' },
  { label: 'Creators', href: '/blog/creators' },
  { label: 'Everyday Achievers', href: '/blog/everyday-achievers' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-stone-900 tracking-tight">
          The Meridian Folder
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/submit"
            className="text-sm bg-stone-900 text-white px-5 py-2.5 font-medium hover:bg-stone-700 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>

        <button
          className="lg:hidden text-stone-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-700 hover:text-stone-900 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="text-sm bg-stone-900 text-white px-5 py-2.5 font-medium text-center hover:bg-stone-700 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Submit Your Story
          </Link>
        </div>
      )}
    </header>
  )
}
