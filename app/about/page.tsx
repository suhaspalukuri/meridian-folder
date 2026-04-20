import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'What The Meridian Folder is and why it exists.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">About</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">
        Stories from every corner of the globe.
      </h1>

      <div className="prose prose-stone prose-lg max-w-none space-y-6 text-stone-700 leading-relaxed">
        <p>
          <strong>The Meridian Folder</strong> is an independent editorial platform dedicated to one purpose: publishing in-depth stories about remarkable people. Founders, creators, educators, artists, street vendors, first-generation immigrants — anyone with a story that deserves to be told.
        </p>
        <p>
          We believe that remarkable lives are not the exclusive domain of the famous or the well-funded. Every corner of the world has people building something, making something, enduring something. We go looking for those stories.
        </p>
        <p>
          Each piece we publish is long-form, reported, and carefully edited. We ask hard questions. We sit with complexity. We don't reduce a person's life to a listicle or a brand pitch.
        </p>

        <h2 className="font-serif text-2xl font-bold text-stone-900 mt-12">Who gets featured</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Founders</strong> — entrepreneurs building companies in places the tech press rarely looks.</li>
          <li><strong>Creators</strong> — artists, writers, designers, and makers who define their own path.</li>
          <li><strong>Everyday Achievers</strong> — people doing remarkable things outside the conventional spotlight.</li>
        </ul>
        <p>Fame is not a prerequisite. A story worth telling is.</p>

        <h2 className="font-serif text-2xl font-bold text-stone-900 mt-12">How to get featured</h2>
        <p>
          We accept story pitches from the public. If you have a story worth sharing — yours or someone you know — we want to hear it. Fill in the form and our editorial team will review it.
        </p>
        <div className="mt-6">
          <Link
            href="/submit"
            className="inline-block bg-stone-900 text-white px-7 py-3.5 font-semibold hover:bg-stone-700 transition-colors"
          >
            Submit Your Story
          </Link>
        </div>
      </div>
    </div>
  )
}
