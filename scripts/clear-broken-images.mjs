import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var')
  process.exit(1)
}
if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN env var')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: TOKEN,
})

// Fetch all posts where coverImage or authorPhoto is a string (broken Cloudinary URL)
const posts = await client.fetch(`*[_type == "post"]{_id, title, coverImage, authorPhoto}`)

let fixed = 0

for (const post of posts) {
  const patch = client.patch(post._id)
  let dirty = false

  // coverImage stored as a string instead of an image object
  if (typeof post.coverImage === 'string') {
    console.log(`Clearing coverImage on: "${post.title}" (${post._id})`)
    patch.unset(['coverImage'])
    dirty = true
  }

  // authorPhoto stored as a string instead of an image object
  if (typeof post.authorPhoto === 'string') {
    console.log(`Clearing authorPhoto on: "${post.title}" (${post._id})`)
    patch.unset(['authorPhoto'])
    dirty = true
  }

  if (dirty) {
    await patch.commit()
    fixed++
  }
}

if (fixed === 0) {
  console.log('No broken image fields found.')
} else {
  console.log(`\nDone. Cleared broken image fields on ${fixed} post(s).`)
}
