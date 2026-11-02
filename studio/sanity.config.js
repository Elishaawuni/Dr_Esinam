import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default', title: 'Dr. Pufaa – Website Manager',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID, dataset: 'production',
  plugins: [structureTool({structure: S => S.list().title('Website Content').items([
    S.listItem().title('Profile & Site Settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.divider(),
    ...S.documentTypeListItems().filter(i => i.getId() !== 'siteSettings')])}), visionTool()],
  schema: {types: schemaTypes},
  document: {actions: (prev, {schemaType}) => schemaType === 'siteSettings' ? prev.filter(a => !['duplicate', 'delete'].includes(a.action)) : prev},
})
