const f = (name, title, type = 'string', extra = {}) => ({name, title, type, ...extra})
const photo = (name = 'image', title = 'Picture (optional)') => f(name, title, 'image', {options: {hotspot: true}, fields: [f('alt', 'Alt text (describes the picture)')]})

// Every list-type shares the same friendly fields, so the lecturer learns one form.
const list = (name, title, hints = {}, extra = [], hide = []) => ({
  name, title, type: 'document',
  fields: [
    f('title', hints.title || 'Title', 'string', {validation: R => R.required()}),
    ...(hide.includes('org') ? [] : [f('org', hints.org || 'Organisation / Place / Venue')]),
    ...(hide.includes('period') ? [] : [f('period', hints.period || 'Year or Period (e.g. 2021 – Present)')]),
    ...(hide.includes('description') ? [] : [f('description', 'Description', 'text', {rows: 3})]),
    f('link', hints.link || 'Link (optional, e.g. DOI, website or meeting join link)', 'url'),
    ...(hide.includes('image') ? [] : [photo()]),
    ...extra,
    f('order', 'Display order (1 shows first; leave blank to add at the end)', 'number'),
  ],
  preview: {select: {title: 'title', subtitle: 'period', media: 'image'}},
})
const status = opts => f('status', 'Status', 'string', {options: {list: opts}})
const tags = ['image', 'org', 'period', 'description']

const siteSettings = {
  name: 'siteSettings', title: 'Profile & Site Settings', type: 'document',
  fields: [
    f('name', 'Full name (with title)', 'string', {validation: R => R.required()}),
    f('headline', 'Headline (e.g. Gender & Social Development Specialist)'),
    f('role', 'Current position line'),
    f('tagline', 'Short tagline shown on the home page', 'text', {rows: 2}),
    photo('photo', 'Profile picture'),
    f('bio', 'About / Biography', 'array', {of: [{type: 'block'}]}),
    f('stats', 'Highlight numbers on home page', 'array', {of: [{type: 'object', fields: [f('value', 'Number (e.g. 20+)'), f('label', 'Label')], preview: {select: {title: 'value', subtitle: 'label'}}}]}),
    f('email', 'Public email'), f('phone', 'Phone'), f('location', 'Location'),
    f('availability', 'Availability message (shown above contact form)', 'text', {rows: 2}),
    f('cv', 'CV (upload PDF – replaces the old one)', 'file', {options: {accept: '.pdf'}}),
    f('bookingUrl', 'Online booking link (optional: Calendly, Cal.com, Google Calendar appointment page)', 'url'),
    f('seoTitle', 'SEO: page title shown in Google & browser tab'),
    f('seoDescription', 'SEO: description shown in Google results (max ~160 characters)', 'text', {rows: 2, validation: R => R.max(200)}),
    f('socials', 'Academic & social profile links (ORCID, Google Scholar, ResearchGate, Academia.edu, LinkedIn…)', 'array', {of: [{type: 'object', fields: [f('label', 'Label'), f('url', 'URL', 'url')], preview: {select: {title: 'label', subtitle: 'url'}}}]}),
  ],
}

const post = {
  name: 'post', title: 'Blog, Updates & Insights', type: 'document',
  fields: [
    f('title', 'Title', 'string', {validation: R => R.required()}),
    f('slug', 'Slug (click Generate)', 'slug', {options: {source: 'title'}}),
    f('category', 'Type', 'string', {initialValue: 'blog', options: {list: ['blog', 'update', 'insight'], layout: 'radio'}}),
    f('date', 'Date', 'date', {initialValue: () => new Date().toISOString().slice(0, 10)}),
    f('excerpt', 'Short summary', 'text', {rows: 3}),
    photo('image', 'Cover picture'),
    f('body', 'Content (you can add pictures anywhere)', 'array', {of: [{type: 'block'}, photo('image', 'Picture')]}),
  ],
  orderings: [{title: 'Newest first', name: 'd', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
}

export const schemaTypes = [
  siteSettings, post,
  list('research', 'Research Works', {org: 'Study site / Journal / Collaborators'}),
  list('researchInterest', 'Research Interests', {}, [], tags),
  list('publication', 'Publications', {title: 'Title of publication', org: 'Journal / Publisher (with volume, pages)', period: 'Year'}, [f('authors', 'Authors')]),
  list('teaching', 'Teaching Experience', {title: 'Role / Course', org: 'Institution'}),
  list('specialization', 'Areas of Specialization', {}, [], tags),
  list('employment', 'Employment History', {title: 'Job title', org: 'Employer'}),
  list('qualification', 'Qualifications', {title: 'Qualification', org: 'Institution'}),
  list('position', 'Positions Held', {title: 'Position', org: 'Organisation'}),
  list('membership', 'Professional Memberships', {title: 'Association'}, [], tags),
  list('grant', 'Grants (Ongoing & Awarded)', {title: 'Grant / Project title', org: 'Funder'}, [status(['Ongoing', 'Awarded', 'Completed'])]),
  list('project', 'Projects', {org: 'Partner / Funder'}, [status(['Ongoing', 'Completed'])]),
  list('award', 'Awards & Honours', {title: 'Award', org: 'Awarding body'}),
  list('service', 'Consultancy & Speaking Services', {title: 'Service', org: 'Audience / Topic'}),
  list('resource', 'Resources & Downloads', {title: 'Title', org: 'Type (Article, Lecture Notes, Policy Brief, Template…)', period: 'Year'},
    [f('file', 'Upload file (PDF, Word, PowerPoint…)', 'file')]),
  {name: 'calendarEvent', title: 'Events Calendar', type: 'document', fields: [
    f('title', 'Event title', 'string', {validation: R => R.required()}),
    f('eventType', 'Type', 'string', {options: {list: ['Public Lecture', 'Workshop', 'Webinar', 'Conference', 'Training', 'Class', 'Other']}}),
    f('date', 'Start date & time', 'datetime', {validation: R => R.required()}),
    f('endDate', 'End date & time (optional)', 'datetime'),
    f('venue', 'Venue / Platform'), f('isVirtual', 'This is an online event', 'boolean', {initialValue: false}),
    f('description', 'Description', 'text', {rows: 3}), f('link', 'Registration or join link (optional)', 'url'), photo('image', 'Poster / picture (optional)')],
    preview: {select: {title: 'title', subtitle: 'date', media: 'image'}}, orderings: [{title: 'Date', name: 'd', by: [{field: 'date', direction: 'asc'}]}]},
  list('testimonial', 'Testimonials', {title: 'Name of person', org: 'Their role / institution'}, [], ['period']),
  list('supervision', 'Students & Supervision', {title: 'Student / Topic / Programme', org: 'Level & Institution (e.g. MPhil, UEW)', period: 'Year or Period'}, [status(['Ongoing', 'Completed'])]),
  list('meeting', 'Virtual Meetings & Office Hours', {title: 'Meeting name (e.g. Weekly student clinic)', org: 'Platform (Zoom, Google Meet, Teams)', period: 'Schedule (e.g. Tuesdays 4–5pm GMT)'}, [], ['image']),
  list('event', 'Conferences, Workshops & Training', {title: 'Event'}),
  list('gallery', 'Photo Gallery', {title: 'Caption'}, [], ['org', 'period', 'description']),
]
