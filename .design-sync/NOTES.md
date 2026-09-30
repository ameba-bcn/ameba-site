# design-sync notes — ameba-site

## Repo shape

- `ameba-site` is a **private app**, not a published component library: no `dist/`, no `.d.ts`, no npm package surface. Storybook (`.storybook/` at repo root) was set up specifically to support this sync — see the plan/PR that added it.
- `cfg.entry` points at `.design-sync/entry.js`, a hand-authored synthetic entry that re-exports the 26 design-system-worthy components (and `AppProviders`, see below) from their real `src/components/**` source files. This is the "no build → synthesize an entry from src/" last resort, done explicitly since storybook shape has no automatic synth path (only package shape does).
- `.design-sync/overrides/dts.mjs` (declared in `cfg.libOverrides`) forks `exportedNames()`: the stock implementation reads a `.d.ts` entry via ts-morph, which is always empty here (no TypeScript declarations anywhere), which in turn zeroes out EVERY storybook-discovered component at the "must be a public export" filter in `package-build.mjs`. The fork falls back to a regex scan of `.design-sync/entry.js` for named exports when the ts-morph scan comes back empty. `.design-sync/node_modules` is a symlink to `.ds-sync/node_modules` (recreate on fresh clone: `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`) — the fork still imports `ts-morph`.

## [GENERAL] Router/i18n context must live in the SAME bundle as the components

`.storybook/preview.jsx`'s decorators (`MemoryRouter` + `I18nextProvider`, mirroring `src/test/helpers/renderWithProviders.jsx`) get bundled into a **separate** esbuild output (`_vendor/preview-decorators.js`) from the main component bundle (`_ds_bundle.js`). Since `react-router-dom` isn't shimmed to a shared global the way `react`/`react-dom` are, each bundle inlines its own private copy — `MemoryRouter`'s context object in one bundle is invisible to `useNavigate`/`useLocation`/`NavLink` in the other. Result: every Router-dependent component (`Breadcrums`, `CardLayout`, `CardView`, `PromoBanner`) rendered with `root empty` + `TypeError`/`Error: useNavigate() may be used only in the context of a <Router>`.

**Fix**: `.design-sync/app-providers.jsx` exports a default `AppProviders({children})` wrapping `I18nextProvider` + `MemoryRouter` (same i18n init as the test helper), re-exported from `.design-sync/entry.js`. `cfg.provider = {"component": "AppProviders"}` makes the converter use it in place of decorator auto-bundling — since it's part of the SAME entry/bundle as the components, the router context is shared correctly. Confirmed via `bundle export list: 27` and validate going from 4 hard `[RENDER]` failures to 0.

**Re-sync risk**: if `.storybook/preview.jsx`'s decorators ever change (e.g. a new global provider is added for real Storybook development), `.design-sync/app-providers.jsx` needs the same change mirrored by hand — it does NOT auto-derive from `preview.jsx` once `cfg.provider` is set (decorator auto-bundling is skipped entirely, per the build log's "(decorator auto-detect skipped — cfg.provider is set)").

## [GENERAL] Global CSS tokens needed `cfg.cssEntry`, appended not replaced

`_ds_bundle.css` is populated from whatever CSS files the synthetic entry's components actually `import` (Button.css, Dropdown.css, etc. — real, esbuild-bundled). But `src/index.css` — the actual `:root` token source (`--color-negro`, `--font-display`, etc.) — is only ever imported by `.storybook/preview.jsx` and the app's own `src/index.jsx`, neither of which feeds the component entry. Result: `[TOKENS_MISSING]` for every `var(--color-*)`/`var(--negro)` etc. reference. Fixed with `cfg.cssEntry: "src/index.css"` — since `_ds_bundle.css` already had real content, the build **appended** index.css rather than replacing it (`package-build.mjs`'s documented behavior when the bundle CSS isn't a placeholder).

## [GENERAL] Fonts loaded from `index.html`, not any CSS — and Storybook didn't have them either

`Bebas Neue`, `Material Icons`, and `Arimo` are loaded via `<link>` tags in `index.html` (the app shell), NOT via any CSS `@import` — so neither the CSS scraper nor Storybook's own dev/build render ever saw them; only `Montserrat` (loaded via `@import url(...)` inside `index.css`) was visible to Storybook. This is exactly the "`[FONT_MISSING]` the compare oracle can't see" trap: both sides would have silently fallen back to the same substitute font and LOOKED like a match.

**Fix (repo-level, not sync-only)**: added `.storybook/preview-head.html` with the same 4 Google Fonts `<link>` tags as `index.html`, so both real Storybook dev/build AND the sync's reference render use the true fonts. `package-validate.mjs` now reports `[FONT_REMOTE]` (informational, no action) for Bebas Neue/Montserrat/source-code-pro — correctly recognizing the Google Fonts CDN `@import` as a runtime font load.

## [GENERAL] Framing difference: storybook renders full-bleed on the page's own dark background; preview cards render on white

