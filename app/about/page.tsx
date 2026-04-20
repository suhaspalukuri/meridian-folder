import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'What The Meridian Folder is and why it exists.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b-2 border-ink px-6 md:px-12 pt-10 pb-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-2xs uppercase tracking-widest text-accent mb-3">About</p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
              Stories from every<br />corner of the globe.
            </h1>
          </div>
          <p className="text-ink/50 text-lg leading-relaxed">
            An independent editorial platform publishing in-depth stories about remarkable people — founders, creators, educators, artists, and everyday achievers.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2 space-y-6 text-ink/70 leading-relaxed text-[1.05rem]">
            <p>
              <span className="font-serif text-ink text-xl">The Meridian Folder</span> exists because remarkable lives are not the exclusive domain of the famous or the well-funded. Every corner of the world has people building something, making something, enduring something. We go looking for those stories.
            </p>
            <p>
              Each piece we publish is long-form, reported, and carefully edited. We ask hard questions. We sit with complexity. We don't reduce a person's life to a listicle or a brand pitch.
            </p>
            <p>
              Fame is not a prerequisite. A story worth telling is.
            </p>
          </div>

          <aside className="space-y-0 divide-y divide-ink/10">
            <p className="text-2xs uppercase tracking-widest text-ink/30 pb-4">Who we cover</p>
            {[
              { label: 'Founders', desc: 'Entrepreneurs in places the press rarely looks.' },
              { label: 'Creators', desc: 'Artists and makers who define their own path.' },
              { label: 'Everyday Achievers', desc: 'Remarkable lives outside the spotlight.' },
            ].map(item => (
              <div key={item.label} className="py-4">
                <p className="font-serif text-ink text-lg">{item.label}</p>
                <p className="text-sm text-ink/45 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
