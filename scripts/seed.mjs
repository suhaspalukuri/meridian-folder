import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wy7orwba',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skbTpo22EGM2Bazq1BLE6qIfvykFiONWh4bsPLVnLcQoO0ARfkdfGQJ89bJlvabH8x6bhZP8bqcmGFQC0eo64JWPSG2aErsdBOzObS3OfVWJsgsQrQgwJ5tiyerlRXNxfV4gSlUe6jYr26rCLgvnJQ2wgco4fjh9lnktUIkAEuF9uw9ZovFK',
  useCdn: false,
})

function block(key, text, style = 'normal') {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key + 's', text, marks: [] }],
  }
}

const posts = [
  {
    _id: 'post-1',
    _type: 'post',
    title: 'The Man Who Built a Bank From a Street Corner in Lagos',
    slug: { _type: 'slug', current: 'man-who-built-a-bank-lagos' },
    author: 'Emeka Okonkwo',
    authorDesignation: 'Founder, PalmPay Nigeria',
    category: { _type: 'reference', _ref: 'cat-founders' },
    excerpt: 'Emeka Okonkwo had no office, no investors, and no formal banking experience. What he had was a phone, a folding table, and a stubborn belief that Lagos had room for one more fintech story.',
    body: [
      block('b1', 'The intersection of Balogun and Broad Street in Lagos Island is, by any measure, one of the most chaotic financial ecosystems on earth. Money changers, mobile top-up vendors, and loan sharks operate within metres of one another, each occupying invisible turf negotiated over generations. It was here, in 2017, that Emeka Okonkwo set up his first mobile money point on a folding plastic table.'),
      block('b2', '"People thought I was crazy," he says, leaning back in the chair of the Lagos office he now occupies on the 12th floor of a Vic Island tower. "Everyone was telling me the big banks were moving into digital. That there was no space for someone like me. But I knew something they did not — I knew this street."'),
      block('b3', 'What Emeka understood was that Lagos\'s informal economy was not waiting to be disrupted. It was already running, at full speed, on trust and proximity. The fintech giants were building apps for the banked. He was going to build infrastructure for everyone else.'),
      block('b4', 'Starting with fifty thousand naira and a phone', 'h2'),
      block('b5', 'His starting capital was 50,000 naira — roughly $110 at the time. He spent 8,000 on the table. The rest became float for his first transactions. By the end of week one, he had processed 340,000 naira in transfers. By month three, he had hired two agents.'),
      block('b6', 'Today, Emeka\'s network spans 1,400 agents across six Nigerian states. He has processed over 12 billion naira in transactions. He has never taken a venture capital cheque. "The street taught me everything about unit economics before I ever heard the term," he says.'),
    ],
    publishedAt: '2026-04-15T09:00:00Z',
    featured: true,
    tags: ['fintech', 'nigeria', 'bootstrapped', 'africa'],
  },
  {
    _id: 'post-2',
    _type: 'post',
    title: 'She Left Silicon Valley to Grow Coffee in Colombia',
    slug: { _type: 'slug', current: 'left-silicon-valley-grow-coffee-colombia' },
    author: 'Valentina Rios',
    authorDesignation: 'Co-Founder, Finca Altitude Coffee',
    category: { _type: 'reference', _ref: 'cat-founders' },
    excerpt: 'After six years as a product manager at two unicorns, Valentina Rios walked away from her San Francisco life and went back to her grandmother\'s coffee farm in Huila. What she built there surprised everyone, including herself.',
    body: [
      block('c1', 'Valentina Rios has a LinkedIn profile that reads like a tech recruiter\'s dream: Stanford MBA, PM at Stripe, lead product at a Series C health-tech startup. She also has dirt under her fingernails most mornings by 6am, standing in a coffee grove at 1,800 metres above sea level in southern Colombia.'),
      block('c2', '"People in San Francisco thought I was having a breakdown," she laughs. "My manager offered me a sabbatical. My therapist suggested we explore my relationship with achievement. But it wasn\'t a breakdown. I just finally figured out what I actually wanted to build."'),
      block('c3', 'What she wanted to build was a direct-trade coffee business rooted in her family\'s land — land that had been farmed for four generations but had never seen the margins that specialty coffee commands in Western markets.'),
      block('c4', 'The supply chain problem', 'h2'),
      block('c5', 'The fundamental issue was intermediaries. Colombian coffee farmers typically receive 6 to 12 percent of the final retail price of their beans. Valentina used her product background to build a traceability system — a simple web app that lets buyers in Europe and North America track their beans from a specific farm and lot. The transparency commands a premium. Her farmers now receive 38 to 45 percent of retail value.'),
      block('c6', '"Tech taught me how to think about systems," she says. "Farming taught me that systems that don\'t account for soil and weather and human dignity tend to fail eventually. I needed both."'),
    ],
    publishedAt: '2026-04-10T09:00:00Z',
    featured: false,
    tags: ['agriculture', 'colombia', 'supply-chain', 'sustainability'],
  },
  {
    _id: 'post-3',
    _type: 'post',
    title: 'The Animator Who Built a Studio in a Manila Apartment',
    slug: { _type: 'slug', current: 'animator-studio-manila-apartment' },
    author: 'Carlo Mendoza',
    authorDesignation: 'Founder, Tondo Animation Studio',
    category: { _type: 'reference', _ref: 'cat-creators' },
    excerpt: 'Carlo Mendoza started his animation studio in a 28-square-metre apartment in Tondo with one laptop and a secondhand drawing tablet. Three years later, his team of nine has produced work for clients on four continents.',
    body: [
      block('d1', 'The apartment is still there. Carlo has not moved out — he has just rearranged it so efficiently that what was once a living room is now a colour-grading suite, a recording booth (the closet), and a server rack wedged between the kitchen and the bathroom door.'),
      block('d2', '"People think a studio needs a building," he says, adjusting the monitor arm that juts over what used to be a dining table. "A studio is just people who believe in the same thing, working. The building is the last thing you need."'),
      block('d3', 'Carlo started animating at 14, teaching himself on pirated software downloaded from forums that no longer exist. By 22, he was freelancing for overseas clients — mostly explainer video companies in the US and UK who wanted cheap, competent motion graphics.'),
      block('d4', 'Building something original', 'h2'),
      block('d5', 'The shift came when he decided to stop making other people\'s content and start making his own. He pitched a short animated series set in Tondo — gritty, specific, deeply Filipino — to every platform that would listen. Netflix passed. YouTube Originals passed. He released it himself, on YouTube, with no marketing budget.'),
      block('d6', 'The series has 4.2 million views. It led to a licensing deal with a Southeast Asian streaming platform, a commission from a European animation festival, and a roster of clients who specifically want work with that sensibility. "I stopped trying to make what I thought they wanted," he says. "The moment I made what was true to me, they came."'),
    ],
    publishedAt: '2026-04-08T09:00:00Z',
    featured: false,
    tags: ['animation', 'philippines', 'creativity', 'independent'],
  },
  {
    _id: 'post-4',
    _type: 'post',
    title: 'A Retired Teacher Who Became Mumbai\'s Most Followed Food Critic',
    slug: { _type: 'slug', current: 'retired-teacher-mumbai-food-critic' },
    author: 'Meera Nair',
    authorDesignation: 'Food Writer & Critic, Age 67',
    category: { _type: 'reference', _ref: 'cat-everyday-achievers' },
    excerpt: 'Meera Nair spent 34 years teaching secondary school English in Dadar. At 64, she retired and started a food blog because she was bored. She now has 890,000 followers and has turned down three book deals.',
    body: [
      block('e1', 'Meera Nair is very clear about why she started writing about food: "I was going mad," she says, with the directness of someone who spent three decades managing classrooms. "My husband was still working. My children were grown. I had read everything on my bookshelf twice. I needed to do something."'),
      block('e2', 'The something turned out to be a blog called Meera Eats, which she launched in 2023 with a review of a Konkani restaurant in Mahim that had been open since 1971 and had never been written about by anyone with more than 200 followers.'),
      block('e3', '"I have no formal training," she says. "I have never worked in a kitchen. What I have is 67 years of eating in this city, a very good memory, and standards." The standards, it turns out, are what people came for.'),
      block('e4', 'Why she turned down the book deals', 'h2'),
      block('e5', 'Three publishers have approached her. She has turned down all of them. "They want me to write about the restaurants everyone already knows. The Taj, the rooftop bars, the places food journalists have reviewed a hundred times. That is not what I do." What she does is find the places that have been feeding neighbourhoods for decades without anyone paying attention. A 40-year-old Sindhi thali counter in Sion. A family running an Assamese tiffin service out of their flat in Ghatkopar.'),
      block('e6', '"I am not interested in discovery," she says. "I am interested in acknowledgement. These places have always existed. I am just finally writing them down."'),
    ],
    publishedAt: '2026-04-05T09:00:00Z',
    featured: false,
    tags: ['food', 'india', 'mumbai', 'writing', 'later-life'],
  },
  {
    _id: 'post-5',
    _type: 'post',
    title: 'The Carpenter Who Refused to Leave Detroit',
    slug: { _type: 'slug', current: 'carpenter-who-refused-to-leave-detroit' },
    author: 'Marcus Webb',
    authorDesignation: 'Founder, Webb Woodworks & Community Workshop',
    category: { _type: 'reference', _ref: 'cat-everyday-achievers' },
    excerpt: 'When his neighbourhood in Detroit\'s east side was written off by every developer and city planner, Marcus Webb opened a woodworking workshop in a building he bought for $800. He has since trained 340 people and turned down an offer to franchise.',
    body: [
      block('f1', 'The building on Mack Avenue cost Marcus Webb $800 at a city auction in 2014. It had no roof on the back third. The windows were plywood. Three people had told him it was not worth saving. He bought it anyway because it had the highest ceilings he had ever seen in a building that cheap, and because it was two blocks from the house he grew up in.'),
      block('f2', '"People kept telling me Detroit was coming back," he says, running a hand along a workbench he built from salvaged gymnasium flooring. "I didn\'t care about Detroit coming back. I cared about this block. This block didn\'t need to come back. It needed someone to stay."'),
      block('f3', 'Marcus learned carpentry from his grandfather, who had worked the line at a furniture factory that closed in 1987. He spent fifteen years doing residential renovation work across the city before deciding he wanted to build something that stayed put.'),
      block('f4', 'The workshop model', 'h2'),
      block('f5', 'Webb Woodworks operates on a dual model: a production shop that makes custom furniture sold mainly to buyers in Chicago and New York, and a community workshop that runs paid classes and a free apprenticeship track for residents of the surrounding neighbourhoods. Of the 340 people trained since 2015, 61 are now working in skilled trades. Twelve have started their own businesses.'),
      block('f6', '"Someone offered me money to franchise this two years ago," he says. "Open ten more locations, branded, systematised. I told him no." He pauses, picks up a chisel, examines the edge. "Some things don\'t scale. That\'s not a flaw. That\'s the whole point."'),
    ],
    publishedAt: '2026-04-01T09:00:00Z',
    featured: false,
    tags: ['craftsmanship', 'detroit', 'community', 'woodworking', 'usa'],
  },
]

async function seed() {
  console.log('Seeding posts...')
  for (const post of posts) {
    await client.createOrReplace(post)
    console.log(`✓ Created: ${post.title}`)
  }
  console.log('\nDone. All 5 posts seeded.')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
