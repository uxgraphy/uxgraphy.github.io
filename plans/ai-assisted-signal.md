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
2. Per entry: name, one-line description, tech/AI-role (what AI specifically helped with), and a live link so they can try it themselves.
3. One placeholder entry ("Laurel Ipsum") ships in Phase 1 to validate the layout before real projects go in.

## Scope

1. **Phase 1: Layout and structure** — build the bullet, footer, nav link, and "Built with AI" page with placeholder copy (one sample entry: "Laurel Ipsum"), so the structure can be reviewed before real content goes in.
2. **Phase 2: Content** — Som supplies real copy for the bullet, footer line, and each project entry (name, description, AI's role, live link); swapped in.
3. **Phase 3: High-resolution version** — visual polish pass once content is final (spacing, card styling, imagery/icons per project).

This plan covers **Phase 1** only.

## Phase 1 build

Task list — strike out as each is done. One task per session.

### Task 1: Add intro bullet
This session covers Task 1 only.
1. ~~[x] `index.html` — add intro bullet~~

### Task 2: Mention "built with AI" in the footer
1. ~~[x] `index.html` — mention built with AI in footer~~
2. ~~[x] `writeups.html` — mention built with AI in footer~~

### Task 3: "Built with AI" nav link + blank page
To begin with, just a blank page: nav and footer present, no body content yet. Body content (project cards, data file) is a separate plan to be made later.
1. [ ] `index.html` — add "Built with AI" nav link (desktop + mobile)
2. [ ] `writeups.html` — add "Built with AI" nav link (desktop + mobile)
3. [ ] `built-with-ai.html` (new) — nav + footer only, no body content
4. [ ] `tailwind.config.js` — add new page to `content` array

This file is the living task list for this initiative. When a task is done, mark it `~~struck through~~`. When a new task comes up ("hey, we need to do XYZ"), it gets added here as a new task block.

## Verification
1. `npm run dev`, open preview.
2. Bullet and footer appear on homepage, styled consistently.
3. Footer appears on all pages.
4. Nav link (desktop + mobile) opens `built-with-ai.html` with correct active state.
5. Placeholder card renders (badge, name, description, AI-role line, outbound link).
6. Check mobile width.
