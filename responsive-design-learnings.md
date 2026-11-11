# Responsive Design Learnings: Desktop, Tablet and Mobile

Source: `index.html`. These are the rules we arrived at while adapting the desktop layout to tablet (768 to 1023px) and mobile (below 768px).

**Bottom line:** Tablet is not a smaller desktop. It needs its own type scale, gutters, card treatment and spacing, all tied to one grid.

---

## 1. Breakpoints

1. Tablet: 768 to 1023px.
2. Desktop: 1024px and up.
3. Mobile: below 768px. It has its own layout block (see section 12), built from the tablet rules.
4. **The catch:** Tailwind `lg` is 992px, but the page's own rules switch at 1024px. Pick one boundary and use it everywhere, or a band of widths gets half of each layout.

## 2. Grid and section padding

1. Base grid: 56px. Sections snap to multiples of 56.
2. **Rule:** every section has equal *visible* top and bottom padding.
3. Measure to the ink, not the box. A heading's line box has empty space above the cap height, so we offset by the cap height when measuring.
4. Measure to card edges, not to the text inside them.
5. If the content height is not a multiple of 56, round up and split the extra evenly between top and bottom.
6. **Why it matters:** padding that matches by the numbers but not to the eye still looks broken.

## 3. Spacing scale

| Spacing | Tablet | Desktop |
|---|---|---|
| Content gutter (left and right) | 40px | existing |
| Case-study card gap | 32px | 32px |
| Case-study divider gap | 32px | 32px |
| Group label to card | 32px | 32px |
| Thumbnail to card text | 0 (joined card) | 32px |
| Room above each case-study group label | 56px | 56px |
| About card gap and divider gap | 24px | 32px |
| About inset from the right | 24px | 32px |

1. **Rule:** use one value for related gaps. When the divider gap, card gap and label gap all match, the section reads as one system.
2. Gaps that differ by a few pixels look like mistakes, not choices.

## 4. Typography

1. Use one fluid base and one ratio for the whole page:
   - Base: `clamp(16px, 13px + .39vw, 18px)`
   - Ratio: 1.4
2. Hero H1 = base × 1.4⁴. Section H2 = base × 1.4². Impact headline = base × 1.4. Card title = base.
3. **Why it matters:** fixed sizes per breakpoint caused hierarchy flips at the 1023/1024px boundary. A fluid scale keeps the order intact at every width.
4. Long headings: allow wrapping and use `text-wrap: balance` so lines come out even.
5. Card titles: sentence case and the ink color. All caps at small sizes hurts reading.
6. Meta text (tablet and up): 14px, weight 500, sentence case, muted (`#655f5a`). Normal case reads better than small caps at this size.
7. **Open issue:** group labels (about 18 to 20px) are now larger than case titles (about 16.5 to 18px). The hierarchy needs a check.

## 5. Cards

### Case-study cards

1. Desktop: one card per row, no background. The thumbnail and text sit side by side.
2. Tablet: two cards per row. Each becomes one joined card:
   - Background: cream lighter than the page (`#fefdfb`)
   - Border: 1px `#ebe8de`
   - Radius: 36px
3. Only add the card background when cards sit 2 per row. In a single column, a background box adds noise.
4. Columns must align. Stretch the cards to equal height, and push the CTA to the bottom with `margin-top: auto`.
5. Body padding: 32px, which matches the gap scale.

### Product line (title + meta)

1. Desktop: title, then a thin 1px rule (`#cfc9be`, about 13px tall), then the meta, all on one line.
2. Tablet: meta stacked under the title, with a 4px gap.
3. **Rule:** keep the text style the same across breakpoints. Change only the layout.

### Separators

1. An inline separator (a dot or a rule) is safe only where the content always fits on one line.
2. **The catch:** in narrow cards, a long title ("Campaign management app") wraps. The next line then starts with the separator, and that card's height no longer matches the others.
3. Where wrapping is possible, stack the items instead.

### Thumbnail inside a card (Option A)

