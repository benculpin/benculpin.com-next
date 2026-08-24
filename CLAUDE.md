# benculpin.com — working notes

Read this before the README, and before changing anything.

## What this repo is

**This is the live site.** https://www.benculpin.com is built from `main` in this
repo by Cloudflare Pages (project `benculpin-com-next`). A push to `main`
publishes. There is no staging step in between.

Two other repos exist and are easy to confuse with this one:

| Repo | What it is |
|---|---|
| `benculpin/benculpin.com-next` | **this one — live** |
| `benculpin/benculpin.com` | refund-safe Webflow replica. Do not attach a domain or move DNS to it |
| `benculpin/damkind.xyz` | replica of the podcast site, still on Webflow at damkind.xyz |

Dam Kind is a separate site. Never move Photography, Notebook or About onto it.
Its audio stays on the Anchor RSS feed, `https://anchor.fm/s/f2c1e7f4/podcast/rss`.

## Stack

Astro 5 (`astro ^5.13.0`). Static output, no React, no CMS, no client framework.
`astro.config.mjs` sets `site: https://www.benculpin.com`.

```
npm install
npm run dev      # astro dev --host, http://localhost:4321
npm run build    # output to dist
npm run preview
```

A `bun.lock` is committed. If you run `npm install` it will create a
`package-lock.json` — do not commit it.

## Hard rules

Unless Ben says otherwise, in the session, in his own words:

1. **Never push or force-push `main`.** Branch as `preview/…` or `experiment/…`.
2. **Preview first.** Nothing goes live until Ben says "go live". He merges, not you.
3. No unasked redesign of type, colour or IA. Quiet local experiments are fine,
   but they are not a proposal for the live site.
4. Do not ghostwrite About. Do not rewrite Notebook essays.
5. Do not touch work / CoWork / DEPT accounts from here.
6. **No X, no Instagram.** He is off X and Instagram is deactivated. Footer
   socials are LinkedIn and YouTube, and that is the whole list.
7. Film lives at `/film`, never `/films`. Keep the 301s. The `films.ts` filename
   and the image folder names stay as they are.
8. **No contact form on About**, and no Contact button that jumps to one.
   `mailto:benculpin@gmail.com` is enough. Do not restore Formspree.
9. Do not watermark photos. Do not print the email address on photography pages.
10. No "all rights reserved" beside the look line. A quiet `© Ben Culpin` in the
    site footer is allowed only if he asks for it.
11. Do not shrink the Nuance set. It is deliberately the one full-size set here.
12. Commits on Ben's machine are authored `Ben Culpin <benculpin@gmail.com>`.

## Locked IA (17 Aug 2026)

Nav is Notebook · Photography · Film · Podcast · About. The `BC` wordmark is the
home door.

**Photography is only photographs. Notebook is only writing. Neither is an
aggregator.** A photo set and its write-up are two separate pages. Each links to
the other at the bottom, and only at the bottom: photo pages lead with pictures
then the link, notes lead with the writing then the link. Do not list the same
piece on both landings just to cross-link it.

Notebook landing tags are a single word, no hash: `note`, `photography`, or
`film`. The word names the *other* door, not the page you are on. A note that
also has a photo set is tagged `photography` only — Nuance is the one example.
Most rows are `note`. Never stack two words.

Alignment is a left spine shared with the BC logo: titles, one-liners, photo
grids, note text and bottom links all sit on that edge. Notes use
`--measure: 40rem`.

Home is "Hi, I'm Ben." / "Considered listener, creative thinker." / Learn more →
About. `/home` redirects to `/photography`. The Podcast page is a quiet door —
Host and Subscribe stay split, and the show itself lives at damkind.xyz. About is
v4 (Roots / Frontiers); he is Head of Research at DEPT.

## Copy that must not be "improved" without asking

- Look line: *These photos are here to look at. Please ask before using them.*
- Home: *Hi, I'm Ben.* / *Considered listener, creative thinker.*
- Podcast: *Amsterdam based researcher, Ben Culpin, explores humane perspectives
  from those with lived experience.*
