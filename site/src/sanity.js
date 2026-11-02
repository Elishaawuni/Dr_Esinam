import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
export const client = projectId && projectId !== "your_project_id"
  ? createClient({projectId, dataset: import.meta.env.VITE_SANITY_DATASET || 'production', apiVersion: '2024-01-01', useCdn: true}) : null
const builder = client ? imageUrlBuilder(client) : null
export const img = (s, w = 800) => (s && builder ? builder.image(s).width(w).auto('format').url() : null)
export const LIST_TYPES = ['researchInterest','research','teaching','employment','qualification','specialization','position','membership','grant','project','publication','award','service','resource','calendarEvent','testimonial','supervision','meeting','event','gallery']
const proj = {resource: '{..., "fileUrl": file.asset->url}'}
const ord = {calendarEvent: 'date asc'}
const q = LIST_TYPES.map(t => `"${t}": *[_type=="${t}"]|order(${ord[t] || 'coalesce(order,999) asc, _createdAt desc'})${proj[t] || ''}`).join(',')
export const QUERY = `{"settings": *[_type=="siteSettings"][0]{..., "cvUrl": cv.asset->url}, ${q},
 "posts": *[_type=="post"]|order(date desc){_id,title,category,date,excerpt,image,body,"slug":slug.current}}`
