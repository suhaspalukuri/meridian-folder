'use client'

import { useState, useEffect } from 'react'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (sessionStorage.getItem('popup_dismissed')) return
    const t = setTimeout(() => setVisible(true), 15000)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem('popup_dismissed', '1')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('success')
      setEmail('')
      setTimeout(dismiss, 2000)
    } catch {
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-paper max-w-md w-full p-10 shadow-2xl">
        <button onClick={dismiss} className="absolute top-4 right-5 text-ink/30 hover:text-ink transition-colors text-xl leading-none">×</button>

        <p className="text-2xs uppercase tracking-normal text-accent mb-4">Dispatch</p>
        <h2 className="font-serif text-3xl text-ink leading-tight mb-3">Stories worth reading.</h2>
        <p className="text-sm text-ink/50 leading-relaxed mb-7">
          One email when something worth reading is published. No noise, no schedule, no spam.
        </p>

        {status === 'success' ? (
          <p className="text-sm text-ink/50">You're in. We'll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border-b border-ink/20 text-ink placeholder:text-ink/30 focus:border-ink pb-2 text-sm outline-none transition-colors"
            />
            <button
              type="submit"
              className="text-2xs uppercase tracking-normal border border-ink text-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
        {status === 'error' && <p className="text-xs text-red-500 mt-2">Something went wrong. Try again.</p>}

        <p className="text-2xs text-ink/25 mt-5 uppercase tracking-normal">Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
