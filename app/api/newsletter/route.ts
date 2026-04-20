import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!scriptUrl) return NextResponse.json({ error: 'Not configured.' }, { status: 500 })

    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Failed.' }, { status: 500 })
  }
}
