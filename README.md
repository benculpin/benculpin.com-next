# benculpin.com

The live personal site of Ben Culpin — https://www.benculpin.com

Astro 5, static, no CMS. Cloudflare Pages builds `main` and publishes it, so a
merge to `main` goes live immediately.

> Working on this repo with an AI assistant? Read **[CLAUDE.md](CLAUDE.md)**
> first. It holds the locked information architecture, the hard rules, and the
> known live issues.

## Develop

```
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist
npm run preview
```

A `bun.lock` is committed. `npm install` will produce a `package-lock.json` —
leave it uncommitted.

## Pages

```
/                     home
/about                Roots / Frontiers, email link, no contact form
/notebook             writing
/notebook/{slug}
/photography          photo sets
/photography/{slug}
/film                 films (/films 301s here)
/film/{id}
/podcast              a door to damkind.xyz
/home                 redirects to /photography
```

## Adding a photo set

Create a folder under `public/images/photography/` with a `set.txt` and your
photos. No code changes. The step-by-step, written for the browser rather than
the command line, is in
[`public/images/photography/HOW-TO-ADD-A-SET.txt`](public/images/photography/HOW-TO-ADD-A-SET.txt).

## Adding a note

A note is a `.md` file in `src/pages/notebook/` using `NoteLayout.astro`. Add it
to the list in `src/pages/notebook/index.astro` — that order is hand-curated on
purpose, so put the new note where you want it to appear.

## Publishing

Work on a branch named `preview/<name>` and push it. Cloudflare builds a preview
at `https://preview-<name>.benculpin-com-next.pages.dev`. Review it there, then
merge to `main` to go live.

## Related repos

- [`benculpin/benculpin.com`](https://github.com/benculpin/benculpin.com) —
  refund-safe replica of the old Webflow site. Not the live site; do not attach a
  domain to it.
- [`benculpin/damkind.xyz`](https://github.com/benculpin/damkind.xyz) — replica
  of the podcast site, which is still served from Webflow at damkind.xyz.
