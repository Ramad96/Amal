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
- [x] index.html shell with navigation
- [x] Global CSS (design tokens, typography, components)
- [x] PWA manifest (manifest.json)
- [x] Service worker (sw.js) for offline caching
- [ ] Favicon + app icons

---

## Phase 2 — Prophetic Duas
- [x] duas.json — curated dataset with:
  - Arabic text
  - Transliteration
  - English translation
  - Source (Quran ref or hadith)
  - Category tags
- [x] Browse duas by category page
- [x] Individual dua view (full Arabic, transliteration, translation)
- [x] Search duas by keyword

---

## Phase 3 — Personal Library
- [x] Save any dua to personal library (localStorage)
- [x] Add a custom dua (user-written)
- [ ] Tag duas (optional free tags)
- [x] Mark dua as answered (with timestamp)
- [x] View answered duas archive
- [x] Delete / edit personal duas

---

## Phase 4 — Categories & Discovery
- [x] Category index page
  - Morning & evening adhkar
  - Travelling
  - Anxiety & hardship
  - Gratitude
  - For parents
  - Before/after eating
  - Seeking forgiveness
  - Dua for others
- [x] Filter prophetic duas by category
- [x] "Dua of the day" on homepage (rotates daily)

---

## Phase 5 — Umrah Sharing
- [x] Create a dua request (text input, optional name)
- [x] Generate a unique shareable link (UUID-based URL hash)
- [x] Pilgrim view — clean, distraction-free page showing all requests sent to that link
- [x] Share via WhatsApp / copy link button
- [x] Requests stored in localStorage on sender's device (no backend needed)

---

## Phase 6 — Polish
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] Smooth page transitions
- [ ] Empty states (no saved duas yet, etc.)
- [ ] Onboarding / welcome screen for first-time visitors
- [x] About page (what is Amal, who made it)
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

---

## Later — Open Dua Board (post-launch)
> Not included in v1. Requires a decision on moderation and potentially a backend. Build after core features are stable.

- [ ] Decide on moderation approach before building
  - Option A: localStorage only (private board, no server)
  - Option B: Simple backend (Supabase free tier) for shared board
- [ ] Post a dua request (anonymous or with name)
- [ ] "Ameen" tap counter per post
- [ ] Board view (chronological, most recent first)
- [ ] Basic content guidelines shown before posting
