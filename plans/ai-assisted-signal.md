# Signal AI-assisted work on the site

## Goal
Visitors notice Som uses AI-assisted tech in his workflow within 30 seconds of skimming, without it becoming the hero of the page.

## Touch points

### 1. Bullet in the intro section
A new line in the existing homepage bullet list (next to the profile photo), same style as the current bullets.
1. Answers "is AI part of Som's workflow?" within seconds of skimming.
2. Placeholder copy for now, one line, no elaboration.

### 2. Callout in the footer
Site currently has no footer. Add a minimal one, on every page, with a quiet line disclosing AI-assisted work.
1. Same "answer within seconds" job as the bullet, but for visitors who scroll to the bottom instead of reading the intro.
2. Placeholder copy for now.

### 3. "Built with AI" page
A new nav link → a dedicated page listing things Som has built with AI (starts with 2 Chrome extensions, structured to add more types later: websites, design patterns, etc.).
1. For a hiring manager who wants to know what's actually been built, not just that AI is "used."
2. Per entry: icon, name, category tag (e.g. "Chrome extension"), one-line description, and a live link so they can try it themselves.
3. One placeholder entry ("Laurel Ipsum") ships in Phase 1 to validate the layout before real projects go in.

### 4. "My AI Tech Stack" section
A separate section on the "Built with AI" page (below the project list) listing the AI tools/tech in Som's workflow, independent of which project used which tool.
1. Per tool: icon, name, and a one-line role (what Som specifically uses it for: research, prototyping, coding, diagramming, etc.).
2. One placeholder tool ships first to validate the layout before the real stack goes in.

## Scope

1. **Phase 1: Layout and structure**: build the bullet, footer, nav link, and "Built with AI" page with placeholder copy (one sample entry: "Laurel Ipsum"), so the structure can be reviewed before real content goes in.
2. **Phase 2: Content**: build the project list and "My AI Tech Stack" section with placeholder data, then Som supplies real copy (bullet, footer line, project entries, tool stack) to swap in.
3. **Phase 3: High-resolution version**: visual polish pass once content is final (spacing, card styling, imagery/icons per project).

This plan now covers **Phase 1** (done) and the start of **Phase 2**.

## Phase 1 build

Task list, strike out as each is done. One task per session.

### Task 1: Add intro bullet
This session covers Task 1 only.
1. ~~[x] `index.html`: add intro bullet~~

### Task 2: Mention "built with AI" in the footer
1. ~~[x] `index.html`: mention built with AI in footer~~
2. ~~[x] `writeups.html`: mention built with AI in footer~~

### Task 3: "Built with AI" nav link + blank page
To begin with, just a blank page: nav and footer present, no body content yet. Body content (project cards, data file) is a separate plan to be made later.
1. ~~[x] `index.html`: add "Built with AI" nav link (desktop + mobile)~~
2. ~~[x] `writeups.html`: add "Built with AI" nav link (desktop + mobile)~~
3. ~~[x] `built-with-ai.html` (new): nav + footer only, no body content~~
4. ~~[x] `tailwind.config.js`: add new page to `content` array~~

## Phase 2 build

Task list, strike out as each is done. One task per session. Numbering restarts for this phase.

### Task 1: Project list, body content
Explored 6 visual variants in a throwaway `demo-cards.html` (deleted after review). Chose **horizontal list row**: fixed-size icon left, name + type tag + one-line description stacked, outbound arrow-icon link on the right, each row its own bordered card (arrow shows on hover). Reuses the `window.__X__` + inline-render-script pattern from `writeups.html`.
1. ~~[x] `assets/js/built-with-ai-data.js` (new): `window.__BUILT_WITH_AI__` array. Real entries: Skimmet, Design Teardown, the portfolio site itself, the Play Store review scraper, and Clarity by Som — all real content, no placeholders left.~~
2. ~~[x] `built-with-ai.html`: below the header block, container + inline `<script>` rendering one row per entry: real icon image (or initials-avatar fallback when no icon set), name, type tag, description, outbound link (new tab). Below `sm:` (576px) the row and its name/tag stack fully vertical; the hover-only arrow icon is hidden on mobile so cards hug their content. Verified desktop + mobile.~~

### Task 2: "My AI Tech Stack" section
Explored several directions in throwaway demo files (deleted after review): a task→tool mapping layout (grouped chips, tried as both a full-width list and a desktop sidebar) and a wiring-diagram hover visualization. Dropped the task-mapping approach — a tool's role changes too often to keep a per-task list accurate — in favor of an **open-ended flat logo row**: no task labels, so adding/removing a tool is a one-line data change. Landed on placing it inline beside the "Built with AI" H1 first, then moved below the intro description line per feedback (drops below the heading and wraps on mobile either way).
1. ~~[x] `assets/js/ai-tech-stack-data.js` (new): `window.__AI_TOOLS__` flat array (name + logo), no task/category mapping. 9 real tools: Claude, Cursor, ChatGPT, Gemini, Figma, Fireflies.ai, Fathom, Wispr Flow, Notion AI. One icon per distinct logo (Claude Code and Claude share one entry; Figma AI and FigJam AI share one) so no icon repeats.~~
2. ~~[x] `built-with-ai.html`: logo row rendered just below the intro description in the hero block, 24px icons, no bounding box per icon. All logos self-hosted as `.svg` in `assets/img/built-with-ai/stack/` (real vector where the brand publishes one; PNG-favicon-wrapped-in-SVG for Fireflies.ai, Fathom, and Wispr Flow, upgraded to higher-res sources first).~~

No `tailwind.config.js` change needed: `built-with-ai.html` and `assets/js/**/*.js` are already in its `content` array.

This file is the living task list for this initiative. When a task is done, mark it `~~struck through~~`. When a new task comes up ("hey, we need to do XYZ"), it gets added here as a new task block.

## Verification
1. ~~[x] `npm run build:css`, `npm run dev`, open preview.~~
2. ~~[x] Bullet and footer appear on homepage, styled consistently.~~
3. ~~[x] Footer appears on all pages.~~
4. ~~[x] Nav link (desktop + mobile) opens `built-with-ai.html` with correct active state.~~
5. ~~[x] Project list renders 5 real cards (icon, name, type tag, description, outbound link).~~
6. ~~[x] AI tools logo row renders below the intro description, real logos, no placeholders.~~
7. ~~[x] Checked mobile width: project rows stack fully below `sm:` (576px); logo row wraps under the description. No overflow.~~
8. ~~[x] Footer still sits at the bottom of the viewport when page content is short.~~