- Nuance lede: *Pushing the limits of an iPhone.*
- Portraits lede: *Selected portraits of dear friends, loved ones, and strangers.*

## Design tokens

Source Sans 3 for body, Source Serif 4 for headings. From `src/styles/global.css`:
`--black #111`, `--text #222`, `--muted #5c5c5c`, `--tag #7a7a7a`,
`--hairline #e8e8e8`, `--pale #f6f6f5`, `--story-gap 24px`.

Photography landing is a two-up gallery (`.photo-index`). On a story page the
first photo is full-bleed and the title sits with it. Row kinds are
`bleed | pair | full`. Keep it quiet.

## Photography

New sets are **folders, not code**. Do not add objects to `photography.ts`.

```
public/images/photography/<slug>/
  set.txt          # line 1 title, line 2 one-liner/date, line 3 "story"
  cover.jpg        # landing card only, never repeated in the gallery
  01.jpg 02.jpg …
```

Line 2 sorts the landing by trip date, newest first. Full instructions for Ben
are in `public/images/photography/HOW-TO-ADD-A-SET.txt` — keep that file in plain
language, it is written for someone who does not know GitHub.

Three legacy sets are still hardcoded in `src/data/photography.ts` and skipped by
`loadFolderSets`: `nuance-of-experience`, `portraits-and-moments`, `saudi-arabia`.

Story row order is currently hardcoded in `src/pages/photography/[slug].astro` as
`TAIWAN_STORY`, `PHILIPPINES_STORY` and so on. **PR #11 replaces this with a
`story.txt` per folder** — check whether it has merged before touching that file.

Image sizes: most travel sets are 2000px on the long edge. Spain and Christmas
are 1086px iPhone shares, so do not upscale them. Portraits and Saudi are ~1600.
Nuance is 4032×3024 and is meant to stay that way. Camera originals live in
Drive, not here: `My Drive / 1. Projects / Websites / benculpin.com-photo-drops`.

The look/ask block carries `id="look"` so the TDM policy can point at `#look`.
Ask is `mailto:benculpin@gmail.com?subject=Photography`; the address is never
printed as text.

## Notebook

Posts are `.md` files in `src/pages/notebook/` using `NoteLayout.astro`. The
landing list in `index.astro` is hardcoded and **its order is hand-curated, not
derivable** — ten notes share `pubDate: 2023-01-30`, and `freelance.md` is dated
2023-03-01 yet sits eleventh. Any rewrite must preserve that order explicitly.
The one-word landing tag *is* derivable: a `photography:` key in frontmatter
means `photography`, everything else is `note`.

"Memoirs of a Gringo" is off-limits.

## Workflow

```
git checkout -b preview/<name>
# work, commit
git push -u origin preview/<name>
```

Cloudflare builds a preview at
`https://preview-<name>.benculpin-com-next.pages.dev`. Open a **draft** PR, give
Ben the preview URL, and stop. He merges.

## Known live issues, found 24 Aug 2026

Not yet fixed. Do not "discover" them again.

1. **`https://benculpin.com` times out.** DNS is at Hover (`ns1.hover.com`), not
   Cloudflare. The apex points at Hover's redirect service (`216.40.34.41`),
   which serves HTTP but has no working TLS, so HTTPS hangs for ~15s. `www` is
   fine. Fixing it needs Hover access, or moving nameservers to Cloudflare.
2. **`trailingSlash: "never"` is not what actually happens.** Pages 308-redirects
   `/photography/tunisia` to `/photography/tunisia/`, the opposite of the config.
   Every internal link pays a redirect hop.
3. **No `sitemap.xml`** — it 404s, while `robots.txt` advertises `search=yes`.
   `@astrojs/sitemap` is not installed.

## Do not start with

Webflow export cleanup, restoring the contact form, putting Photography onto Dam
Kind, or a loud portfolio redesign. None of these are wanted.
