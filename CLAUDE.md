# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

```bash
npm start          # starts Express server at http://localhost:3000
node server.js     # equivalent
```

No build step. JSX files are served as static files and transpiled in-browser by Babel Standalone. `.js` and `.jsx` files are served with `Cache-Control: no-store` so edits appear on reload without clearing the browser cache.

## Architecture

**Stack**: Express static server + React 18 (CDN UMD) + Babel Standalone (in-browser JSX) + vanilla HTML/CSS.

**Entry point**: `index.html` mounts a React app into `#root`. The inline `<script type="text/babel">` at the bottom defines the `App` component and calls `ReactDOM.createRoot`. Other pages (`work.html`, `blog.html`, `blog-post.html`, `case-study.html`, `about.html`, `contact.html`, `admin.html`) follow the same pattern.

**JSX files loaded in order** (each `<script type="text/babel" src="...">`) before the inline App:
1. `design-canvas.jsx` — Figma-like artboard/section canvas wrapper (`DesignCanvas`, `DCSection`, `DCArtboard`)
2. `case-study.jsx` — case study page component
3. `blog-post.jsx` — blog post page component
4. `about-contact.jsx` — about + contact page component
5. `archives.jsx` — archives/work listing component
6. `app.jsx` — main app: defines `useStore`, `DEFAULTS` (all content), and page variation components

**State / persistence**:
- `useStore` (in `app.jsx`) syncs React state to `data.json` via `GET/POST /api/data`. Initial load merges server state with `DEFAULTS`.
- `image-slot.js` registers the `<image-slot>` custom element. Dropped images persist to `.image-slots.state.json` via `POST /api/slots` (through `omelette-shim.js`, which polyfills `window.omelette.writeFile` for local dev).
- `.design-canvas.state.json` — artboard reorder/label state written by `DesignCanvas`.

**Content**: `data.json` is the source of truth for all copy. All strings are bilingual objects `{ en: "...", pt: "..." }`. The `DEFAULTS` object in `app.jsx` is the fallback when `data.json` is absent.

## Design system

**`colors_and_type.css`** — the single source of truth for all design tokens. Always import this first. Never hardcode values that exist as tokens.

Key rules baked into the system:
- **Border-radius is always `0`. No exceptions.** `--radius: 0` — do not add `border-radius` anywhere in pages.
- **Phosphor (`--color-phosphor: #D8FF3D`) is fill-only, ~1 surface in 10 max.** Never use it as text color. Always put `--color-foundation` (black) text on top of a phosphor fill.
- `--color-accent-loud: #0047FF` — links, buttons, UI.

**Typography roles** (use the class, not raw font/size):
- `.t-display-1` — Migra Semibold, 96px display
- `.t-display-2` — Roboto Medium, 64px
- `.t-h1 / .t-h2 / .t-h3` — Roboto Medium
- `.t-body-large / .t-body / .t-small` — Roboto Regular
- `.t-micro` — JetBrains Mono, 12px, lowercase, `--fg-secondary`

**`wireframe-styles.css`** — lo-fi component classes built on top of the token layer. Root wrapper: `<div class="wf">` (light) or `<div class="wf dark">`.

**Fonts**: Migra is self-hosted in `/fonts` (paid, Pangram Pangram). Roboto is self-hosted in `/fonts`. JetBrains Mono loads from Google Fonts.

## `<image-slot>` custom element

Drop `<script src="image-slot.js">` once, then use:

```html
<image-slot id="hero" style="width:800px;height:450px" shape="rounded" radius="20"></image-slot>
```

- `id` is required for persistence across reloads.
- Size comes from CSS on the element — **set `aspect-ratio` on a wrapper `<div>`, not on the custom element itself**.
- `shape`: `rect` | `rounded` | `circle` | `pill`; `mask`: any CSS `clip-path`.
- `fit=cover` (default) enables double-click reframe (pan + resize); `contain`/`fill` are static.
- Accepts PNG, JPEG, WebP, AVIF only. SVG and GIF are rejected intentionally.
- Write path: `window.omelette.writeFile` → `omelette-shim.js` → `POST /api/slots`.
