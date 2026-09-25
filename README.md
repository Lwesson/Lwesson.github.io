# lwesson.github.io

Personal portfolio for Lucas Wesson, AI and security. One page, no framework, no build step.

Live at https://lwesson.github.io

## Stack

A single `index.html` holding the markup, styles, script and content. The only external
dependency is two fonts from Google Fonts.

## Run locally

    python3 -m http.server 8000

Then open http://localhost:8000 and refresh as you edit.

## Files

- `index.html` - the whole site
- `og-card.png` - link preview card (1200x630). Regenerate with `_card.html?seed=42` (local, not deployed), screenshot at 2x, downscale
- `favicon.svg`, `favicon.png`, `apple-touch-icon.png` - icons
- `nav-demo.html` - redirect to the root, kept so an older link still resolves
- `research/` - write-ups, one standalone page each
- `404.html` - not-found page (GitHub Pages serves it for any missing path)
- `robots.txt`, `sitemap.xml` - crawler hints; add each new write-up to the sitemap
- `.well-known/security.txt` - security contact, points at the contact form. Renew `Expires` before 2027-09-24
- `.nojekyll` - tells GitHub Pages to serve files as-is, needed for `.well-known/`

Every station has an address: `/#overview`, `/#work`, `/#research`, `/#discipline`, `/#about`,
`/#contact`. Use `/#research` in applications.

Each item in the nav pairs with one section: the `data-panel` on the button matches that
section's `id`.
