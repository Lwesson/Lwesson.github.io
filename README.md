# lwesson.github.io

Personal portfolio for Lucas Wesson, AI and security. One page, no framework, no build step.

Live at https://lwesson.github.io

## Stack

A single `index.html` holding the markup, styles, script and content. The only external
dependency is two fonts from Google Fonts.

## Run locally

    python3 -m http.server 8770

Then open http://localhost:8770 and refresh as you edit.

## Files

- `index.html` - the whole site
- `og-image.png` - social preview card
- `favicon.svg`, `favicon.png`, `apple-touch-icon.png` - icons
- `nav-demo.html` - redirect to the root, kept so an older link still resolves

Each item in the nav pairs with one section: the `data-panel` on the button matches that
section's `id`.
