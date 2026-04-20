import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'meridian-folder',
  title: 'The Meridian Folder',
  projectId: 'wy7orwba',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
