import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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

export const metadata: Metadata = {
  title: { default: 'The Meridian Folder', template: '%s | The Meridian Folder' },
  description: 'Stories of founders, creators, and everyday achievers from every corner of the globe.',
  openGraph: {
    type: 'website',
    siteName: 'The Meridian Folder',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://meridianfolder.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caslonIonic.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        <Nav />
      </body>
    </html>
  )
}
