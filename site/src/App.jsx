import {useEffect, useState} from 'react'
import {PortableText} from '@portabletext/react'
import {client, img, QUERY} from './sanity.js'
import FB from './fallback.js'

// variant: tags | cards | timeline | list | gallery
const SECTIONS = [
  {id: 'research', nav: 'Research', title: 'Research Works', type: 'research', v: 'cards'},
  {id: 'interests', title: 'Research Interests', type: 'researchInterest', v: 'tags', nonav: 1},
  {id: 'publications', nav: 'Publications', title: 'Publications', type: 'publication', v: 'list'},
  {id: 'teaching', nav: 'Teaching', title: 'Teaching Experience', type: 'teaching', v: 'cards'},
  {id: 'supervision', nav: 'Students', title: 'Students & Supervision', type: 'supervision', v: 'cards'},
  {id: 'meetings', nonav: 1, nav: 'Meet', title: 'Virtual Meetings & Office Hours', type: 'meeting', v: 'cards', label: 'Join meeting →', book: 1},
  {id: 'calendar', nav: 'Events', title: 'Upcoming Events', type: 'calendarEvent', v: 'events'},
  {id: 'specialization', title: 'Areas of Specialization', type: 'specialization', v: 'tags', nonav: 1},
  {id: 'experience', nonav: 1, nav: 'Experience', title: 'Employment History', type: 'employment', v: 'timeline'},
  {id: 'education', nonav: 1, nav: 'Education', title: 'Qualifications', type: 'qualification', v: 'timeline'},
  {id: 'positions', title: 'Positions Held', type: 'position', v: 'timeline', nonav: 1},
  {id: 'memberships', title: 'Professional Memberships', type: 'membership', v: 'tags', nonav: 1},
  {id: 'grants', nonav: 1, nav: 'Grants', title: 'Grants & Funding', type: 'grant', v: 'cards'},
  {id: 'projects', nonav: 1, nav: 'Projects', title: 'Projects', type: 'project', v: 'cards'},
  {id: 'awards', title: 'Awards & Honours', type: 'award', v: 'cards', nonav: 1},
  {id: 'services', nav: 'Services', title: 'Consultancy & Speaking', type: 'service', v: 'cards', cta: 1},
  {id: 'testimonials', title: 'Testimonials', type: 'testimonial', v: 'quote', nonav: 1},
  {id: 'resources', nav: 'Resources', title: 'Resources & Downloads', type: 'resource', v: 'cards'},
  {id: 'events', title: 'Conferences & Training', type: 'event', v: 'list', nonav: 1},
  {id: 'gallery', title: 'Gallery', type: 'gallery', v: 'gallery', nonav: 1},
]
const Rich = ({v}) => !v ? null : typeof v[0] === 'string' ? v.map((p, i) => <p key={i}>{p}</p>) : <PortableText value={v}/>
const fmt = d => d && new Date(d).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})

function Item({it, v, label = 'View →'}) {
  const pic = img(it.image, 700)
  const body = <>
    {pic && <img className="pic" src={pic} alt={it.title} loading="lazy"/>}
    <div className="meta">
      {it.period && <span className="period">{it.period}</span>}
      {it.status && <span className={'badge ' + it.status.toLowerCase()}>{it.status}</span>}
    </div>
    <h3>{it.title}</h3>
    {it.org && <p className="org">{it.org}</p>}
    {it.description && <p className="desc">{it.description}</p>}
    {it.fileUrl && <a className="more" href={it.fileUrl + '?dl='}>Download ↓ </a>}
    {it.link && <a className="more" href={it.link} target="_blank" rel="noreferrer">{label}</a>}
  </>
  return <article className={'item ' + v}>{body}</article>
}

function Section({s, data, bookingUrl}) {
  if (!data?.length) return null
  return (
    <section id={s.id} className="sec"><div className="wrap">
      <h2 className="reveal">{s.title}</h2>
      {s.v === 'tags'
        ? <div className="tags">{data.map(d => <span key={d._id} className="tag">{d.title}</span>)}</div>
        : <div className={'grid ' + s.v}>{data.map(d => <Item key={d._id} it={d} v={s.v} label={s.label}/>)}</div>}
      {s.book && bookingUrl && <a href={bookingUrl} className="btn gold" target="_blank" rel="noreferrer">Book a time slot</a>}
      {s.cta && <a href="#contact" className="btn gold">Book a consultation</a>}
    </div></section>)
}

