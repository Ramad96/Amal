# Amal — أمل
> Hope has a home.

A lightweight Islamic dua platform. No framework, no build step, no backend. Pure HTML, CSS, and vanilla JS.

**Live at:** [amal.amanahdigital.co.uk](https://amal.amanahdigital.co.uk)

---

## Features
- 📖 **Browse duas** — curated prophetic supplications with Arabic, transliteration, translation, and source
- 🤲 **Personal library** — save duas, add your own, mark as answered
- 🕋 **Umrah sharing** — generate a unique link for loved ones to send duas for you to make in the Haramain
- 🌿 **Dua board** — community dua requests with Ameen taps
- 📱 **PWA** — installable, works offline

## Stack
- Plain HTML + CSS + Vanilla JS
- localStorage for all personal data (private, on-device)
- GitHub Pages for hosting
- No npm, no build step, no dependencies (Amiri font via Google Fonts only)

## Local development
Just open `index.html` in a browser. No server needed for most features.

For the service worker to function, use a local server:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```
Then visit `http://localhost:8080`

## GitHub Pages setup
1. Push this repo to GitHub
2. Go to Settings → Pages → Source: GitHub Actions
3. Add a CNAME record in your DNS:
   - **Name:** `amal`
   - **Type:** `CNAME`
   - **Value:** `[your-github-username].github.io`
4. The CNAME file in the repo handles the rest

## Adding more duas
Edit `data/duas.json`. Each entry:
```json
{
  "id": "unique-id",
  "arabic": "Arabic text",
  "transliteration": "Romanised Arabic",
  "translation": "English meaning",
  "source": "Bukhari 1234",
  "categories": ["morning", "general"],
  "occasion": "When to recite"
}
```

## Categories
`morning` `evening` `daily` `travel` `umrah` `anxiety` `hardship` `forgiveness` `parents` `gratitude` `illness` `general` `before-eating` `after-eating` `protection` `salawat` `trust`

---

Made with intention by [Amanah Digital](https://amanahdigital.co.uk)