`src/index.css` sets `html { background-color: var(--color-negro) }` sitewide — this is the REAL, intentional site background (confirmed visually when the Storybook task verified `Button`/`PageLayout` renders). Storybook's own `iframe.html` canvas is NOT wrapped in any card chrome, so components render directly against this near-black page background. The design-sync preview HTML wraps each story in a white "card" (standard across all synced DS previews). **This means every compare sheet shows storybook-side renders on dark/full-bleed vs. preview-side renders inside a white box with the real page background only showing below the card** — ignore this per the grading rubric ("framing differences... judge the component, not its surroundings"). One concrete consequence: `Button`'s `boton--primary--outline` variant (black border + black text, by design, meant for light backgrounds) is functionally invisible on storybook's own dark-canvas capture but clearly legible in the preview's white card — both are "correct" renders of the same CSS; grade from the component itself, not the ambient contrast.

## CardView "Event" DATA field — transient, resolved

Earlier in this sync, `CardView`'s Event story showed a blank DATA field in the storybook reference even after pinning the story's date to a fixed ISO string — investigated at length (ruled out clock-freeze timing, prop-passing). After the image-URL fix below required a full reference+bundle rebuild anyway, a fresh compare run showed it rendering correctly on both sides. Graded `match`. Leaving this note in case it recurs — if so, it's likely a storybook-static build staleness/caching issue rather than a real fidelity bug, given a full rebuild fixed it without any code change to the date handling itself.

## [GENERAL] Root-relative image paths (`/foo.jpg`) don't survive outside the app's own dev server

`Banner`, `CardLayout`, and `CardView` stories originally referenced `public/` images via root-relative paths (`/AmebaPortadaDesktop.jpg`), which only resolve inside our own Vite/Storybook dev server (`staticDirs: ["../public"]` in `.storybook/main.js`). The design-sync preview HTML pages are standalone files with no such mapping, so the images rendered as broken-image icons in the synced previews (confirmed via compare sheet: storybook showed the real image, the ds preview showed a broken-image glyph). Fixed by pointing these stories at the real production URL (`https://ameba.cat/AmebaPortadaDesktop.jpg` etc. — verified live, HTTP 200) instead — works identically in Storybook, in the design-sync bundle, and anywhere else. **Any future story that references a `public/` asset must use the full `https://ameba.cat/...` URL, never a root-relative path.**

## `CountdownTimer` has no component-level styling

`src/components/countdown/` ships no `.css` file — `CountdownTimer`'s `.show-counter` styling lives entirely in `src/pages/SiteNotAvailable.css` (its one real usage site), not co-located with the component. Both the storybook reference and the design-sync preview render it identically unstyled (confirmed via compare — the apparent difference in the sheet is the same "framing" effect noted above: unstyled dark text is illegible on storybook's dark canvas, legible on the preview's white card). Graded `match` since both sides are faithfully rendering the same (visually thin) component — flagging here in case a future pass wants to either give it real component-scoped CSS or drop it from the synced set.

## Known render warns (legitimate `[RENDER_THIN]`, not bugs)

Confirmed via raw screenshots — non-textual, icon/logo-only components; the thin heuristic (mounted text length) always false-positives on these:
- `AmebaBlob`, `AmebaLogo` — pure SVG logo marks, no text by design.
- `AmebaSpinner`, `RouteFallback` — spinning logo mark, no text by design.

## `cfg.overrides.<Name>.skip`

- `CollapsableTextDiv` → `components-collapsabletextdiv--short-text`: for short (non-collapsing) text, the component returns a bare React fragment (`<>{rendered}</>`) with no wrapping DOM element — nothing to screenshot, and storybook's own reference has the same `sb-error: no storybook root content`. Not a fidelity bug; the "Long Text Collapsed" story (the component's real, boxed rendering) is unaffected and matches.

## `[GRID_OVERFLOW]` overrides applied

- `CardLayout`, `CardView`: `cardMode: "column"` — both render a full-width grid/card layout wider than a picker grid cell.
- `FullscreenSpinner`: `cardMode: "single", primaryStory: "Default"` — renders a fixed-position full-viewport overlay (by design).

## Re-sync risks

- `AppProviders` (`.design-sync/app-providers.jsx`) is a hand-maintained mirror of `.storybook/preview.jsx`'s decorators — drifts silently if the real decorators change. Check both whenever `.storybook/preview.jsx` is edited.
- `.design-sync/entry.js` is a hand-maintained component list — a new `src/components/**/*.stories.jsx` file needs a matching `export { default as X } from "..."` line added here, or it will get dropped as `[TITLE_UNMAPPED]`/not-a-public-export on the next sync.
- `.design-sync/overrides/dts.mjs`'s entry-scan fallback is generic (any repo with no `.d.ts` and a `.design-sync/entry.js`/`.jsx`), not ameba-site-specific — safe to keep as-is if this pattern recurs.
- Fonts are CDN-loaded (Google Fonts) — if ameba.cat ever self-hosts fonts instead, `.storybook/preview-head.html` and this config's font handling need revisiting.
- No `.d.ts`/docs anywhere — every `.prompt.md` is synthesized from the `.tsx` preview + JSDoc (mostly absent), not from real docs. `docs: 0/26 components matched` is expected, not a gap to chase.