function Events({s, data}) {
  if (!data?.length) return null
  const now = Date.now() - 864e5, up = data.filter(e => new Date(e.date) >= now), past = data.filter(e => new Date(e.date) < now).reverse().slice(0, 4)
  const Row = ({e, old}) => { const dt = new Date(e.date); return (
    <article className={'ev' + (old ? ' old' : '')}>
      <div className="date"><b>{dt.getDate()}</b><span>{dt.toLocaleDateString('en-GB', {month: 'short'})}</span></div>
      <div className="evb">
        <div className="meta"><span className="badge ongoing">{e.eventType || 'Event'}</span>{e.isVirtual && <span className="badge">Online</span>}
          <span className="period">{dt.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}{e.venue ? ' · ' + e.venue : ''}</span></div>
        <h3>{e.title}</h3>{e.description && <p className="desc">{e.description}</p>}
        {e.link && !old && <a className="more" href={e.link} target="_blank" rel="noreferrer">Register / Join →</a>}
      </div></article>)}
  return (
    <section id={s.id} className="sec alt"><div className="wrap"><h2>{s.title}</h2>
      {up.length ? up.map(e => <Row key={e._id} e={e}/>) : <p className="desc">No upcoming events at the moment. Please check back soon.</p>}
      {past.length > 0 && <><h3 className="sub">Past events</h3>{past.map(e => <Row key={e._id} e={e} old/>)}</>}
    </div></section>)
}

function Posts({posts}) {
  const [cat, setCat] = useState('all'), [open, setOpen] = useState(null)
  if (!posts.length) return null
  const cats = ['all', ...new Set(posts.map(p => p.category))]
  const shown = posts.filter(p => cat === 'all' || p.category === cat)
  return (
    <section id="blog" className="sec alt"><div className="wrap">
      <h2>Blog, Updates & Insights</h2>
      <div className="filters">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid cards">{shown.map(p => (
        <article key={p._id} className="item cards click" onClick={() => setOpen(p)}>
          {p.image && <img className="pic" src={img(p.image, 700)} alt="" loading="lazy"/>}
          <div className="meta"><span className="badge ongoing">{p.category}</span><span className="period">{fmt(p.date)}</span></div>
          <h3>{p.title}</h3><p className="desc">{p.excerpt}</p><span className="more">Read →</span>
        </article>))}</div>
      {open && <div className="modal" onClick={() => setOpen(null)}><div className="sheet" onClick={e => e.stopPropagation()}>
        <button className="x" onClick={() => setOpen(null)} aria-label="Close">×</button>
        {open.image && <img className="pic" src={img(open.image, 1100)} alt=""/>}
        <p className="period">{open.category} · {fmt(open.date)}</p><h2>{open.title}</h2>
        <div className="prose"><PortableText value={open.body || []} components={{types: {image: ({value}) => <img src={img(value, 900)} alt=""/>}}}/></div>
      </div></div>}
    </div></section>)
}

function Contact({s}) {
  const [state, setState] = useState('idle')
  const email = import.meta.env.VITE_FORM_EMAIL || s.email
  async function submit(e) {
    e.preventDefault(); setState('sending')
    const fd = new FormData(e.target)
    try {
      const r = await fetch('https://formsubmit.co/ajax/' + email, {method: 'POST', headers: {Accept: 'application/json'}, body: fd})
      if (!r.ok) throw 0
      setState('done'); e.target.reset()
    } catch { setState('error') }
  }
  return (
    <section id="contact" className="sec dark"><div className="wrap two">
      <div><h2>Let’s work together</h2><p className="lead">{s.availability}</p>
        <ul className="contact">{s.email && <li>✉ <a href={'mailto:' + s.email}>{s.email}</a></li>}
          {s.bookingUrl && <li>📅 <a href={s.bookingUrl} target="_blank" rel="noreferrer">Book a virtual meeting slot</a></li>}
          {s.phone && <li>☎ {s.phone}</li>}{s.location && <li>⌖ {s.location}</li>}
          {(s.socials || []).map(x => <li key={x.url}>↗ <a href={x.url} target="_blank" rel="noreferrer">{x.label}</a></li>)}</ul></div>
      <form onSubmit={submit}>
        <input type="hidden" name="_subject" value="New enquiry from your portfolio website"/>
        <input type="hidden" name="_template" value="table"/><input type="text" name="_honey" style={{display: 'none'}} tabIndex="-1" autoComplete="off"/>
        <select name="enquiry_type" required defaultValue=""><option value="" disabled>I would like to…</option>
          <option>Book a consultation</option><option>Virtual meeting (students / supervision)</option><option>Invite you to speak</option><option>Discuss research collaboration</option><option>Student supervision / mentoring</option><option>General enquiry</option></select>
        <input name="name" placeholder="Your name" required/><input name="email" type="email" placeholder="Email address" required/>
        <input name="phone" placeholder="Phone (optional)"/><input name="preferred_date" type="date" aria-label="Preferred date"/>
        <textarea name="message" rows="5" placeholder="Tell me about your needs…" required/>
        <button className="btn gold" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
        {state === 'done' && <p className="ok">Thank you! Your message has been sent.</p>}
        {state === 'error' && <p className="err">Something went wrong. Please email directly.</p>}
      </form></div></section>)
}

