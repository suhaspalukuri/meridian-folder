import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'storySubmission',
  title: 'Story Submission',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email() }),
    defineField({ name: 'designation', title: 'Role / Designation', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'company', title: 'Company or Background', type: 'string' }),
    defineField({ name: 'yourStory', title: 'Your Story', type: 'text', rows: 6, validation: Rule => Rule.required().min(500) }),
    defineField({ name: 'socialOrWebsite', title: 'Social / Website', type: 'url' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
})
