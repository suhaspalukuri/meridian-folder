import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'author', title: 'Author Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'authorDesignation', title: 'Author Designation', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'authorPhoto', title: 'Author Photo URL', type: 'url' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: Rule => Rule.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image URL (Cloudinary)', type: 'url', validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: Rule => Rule.required().max(200) }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: Rule => Rule.required() }),
    defineField({ name: 'featured', title: 'Featured Story', type: 'boolean', initialValue: false }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
  ],
  preview: {
    select: { title: 'title', author: 'author' },
    prepare({ title, author }) {
      return { title, subtitle: author }
    },
  },
})
