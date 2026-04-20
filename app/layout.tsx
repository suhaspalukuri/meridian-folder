import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterPopup from '@/components/NewsletterPopup'

const caslonIonic = localFont({
  src: [
    { path: './fonts/CaslonIonicRounded-Regular-Trial.otf', weight: '400', style: 'normal' },
    { path: './fonts/CaslonIonicRounded-RegularItalic-Trial.otf', weight: '400', style: 'italic' },
  ],
  variable: '--font-caslon',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'
const OG_IMAGE = 'https://res.cloudinary.com/dhbtx0ajy/image/upload/v1776711825/frame-2_rx8t4z.avif'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: 'The Meridian Folder', template: '%s | The Meridian Folder' },
  description: 'In-depth stories of founders, creators, and everyday achievers from every corner of the globe.',
  keywords: ['founders', 'creators', 'storytelling', 'entrepreneurs', 'long-form journalism', 'everyday achievers'],
  authors: [{ name: 'The Meridian Folder', url: BASE }],
  creator: 'The Meridian Folder',
  publisher: 'The Meridian Folder',
  category: 'journalism',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  openGraph: {
    type: 'website',
    siteName: 'The Meridian Folder',
    title: 'The Meridian Folder',
    description: 'In-depth stories of founders, creators, and everyday achievers from every corner of the globe.',
    url: BASE,
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'The Meridian Folder' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@meridianfolder',
    creator: '@meridianfolder',
    title: 'The Meridian Folder',
    description: 'In-depth stories of founders, creators, and everyday achievers from every corner of the globe.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: BASE },
  icons: {
    icon: 'https://res.cloudinary.com/dhbtx0ajy/image/upload/v1776711825/instagram-post-4_ia1gdd.avif',
    apple: 'https://res.cloudinary.com/dhbtx0ajy/image/upload/v1776711825/instagram-post-4_ia1gdd.avif',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caslonIonic.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        <Nav />
        <NewsletterPopup />
      </body>
    </html>
  )
}
