# Linux Commands — Quick Reference

A fast, offline-capable, single-page reference for **304 Linux commands** — with
man-page-style detail views, **966 ready-to-copy examples**, and full
**English / Bahasa Indonesia** localization.

No frameworks, no build step, no dependencies at runtime: just HTML, CSS, and
vanilla JavaScript. Works on desktop and mobile, and installs as a PWA.

> **Bahasa Indonesia:** Aplikasi ini tersedia dalam Bahasa Indonesia — klik
> tombol **EN / ID** di header, atau buka dengan browser berbahasa Indonesia
> dan konten otomatis ditampilkan dalam Bahasa Indonesia.

---

## Features

- **Instant search** — exact command names rank first, matches are highlighted.
- **12 category chips** — Files, Text, System, Process, Network, Users,
  Packages, Archive, Disk, Shell, Services, Dev.
- **Man-page modals** with the classic sections:
  `NAME · SYNOPSIS · DESCRIPTION · OPTIONS · ENVIRONMENT · EXIT STATUS · EXAMPLES · SEE ALSO`
  plus a find-in-page search bar inside every man page.
- **966 examples**, each with an explanatory note (many marked `Case:`) and a
  one-click **copy button**.
- **Bilingual (EN/ID)** — every description, option, example note, exit status,
  and environment variable is translated. Language persists via `localStorage`,
  with automatic browser-language detection on first visit.
- **Gruvbox theme** — dark and light variants, with a theme toggle
  (system preference respected on first load).
- **Offline PWA** — service worker precaches the whole app (25 assets);
  installable on Android/desktop/Chrome via the install button.
- **Print stylesheet** — open a man page and hit Print for a clean,
  paginated man-page printout (a print footer with the source is added).
- **Cross-references** — every SEE ALSO entry links to a real command in the
  database (enforced by the validator).

## Quick start

Any static file server works:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. That's it — there is nothing to build.

> **Note:** service workers require `https://` or `localhost`. The PWA
> install/offline features won't activate over plain `http://` on a LAN IP.

## Project layout

```
index.html            app shell (search box, chips, grid, man-page modal)
styles.css            gruvbox dark/light theme, responsive layout, print styles
app.js                search/ranking, rendering, modal, i18n switching, PWA glue
i18n.js               UI strings for en + id (window.STRINGS)
sw.js                 service worker (precache + offline fallback)
manifest.webmanifest  PWA manifest
icons/                app icons (192, 512, maskable)

data-part1..2.js      command index: name, category, desc, usage (window.CMDS)
man-part1..6.js       man-page data: description, options, see-also (window.MAN)
ex-part1..3.js        EXIT STATUS + ENVIRONMENT data (window.EXITSTATUS/ENVVARS)
examples-part1..3.js  expanded examples with notes (window.EXAMPLES)

id-part1..3.js        Indonesian translations (window.IDTXT) — overlay data;
                      any missing key falls back to English automatically

validate.js           data + i18n integrity checks (see below)
test-app.js           74 jsdom smoke tests of the running app
dump.js               dev helper: dump one command's data as JSON
make-icons.py         regenerates the PWA icons
```

The data is split across numbered parts purely to keep files small and
load-friendly; each part appends to the same global object.

## Data model & counts

| Dataset            | Global                 | Count |
|--------------------|------------------------|-------|
| Commands           | `window.CMDS`          | 304   |
| Man pages          | `window.MAN`           | 304   |
| Exit status sets   | `window.EXITSTATUS`    | 304   |
| Environment sets   | `window.ENVVARS`       | 54    |
| Examples           | `window.EXAMPLES`      | 966   |
| Indonesian entries | `window.IDTXT`         | 304   |

Per category: files 24 · text 34 · system 31 · process 26 · network 31 ·
users 23 · packages 17 · archive 13 · disk 23 · shell 40 · services 15 · dev 27.

## Development

Requires Node.js 18+ (only for tests — the app itself runs anywhere).

```bash
npm install        # installs jsdom (dev dependency only)

npm test           # 74 smoke tests: search, chips, modal, i18n, PWA wiring
npm run validate   # data integrity + i18n parity checks
npm start          # serve on :8000
```

### What the validator checks

- Every command has a man entry, exit statuses, ≥2 examples, a valid category,
  and no duplicate names.
- Every `SEE ALSO` reference points at a real command.
- **i18n parity:** `IDTXT` covers all 304 commands, and each translation's
  options / example notes / exit statuses / env vars arrays exactly match the
  length of their English counterparts; `STRINGS` has identical en/id keys.
- The service worker precache list covers every asset on disk.

### Adding or editing a command

1. Add it to `data-partN.js` (`CMDS`) and `man-partN.js` (`MAN`).
2. Add exit statuses to `ex-partN.js` and examples to `examples-partN.js`.
3. Add the Indonesian entry to `id-partN.js` (`IDTXT`) — arrays are
   index-aligned with the English data; omit any key to fall back to English.
4. Run `npm run validate && npm test`.
5. **Bump the cache version in `sw.js`** (`linux-cmd-ref-vN`) so installed
   PWAs pick up the change.

## Browser support

Any modern browser (Chrome, Edge, Firefox, Safari). PWA install and offline
mode additionally require a secure context (`https://` or `localhost`).

## License

No license file yet — pick one (e.g. MIT) before publishing publicly.