1. Inset the thumbnail 6px from the card's edge (top, left, right; 0 at the bottom). Started at 12px, halved for a tighter frame.
2. The thumbnail gets its own radius: card radius minus inset (36 − 6 = 30px).
3. **Rule:** nested radius = outer radius − gap. Otherwise the corners look wrong.
4. Keep the whitespace around the image balanced. Fix the image's aspect ratio, use `object-fit: contain`, and anchor the image to the bottom so the padding reads evenly.
5. Uniform top gap on every card and at every width: give the image box the widest screenshot's ratio (2170x1410) and a fixed 32px top and side gap. Narrower shots then get wider side gaps, never a bigger top gap. Let the thumbnail set the card height instead of a fixed min-height.
6. Some screenshots are slightly narrower than the frame (for example 1306x880 against 2170x1410). For those, fill the width with `object-fit: cover`, anchored to the top, and let the bottom crop (6 to 10px). The left, right and top gaps then match the widest card. Don't do this for tall phone shots: cover would cut most of the screen.
7. Bottom edge: a faint warm-neutral inner shadow (page ink `rgba(28,25,23)` at 3%, fading out within 12px) plus a 4% hairline. Neutral reads as depth and works at low strength; a hue-matched tint had to be strong to show, and then it shouted.

### Whole-card click and hover (tablet and mobile, about cards at every width)

1. The whole card opens the case study (in a new tab). A script handles the click, and skips it when the click lands on a link or the user is selecting text.
2. The CTA keeps its own hover effect. Hovering the card does not trigger it, so the button stays a clear target.
3. Card hover: scale 1.02 with a springy ease, and the background turns white. Pressed: scale 0.98. Only on devices that can hover, and off for reduced motion.
4. Don't also scale the thumbnail inside a scaling card. Two scales at once look wobbly.

### About cards

1. Same cream fill and border as the case-study cards, with a 24px radius and 24px padding.
2. Make the cards equal height, with the link pinned to the bottom.
3. Removing the divider line above each CTA cleaned up the card. A filled card does not need inner dividers.
4. Give the link area a fixed height (54px) so CTAs line up across cards, even when their copy differs in length.

## 6. Dividers

1. The curved divider must not touch the viewport edge. It sits 8px outside the content group.
2. Keep the curve radius (48px). Removing it made the divider feel generic.
3. Keep the right border. The section looked unfinished without it.

## 7. Buttons and CTAs

1. Minimum height: 44px (touch target).
2. Tablet case-study CTA: full width of the card.
3. Do not shrink CTAs to make them fit. Fix the layout around them.

## 8. Header and footer

1. On tablet, align both to the same 40px content gutter as the page.
2. Header signature: 72px tall at every width. Never resize the logo; there is room for it even at 320px.
3. Footer signature: keep its original 56px.
4. **Rule:** the brand mark keeps one size. Fix the layout around it instead.

## 9. Hero

1. Photo height: `clamp(340px, 46vw, 448px)` on tablet, so it shrinks smoothly instead of jumping.
2. The row gap between text and photo is fluid as well.
3. Lime headline shadow: size it in em (about 0.08em, whole pixels), not fixed px. A fixed 2px suited a 26px headline but looked thin at 61px.

## 10. UI carousel

