'use client'

import { useState } from 'react'

interface Props {
  dark?: boolean
}

export default function NewsletterSignup({ dark = false }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={`text-sm ${dark ? 'text-stone-300' : 'text-stone-600'}`}>
        Thank you for subscribing.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className={`flex-1 text-sm px-3 py-2 border outline-none focus:ring-1 ${
          dark
            ? 'bg-stone-800 border-stone-600 text-white placeholder:text-stone-500 focus:ring-stone-400'
            : 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:ring-stone-500'
        }`}
      />
      <button
        type="submit"
        className={`text-sm px-4 py-2 font-medium transition-colors ${
          dark
            ? 'bg-white text-stone-900 hover:bg-stone-200'
            : 'bg-stone-900 text-white hover:bg-stone-700'
        }`}
      >
        Subscribe
      </button>
    </form>
  )
}
