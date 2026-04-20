'use client'

import { useState } from 'react'

export default function NewsletterSignup({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      setStatus('success')
      setEmail('')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return <p className={`text-sm ${dark ? 'text-cream/50' : 'text-ink/50'}`}>You're in. We'll be in touch.</p>
  }

  const inputCls = dark
    ? 'bg-transparent border-b border-cream/20 text-cream placeholder:text-cream/25 focus:border-cream/60'
    : 'bg-transparent border-b border-ink/20 text-ink placeholder:text-ink/30 focus:border-ink'

  const btnCls = dark
    ? 'border border-cream/20 text-cream hover:bg-cream hover:text-ink'
    : 'border border-ink text-ink hover:bg-ink hover:text-cream'

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className={`flex-1 bg-transparent pb-2 text-sm outline-none transition-colors ${inputCls}`}
      />
      <button type="submit" className={`text-2xs uppercase tracking-widest px-4 py-2 transition-colors flex-shrink-0 ${btnCls}`}>
        Subscribe
      </button>
    </form>
  )
}