export default function App() {
  const [d, setD] = useState(FB), [menu, setMenu] = useState(false)
  useEffect(() => {
    if (!client) return
    client.fetch(QUERY).then(r => { if (r.settings) setD({...r}) }).catch(console.error)
  }, [])
  useEffect(() => { // keep browser tab title / description in sync with Sanity (social crawlers read index.html)
    const st = d.settings
    if (st.seoTitle) document.title = st.seoTitle
    const set = (sel, attr, v) => { const m = document.querySelector(sel); if (m && v) m.setAttribute(attr, v) }
    set('meta[name=description]', 'content', st.seoDescription); set('meta[property="og:title"]', 'content', st.seoTitle); set('meta[property="og:description"]', 'content', st.seoDescription)
  }, [d])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), {threshold: .1})
    document.querySelectorAll('.sec').forEach(n => io.observe(n)); return () => io.disconnect()
  })
  const s = d.settings, photo = img(s.photo, 800)
  const nav = [...SECTIONS.filter(x => !x.nonav && d[x.type]?.length), ...(d.posts?.length ? [{id: 'blog', nav: 'Blog'}] : [])]
  return <>
    <header className="nav"><div className="wrap bar">
      <a href="#top" className="logo">F. E. Pufaa</a>
      <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
      <nav className={menu ? 'open' : ''} onClick={() => setMenu(false)}>
        <a href="#about">About</a>{nav.map(n => <a key={n.id} href={'#' + n.id}>{n.nav}</a>)}<a href="#contact" className="pill">Contact</a></nav>
    </div></header>
    <main id="top">
      <section className="hero"><div className="wrap two">
        <div><p className="eyebrow">{s.headline}</p><h1>{s.name}</h1><p className="role">{s.role}</p><p className="lead">{s.tagline}</p>
          <div className="cta"><a href="#contact" className="btn gold">Book a consultation</a>
            {s.cvUrl ? <a href={s.cvUrl} className="btn ghost" target="_blank" rel="noreferrer">Download CV</a> : <a href="#about" className="btn ghost">About me</a>}</div>
          {s.socials?.length > 0 && <div className="plinks"><span>Find me on</span>{s.socials.map(x => <a key={x.url} href={x.url} target="_blank" rel="noreferrer">{x.label}</a>)}</div>}</div>
        <div className="portrait">{photo ? <img src={photo} alt={s.name}/> : <div className="ph">FP</div>}</div>
      </div>
      {s.stats?.length > 0 && <div className="wrap stats">{s.stats.map((x, i) => <div key={i}><b>{x.value}</b><span>{x.label}</span></div>)}</div>}</section>
      <section id="about" className="sec"><div className="wrap"><h2>About Me</h2><div className="prose big"><Rich v={s.bio}/></div></div></section>
      {SECTIONS.map(x => x.v === 'events' ? <Events key={x.id} s={x} data={d[x.type]}/> : <Section key={x.id} s={x} data={d[x.type]} bookingUrl={s.bookingUrl}/>)}
      <Posts posts={d.posts || []}/>
      <Contact s={s}/>
    </main>
    <footer><div className="wrap">© {new Date().getFullYear()} {s.name} · University of Education, Winneba</div></footer>
  </>
}
