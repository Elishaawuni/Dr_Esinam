# Dr. Felicia Esinam Pufaa – Portfolio (React + Sanity)
Two folders: `site/` (public React website) and `studio/` (Sanity Studio – the lecturer's editing dashboard).

## 1. Create the Sanity project (once)
1. `cd studio && npm install && npx sanity login && npx sanity init --env` (choose "Create new project", dataset `production`, skip template). Note the **Project ID**.
2. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID`.
3. `npm run dev` to try it at http://localhost:3333, then `npm run deploy` to host it at `<name>.sanity.studio`.
4. At sanity.io/manage → API → **CORS origins**, add `http://localhost:5173` and the live website URL (no credentials needed).
5. At manage → Members, invite the lecturer's email as **Editor** (or Administrator).

### Optional: load the CV content + sample content into Sanity
`cd studio && npx sanity dataset import seed/seed.ndjson production --replace`
This loads her CV data plus the **sample** testimonial, resources, events and profile links so she can edit them instead of typing from scratch. Delete or replace every item marked "Sample" before launch. (Regenerate the file with `node scripts/make-seed.mjs`.)

## 2. Run the website
`cd site && npm install && cp .env.example .env` → set `VITE_SANITY_PROJECT_ID`, `VITE_FORM_EMAIL` → `npm run dev`.
Deploy `site/` to Netlify/Vercel (build `npm run build`, output `dist`, add the same env vars).
Until the first "Profile & Site Settings" document is published the site shows the CV-based sample content from `src/fallback.js`.

## 3. Contact form
Uses formsubmit.co. Submit the form once after deploying; FormSubmit emails an activation link to `VITE_FORM_EMAIL`. Click it once.

## 4. Lecturer's guide
Log into the Studio. Open **Profile & Site Settings** first (name, profile picture, biography, CV PDF). Every other item (publication, grant, award, blog post…) is a document: click **+**, fill in, **Publish**. Every item and every blog post has a picture field. Blog posts allow pictures inside the text. Changes appear on the website on next load (CDN may take ~1 min).

## 5. Before going live checklist
- Replace sample testimonial, resources, events and profile links (ORCID, Scholar, ResearchGate, Academia.edu, LinkedIn).
- In `site/index.html` replace every `https://www.example.com/` (canonical, og:url, og:image, JSON-LD) with the real domain once bought, and replace `public/og-image.png` if desired (1200x630).
- In Sanity > Profile & Site Settings, set the SEO title and description.
