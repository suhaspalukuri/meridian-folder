'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

// Note: Metadata can't be exported from a 'use client' component.
// Move metadata to a server wrapper if needed, or handle via layout.

interface FormState {
  name: string
  email: string
  designation: string
  company: string
  yourStory: string
  socialOrWebsite: string
}

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', designation: '', company: '', yourStory: '', socialOrWebsite: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.yourStory.length < 500) {
      setErrorMsg('Your story must be at least 500 characters.')
      return
    }
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-4">Thank you.</h1>
        <p className="text-stone-500 text-lg">We've received your story — we'll be in touch.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">Share Your Story</p>
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-4 leading-tight">
        Got a story worth telling?
      </h1>
      <p className="text-stone-500 mb-12 leading-relaxed">
        Fill in the form below. Our editorial team reads every submission and will reach out if we decide to move forward.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Field label="Your Role / Designation" name="designation" value={form.designation} onChange={handleChange} required placeholder="e.g. Founder, Teacher, Artist" />
        <Field label="Company or Background" name="company" value={form.company} onChange={handleChange} placeholder="Optional" />

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">
            Your Story <span className="font-normal text-stone-400">(minimum 500 characters)</span>
          </label>
          <textarea
            name="yourStory"
            value={form.yourStory}
            onChange={handleChange}
            rows={10}
            required
            minLength={500}
            className="w-full border border-stone-300 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:ring-1 focus:ring-stone-500 resize-none"
            placeholder="Tell us your story in your own words..."
          />
          <p className={`text-xs mt-1 ${form.yourStory.length >= 500 ? 'text-green-600' : 'text-stone-400'}`}>
            {form.yourStory.length} / 500 characters
          </p>
        </div>

        <Field label="Link to work, LinkedIn, or website" name="socialOrWebsite" value={form.socialOrWebsite} onChange={handleChange} placeholder="https:// (optional)" />

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-stone-900 text-white py-4 font-semibold hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Your Story'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label, name, value, onChange, required, type = 'text', placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-stone-300 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:ring-1 focus:ring-stone-500"
      />
    </div>
  )
}