1. Size the stage from the viewport, minus the side padding, so it never overflows the page gutters.
2. Round the stage height down to a whole number of 56px grid units (`round(down, …, 56px)`), so its height sits on the grid.
3. Then shift the stage at most 28px so its top lands on the nearest grid line. A script does this, because its position depends on the content above.
4. **The catch:** the shift makes the gaps above and below the carousel uneven (for example 62px and 21px on desktop).
5. Pager: sit its bottom edge on the grid line one cell (56px) under the carousel, and ideally make its width an odd number of cells so both ends sit on grid lines (we chose 160px by eye, 32px tall, with 16px arrows for readability). The grid is centred on the page, so an odd width puts both ends on grid lines.
6. Name the control after how it behaves. The slides flip like cards, so a carousel-style track with a sliding thumb was misleading. The "deck" pager (prev, the current project's name, next) says what you're looking at and what the buttons do.
7. A label that changes with a slide should move the same way the slide does: same direction (forward turns out to -90deg, the new one comes in from +90deg, back is mirrored) and the same timing.
8. Every icon button needs all its states: default, hover (lime, only where hover exists), pressed (whole button scale .96, no colour change; never scale just the icon, it thins the stroke and hurts legibility), keyboard focus (2px ink ring), disabled (faded, if it can disable). The deck arrows never disable because they loop.
9. Don't announce an auto-advancing label with `aria-live`; it would interrupt screen reader users every few seconds.
10. Slides behave like the cards: 1.02 on hover (only where hover exists), 0.98 when pressed, same spring (0.45s, `cubic-bezier(.34,1.7,.5,1)`). Scale from the bottom middle (`origin-bottom`), so the slide grows up out of its base instead of from its center.

## 11. Motion

1. No reveal or blur-in animations on scroll. They were tried and removed: blurring large screenshots is expensive, and late reveals make the page feel janky while scrolling.
2. Keep motion for direct feedback only, such as hover and press.
3. Every clickable thing gets a press effect, and the same kind of thing gets the same one: cards and slides scale to 0.98, small controls (menu items, badges, icon buttons) to 0.96. A link with no press effect feels dead next to ones that have it.
4. Hover scale-ups (1.02) use `[@media(hover:hover)]:` so touch screens don't get stuck in the hover state after a tap.

## 12. Mobile (below 768px)

1. Same cream joined cards as tablet, one per row: 36px radius, 6px thumbnail inset, 32px body padding.
2. Remove the curved dividers on case studies and "You might want to know". On a narrow screen they crowd the content.
3. Right gutter on cards: 12px, matching the Tailwind column gutters.
4. Product line: meta stacked under the title, no separator.
5. CTA: full width, pinned to the card's bottom.
6. Group label to first card: 32px. Room above each group: 48px for the first, 56px after.
7. Headings use `text-wrap: balance`.

## 13. UX copy

1. Link labels should name the content type and the action:
   - "See peers' testimony"
   - "Read mentee reviews" (written reviews, so "Read")
   - "Browse all writeups"
2. Match the verb to the medium: read text, watch video, browse a collection.

## 14. Process

1. Measure every change in the browser (`getBoundingClientRect`). Do not trust the CSS values alone.
2. When the user is unsure, show variants with a temporary control panel. Once a choice is made, make it final and delete the panel and all its code.
3. Test variants against the longest real content, not just the first card.
4. Scope each change to the right breakpoint. Most fixes here were tablet only, and several were later extended to desktop on request.
5. If a script sets inline styles (like the grid snap), change the script rather than fighting it with CSS.
6. Before adding a `::before` or `::after`, check that the element doesn't already have one. `.cs-thumb::after` already had `height: 1px` in tailwind.css, which silently squashed a full-size overlay. Verify the pseudo-element's computed size, not just that the rule loaded.
7. **CSS lives in Tailwind's pipeline, never in the HTML.** No `<style>` blocks, no `style=""` attributes. Simple one-off values go in the markup as utilities (arbitrary values like `max-w-[1140px]`; prefix `!` when replacing an old inline style so it still wins). Rules that need complex selectors, media queries or pseudo-elements go in `src/home-experiment.css`, which builds to `assets/css/home-experiment.css` (`npm run build:css`). Keep JS hook classes (`dk`, `nm`) as bare names with no CSS. For hover-only styles use `[@media(hover:hover)]:hover:`, since the site does not turn on Tailwind's hover-only mode.
8. Don't minify page CSS that was moved in as-is: the minifier rewrote SVG data URIs, and its rule merging can change the cascade.
9. "Restore the original version" means the state just before that round of variants (the panel's "Now" option), not the last commit. Values may have been hand-tuned between turns, so read the file before swapping class strings back.
10. On this branch `tailwind.css` is committed unminified. Before committing, rebuild without `--minify` (`npx tailwindcss -i ./src/input.css -o ./public/assets/css/tailwind.css`). The minified build turned a small change into a 5,000-line diff.

## 15. Porting the pattern to another page (Career Tidbits)

Source: `career-tidbits.html`, ported from `index.html` on desktop, tablet and mobile.

1. Reuse the home page parts as they are: header, hero band, cream band, footer. Apply a pattern only where the element or component matches. Where a part is clearly different, leave it alone.
2. Icons must move to the new palette too. Icons left in the old brand color were the first thing that stood out. **Exception:** third-party brand logos (Substack, Medium, Quora, LinkedIn) keep their own colors. Grey logos were tried on Writeups and rejected.
3. Body text: max width 700px. 600 and 640px were tried and felt too narrow.
4. Tidbit lines use the base size: 16px with a 140% line height (`text-base leading-[1.4]`, 22.4px). 18px read too large for a list of short statements, and 28px leading spaced them like separate paragraphs.
5. Band padding: exactly two grid cells (112px) top and bottom, one cell (56px) below 768px.
6. **The catch:** section 2 splits leftover space into the padding. For a list band, that makes the padding uneven. Instead, keep the padding fixed and spread the leftover across the row gaps (the `fit()` script does this).
7. Don't use a timeline for items that aren't a sequence. A timeline promises an order the content doesn't have.
8. An accent should not copy the band's accent at full strength. A lime disc behind the eyebrow icon clashed with the lime band until it was toned down by 24%. In the end the plain original icon was kept.
9. Hero, tidbit list and eyebrow variants were all tried and the originals kept. When a page is ported cleanly, the original layout is often the strongest option.

## 16. Porting the pattern to a list page (Writeups)

Source: `writeups.html`, ported from `career-tidbits.html`.

1. Header, hero band, cream band and footer ported as they are. Tablet and mobile needed no changes: the shared CSS already handles gutters, the fluid type scale and band padding.
2. Year groups are section headings, so they use the same `h2.heading-2` as the Tidbits sections. The old rule under each year was dropped.
3. The `fit()` script works for any list band: band padding stays at 112px (56px below 768px) and the leftover goes into the gaps between year groups.
4. **Hero subtitle:** it must fit on one line on desktop. Long copy turns the lime pill into a two-line block. The platform list was cut, since each row's logo already shows the source.
5. List titles: 16px fixed, 28px line height, max width 700px. Rows are 52px tall, above the 44px touch minimum.
6. Subtitle copy: "I write about design, craft, and product." Short enough for one line from 768px up and two balanced lines on phones. "Write about" fits a topic list; "write on" reads as a surface.

### Brand logos next to text

1. Trim each logo's `viewBox` to the glyph itself. Stock 16x16 boxes have different amounts of empty space, so equal box sizes look unequal.
2. Equal visual weight = box area × √(share of the box that is filled in). Solid marks (Medium, 72% filled) get a smaller box, outlined ones (Quora, 44%) a larger one.
3. Anchor the set to the title: the most square logo (Quora) is as tall as the title's font size. At cap height (about 0.7× the font size) the logos read too small.
4. Size logos and their slot in `em` so they scale with the title. The slot is a fixed width (1.2222em) and line height (28px), centered on the first line, so titles stay aligned whatever the logo.

### Row interaction states (final)

1. Rest: no fill, dashed underline.
2. Hover: a fully rounded white pill, ink title (`#14143A`), solid underline, and the source logo turns into a ↗ arrow (it says the link opens in a new tab). The logo slides out to the top right and the arrow slides in from the bottom left, clipped by the logo slot, with a slight spring. The arrow takes the logo's brand color.
3. Pressed: the arrow nudges up and right. Keyboard focus: 2px ink ring, and the arrow shows as on hover. Reduced motion: a plain crossfade, no sliding.
4. An arrow placed after the title was tried first. Swapping it into the logo slot keeps the title clean and puts the "opens elsewhere" cue right where the source is named.
5. Hover padding grows in multiples of 4 and only sideways: left +8px, right +4px, top and bottom +0. Chosen by eye after trying +4px and +8px on every side.
6. Draw the growth with `box-shadow` rings in the fill color, not real padding, so nothing moves. Offset shadows give uneven growth per side (`-8px 0 0 0 #fff, 4px 0 0 0 #fff`).
7. Tried and rejected: card lift, underline sweep, lime marker, dimming the other rows, a left rail, and an off-white fill at rest (the rows touch, so the pills merged into one long strip).

### Process

1. Tailwind's watch mode never drops classes, so variants leave unused CSS behind. Before committing, rebuild both files unminified from scratch.
2. `:hover` can't be forced from a script. To check a hover state, copy its rules with `:hover` swapped for a class. Watch out for escaped class names that contain `\:hover`, which the swap breaks.

## 17. Porting the pattern to a card grid (Built with AI)

Source: `built-with-ai.html`, ported from `writeups.html`.

1. Header, hero band, cream band and footer ported as they are. The script viewer stays dark: it's a code viewer, not a page component.
2. Its accents still move to the new palette: the Copy button is lime with ink text, and the close button turns lime on hover. A dark component is not an exception to the palette. The orange Copy button was missed at first and stood out.
3. Grid: 3 columns from 1024px, 2 from 768px, 1 below. Gaps 32px, 24px below 768px.

### Joined cards

1. The card blends the about cards and the case-study cards: off-white card (`#fefdfb`, `#ebe8de` border, 24px radius), 48px icon, 22/30 title, uppercase meta line, body text, and a CTA row pinned to the bottom.
2. Icons without a logo get an ink tile with a lime glyph (`#14143A` / `#C8F169`). Third-party logos keep their own colors.
3. Hover: the card scales to 1.02 with a springy ease. Pressed: 0.98. Only on devices that can hover.

### CTA copy and hover

1. The CTA names where the click goes: "Open Chrome Web Store", "Open uxgraphy.github.io", "View script". Never repeat the type shown in the meta line.
2. "Add to Chrome" was rejected: the click opens the Web Store, it doesn't install anything. Promise only what the click does.
3. Say "my portfolio", not the full name. The page is already in first person.
4. The CTA hover must copy the home about-card link exactly: dashed underline at rest, a solid line sweeps from the text to the arrow on hover, 18px arrow in a 36px lime circle, 54px row (44px below 768px). A close match reads as a bug.

### Grid snap for a card grid

1. Gaps stay fixed and band padding stays at 112px (56px below 768px). The leftover goes into the card height instead: each row of cards grows by an equal share.
2. The CTA is pinned to the card bottom, so the extra height sits above it and looks intended.

### Hero tray with tool badges

1. Tray copy: "My AI stack:" with the badges right after it, on one line on desktop. Tried and rejected: a sticker jar, a marquee, badges below the tray, and longer copy ("AI tools in my day-to-day workflow").
2. Badges are overlapping white circles (36px, 2px ink border, 18px logo). Each lifts on hover and shows the tool name in a styled tooltip.
3. **The catch:** the hero's `.heading-3 span` rule turns every span into a lime pill. Build the badges from `<i class="not-italic">` instead of spans.
4. At 808px and below the tray is capped at 432px, so the label and badges stack. The colon is hidden at the same breakpoint, since it only makes sense when the badges follow on the same line. Check the exact breakpoint width: `max-[808px]` includes 808.
5. Badges are 36px on mobile. 44px badges pushed the row past the screen width.
6. Below 368px the badges wrap into two rows of 5 (`max-[367px]:flex-wrap`, capped at 152px wide). At 320px the single row ran off the screen.

### Process

1. `data-leaf` on an element makes the grid snap measure its outer edge, not the content inside it. Without it, the snap measured the logos and missed the tray's padding.
2. Background tabs don't run CSS transitions. Turn transitions off before measuring an end state, or the check reads the start value.
3. Class strings set from JS must be full literals so Tailwind's scan finds them. No building class names from parts.

## 18. QA pass across the ported pages

Source: `index.html`, `career-tidbits.html`, `writeups.html`, `built-with-ai.html`.

1. All four pages passed on band heights (whole 56px cells), band padding, gutters, the 700px text cap and the one-line desktop subtitle, at 1280, 1024, 1023, 768, 767, 375 and 320px.
2. Check the narrowest width (320px) every time. The only overflow found (the Built with AI badges) showed up there and nowhere else.
3. Remove old hover colors instead of leaving a later rule to hide them. The mobile menu still had the old orange `hover:text-[#F45E22]`. A later `#mobile-menu a:hover` rule masked it, so nobody saw it, but it was dead code waiting to come back.
4. Links to a section on another page must match by suffix: `[href$="#case-studies"]`, not `[href="#case-studies"]`. Off the home page the link is `index.html#case-studies`, so the exact match silently dropped its icon styles.
5. The home subtitle is a `<p class="heading-3">`, not an `h3`. It's a tagline, not a section heading, and an `h3` before any `h2` breaks the heading order for screen readers.

### Hero subtitle pill on mobile

1. When the pill wraps to two lines (below 768px): 24px line height, normal letter spacing, 8px top and bottom padding, 20px on the sides. The desktop values (4px / 16px) made a wrapped pill look cramped.
2. Keep the weight at 700. A lighter weight was tried and rejected: the pill lost its punch.
3. The Built with AI tray holds round badges, so it needs 36px side padding. With 20px the badges crowded the curved ends.
4. Shorter copy beats layout fixes. Cutting the Writeups subtitle got it back to one line on tablet.

### Process

1. Measure with one reusable script, run inside same-origin iframes at fixed widths in a background tab, then close the tab. Faster and steadier than resizing the visible pane.
2. Before reporting a visual bug, reproduce it. The orange menu tap was reported from the class list alone, but the cascade overrode it and it never showed.

