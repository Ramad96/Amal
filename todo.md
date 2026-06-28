# Amal — Build Plan
> Hope has a home.
> Hosted at: amal.amanahdigital.co.uk (GitHub Pages + CNAME)

---

## Stack
- Pure HTML + CSS + Vanilla JS (no framework, no build step)
- localStorage for personal data (no backend needed at launch)
- JSON files for prophetic duas content
- GitHub Pages for hosting
- PWA support (manifest + service worker for offline)

---

## Phase 1 — Foundation
- [x] Project structure set up
- [x] CNAME file for amal.amanahdigital.co.uk
- [ ] index.html shell with navigation
- [ ] Global CSS (design tokens, typography, components)
- [ ] PWA manifest (manifest.json)
- [ ] Service worker (sw.js) for offline caching
- [ ] Favicon + app icons

---

## Phase 2 — Prophetic Duas
- [ ] duas.json — curated dataset (~60 duas) with:
  - Arabic text
  - Transliteration
  - English translation
  - Source (Quran ref or hadith)
  - Category tags
- [ ] Browse duas by category page
- [ ] Individual dua view (full Arabic, transliteration, translation)
- [ ] Search duas by keyword

---

## Phase 3 — Personal Library
- [ ] Save any dua to personal library (localStorage)
- [ ] Add a custom dua (user-written)
- [ ] Tag duas (optional free tags)
- [ ] Mark dua as answered (with timestamp)
- [ ] View answered duas archive
- [ ] Delete / edit personal duas

---

## Phase 4 — Categories & Discovery
- [ ] Category index page
  - Morning & evening adhkar
  - Travelling
  - Anxiety & hardship
  - Gratitude
  - For parents
  - Before/after eating
  - Seeking forgiveness
  - Dua for others
- [ ] Filter prophetic duas by category
- [ ] "Dua of the day" on homepage (rotates daily)

---

## Phase 5 — Umrah Sharing
- [ ] Create a dua request (text input, optional name)
- [ ] Generate a unique shareable link (UUID-based URL hash)
- [ ] Pilgrim view — clean, distraction-free page showing all requests sent to that link
- [ ] Share via WhatsApp / copy link button
- [ ] Requests stored in localStorage on sender's device (no backend needed)

---

## Phase 6 — Open Dua Board
- [ ] Decide on moderation approach before building
  - Option A: localStorage only (private board, no server)
  - Option B: Simple backend (Supabase free tier) for shared board
- [ ] Post a dua request (anonymous or with name)
- [ ] "Ameen" tap counter per post
- [ ] Board view (chronological, most recent first)
- [ ] Basic content guidelines shown before posting

---

## Phase 7 — Polish
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] Smooth page transitions
- [ ] Empty states (no saved duas yet, etc.)
- [ ] Onboarding / welcome screen for first-time visitors
- [ ] About page (what is Amal, who made it)
- [ ] Footer with link back to amanahdigital.co.uk

---

## GitHub Pages Setup
- [ ] Repo: github.com/[username]/amal (or inside amanahdigital org)
- [ ] CNAME file in root → amal.amanahdigital.co.uk
- [ ] DNS: CNAME record on amanahdigital.co.uk pointing amal → [username].github.io
- [ ] Enable GitHub Pages in repo settings (source: main branch, root folder)
- [ ] Note: amanahdigital.co.uk/amal won't auto-redirect — the CNAME handles amal.* subdomain only. A simple redirect meta tag on the main site can point visitors there.

---

## File Structure
```
Amal/
├── index.html          # Homepage
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── CNAME               # GitHub Pages custom domain
├── todo.md             # This file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Core app logic + routing
│   ├── library.js      # Personal library (localStorage)
│   ├── sharing.js      # Umrah sharing link logic
│   └── board.js        # Open dua board logic
├── data/
│   └── duas.json       # Prophetic duas dataset
├── pages/
│   ├── browse.html     # Browse prophetic duas
│   ├── library.html    # Personal library
│   ├── share.html      # Umrah sharing
│   ├── board.html      # Open dua board
│   └── about.html      # About Amal
└── icons/
    ├── icon-192.png
    └── icon-512.png
```
