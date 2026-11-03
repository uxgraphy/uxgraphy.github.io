# public-snippet

Code files that visitors can see on the live site.

## What belongs here

- Scripts and code samples shown to visitors, for example in the code viewer on the "Built with AI" page.
- Everything in this folder is served publicly. Do not put private or work-in-progress files here.

## What does not belong here

- Dev-only tools (build steps, the OG image generator). Those go in `scripts/` at the repo root, outside `public/`.
- The site's own JavaScript. That goes in `public/assets/js/`.

## How a snippet gets onto the site

1. Add the file to this folder (`public/assets/public-snippet/`).
2. Add an entry in `public/assets/js/built-with-ai-data.js` with `modal: true` and `scriptUrl: "assets/public-snippet/<file>"`.
3. Open `built-with-ai.html` and click the entry to check that the code viewer loads the file.

## Files

| File | Used by |
|---|---|
| `play-store-review-scraper.js` | "Play Store Review Scraper" entry on `built-with-ai.html` |

If you rename or move a file here, update `scriptUrl` in `public/assets/js/built-with-ai-data.js` or the viewer will break.
