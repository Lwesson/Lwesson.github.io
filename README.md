# Lucas Wesson — Portfolio

A static portfolio. Plain HTML/CSS/JS, no framework, no build step, no trackers.
Multiple pages share one stylesheet and one script.

## Files (deploy these)

Pages:
- `index.html` — Home (hero, focus, featured work, contact CTA).
- `work.html` — Work (full project list; each links to a detail page).
- `about.html` — About (throughline bio + certifications, education, toolset).
- `contact.html` — Contact (form).
- `project-platform.html`, `project-siem.html`, `project-analysis.html`, `project-cyberquest.html`
  — individual project detail pages, linked from Work.

Shared:
- `styles.css` — one stylesheet for every page.
- `script.js` — one script (theme toggle, mobile menu, scroll reveal, contact form) for every page.

Every page reuses the same `<head>` link to `styles.css`, the same `<header class="nav">` block
(set `class="active"` on the current page's link), and the same `<script src="script.js">`.
To add a page, copy the closest existing one, keep head/nav/footer, and replace the `<main>` content.

## Dev-only (do not deploy)

- `_build_preview.py` / `_artifact_preview.html` — helper that inlines `styles.css` + `script.js`
  into a single self-contained file for a Claude Artifact preview of the **home page only**.
  Cross-page navigation does not work in that single-file preview; use the local server to click through.
  Safe to leave out of the public repo.

## Contact form (one setup step)

The Contact section uses a form that emails you without ever showing your address.
It runs on Web3Forms (free, no account).

1. Go to https://web3forms.com, enter your email (lwesson1984@gmail.com), and they email you an **access key**.
2. In `index.html`, find `YOUR_WEB3FORMS_ACCESS_KEY` and replace it with that key.
3. Done. Submissions arrive in your inbox; the visitor's name/email/message come with each one so you can reply.

Notes:
- The access key is safe to commit publicly. It only routes to your inbox; it cannot read your mail, and your address never appears in the page.
- Messages pass through Web3Forms' servers (a third party). That is the tradeoff for a static site with no backend.
- The form does not submit inside the Claude Artifact preview (its security policy blocks external requests). It works on the real deployed site.

## Local preview

From this folder: `python3 -m http.server 8770` then open `http://localhost:8770`.
Edit a file, refresh the tab.

## Deploy to GitHub Pages

This should live in its **own public repo**, separate from any private work.

1. Create a new public repo named `lwesson.github.io`.
2. Copy `index.html` and the `assets/` folder into it.
3. Push to the `main` branch.
4. In the repo: Settings → Pages → Source: `Deploy from a branch` → `main` / `root`.
5. Site goes live at `https://lwesson.github.io`.

A custom domain can be added later under Settings → Pages.

## Editing

`index.html` is the single source of truth. Edit it directly. To refresh the Artifact preview
after edits, run `python _build_preview.py` and republish `_artifact_preview.html`.

## Design

Dark-first, cool ink-slate ground with a signal-amber accent. System sans for reading,
monospace for labels and data. Light and dark themes, respects reduced-motion, keyboard-focus
visible. Content is sanitized: no client or program names.
