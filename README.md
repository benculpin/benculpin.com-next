# benculpin.com-next

An exploration fork of the personal site. Same pages, copy, photos, and IA — refined so it reads as a current personal site rather than a Webflow export.

This is not the live domain. The refund-safe replica remains https://github.com/benculpin/benculpin.com. Do not attach a custom domain or cut over DNS from this repo.

## Notes

Exploration fork only. Original replica is benculpin/benculpin.com.

## Develop and build

Use the Node scripts in package.json. Output directory is dist.

## Contact form

The About form currently posts to a hash stub. Wire Formspree in src/pages/about.astro when ready.

## Known differences vs live

- Footer Freelance now links to /notebook/freelance (live /words/freelance 404s).
- Photography heading Saudi Arabia (live has the typo Suadia Arabia).
- CV Drive link is kept as on live but that file currently 404s.
- About bio is the live copy, unchanged.
- Notebook posts include live bodies and local images.
- Contact form is a stub until Formspree is wired.

## Paths

/  /about  /notebook  /notebook/{slug}  /photography  /photography/{slug}  /films  /films/{id}  /home (redirects to /photography)
