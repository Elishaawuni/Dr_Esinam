// Generates seed/seed.ndjson from the CV-based sample content so the lecturer starts with editable content in Sanity.
import FB from '../../site/src/fallback.js'
import fs from 'fs'
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
const k = (a) => a.map((x, i) => ({_key: 'k' + i, ...x}))
const out = []
const {bio, stats, socials, ...rest} = FB.settings
out.push({_id: 'siteSettings', _type: 'siteSettings', ...rest,
  bio: bio.map((t, i) => ({_type: 'block', _key: 'b' + i, style: 'normal', markDefs: [], children: [{_type: 'span', _key: 's' + i, text: t, marks: []}]})),
  stats: k(stats), socials: k(socials)})
for (const [type, items] of Object.entries(FB)) {
  if (type === 'settings' || type === 'posts') continue
  items.forEach((it, i) => {
    const {_id, ...r} = it
    out.push({_id: type + '-' + slug(_id) + '-' + i, _type: type, ...r, ...(type === 'calendarEvent' ? {} : {order: i + 1})})
  })
}
fs.writeFileSync(new URL('../seed/seed.ndjson', import.meta.url), out.map(o => JSON.stringify(o)).join('\n'))
console.log(out.length + ' documents written')
