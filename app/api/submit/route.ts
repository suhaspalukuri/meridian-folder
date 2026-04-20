import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, designation, company, yourStory, socialOrWebsite } = body

    if (!name || !email || !designation || !yourStory) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }
    if (yourStory.length < 500) {
      return NextResponse.json({ error: 'Story must be at least 500 characters.' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'storySubmission',
      name,
      email,
      designation,
      company: company || undefined,
      yourStory,
      socialOrWebsite: socialOrWebsite || undefined,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Story submission error:', err)
    return NextResponse.json({ error: 'Submission failed.' }, { status: 500 })
  }
}
