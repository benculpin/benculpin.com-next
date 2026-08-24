import fs from "node:fs";
import path from "node:path";

export type StoryRow = { kind: "full" | "pair" | "bleed"; files: string[] };

const PHOTO_DIR = path.join(process.cwd(), "public/images/photography");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const KINDS = new Set(["full", "pair", "bleed"]);

function isCoverFile(file: string) {
  return /^cover\.jpe?g$/i.test(file);
}

/** Gallery images in a set folder, cover excluded, numerically sorted. */
function galleryFiles(slug: string): string[] {
  const dir = path.join(PHOTO_DIR, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()) && !isCoverFile(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/**
 * Read story.txt and turn it into rows.
 *
 * One row per line: a kind (full | pair | bleed) then the photos on that row.
 * The extension is optional, so `pair 02 03` and `pair 02.jpg 03.jpg` both work.
 * Blank lines are ignored and anything after # is a comment.
 *
 * Photos in the folder that story.txt never mentions are added as full rows at
 * the end rather than dropped, so adding a photo without editing story.txt can
 * never make it silently disappear.
 */
export function loadStoryRows(slug: string): StoryRow[] {
  const files = galleryFiles(slug);
  if (!files.length) return [];

  const storyPath = path.join(PHOTO_DIR, slug, "story.txt");
  if (!fs.existsSync(storyPath)) {
    return files.map((file) => ({ kind: "full", files: [file] }));
  }

  // "01" and "01.jpg" both need to find 01.jpg on disk.
  const byStem = new Map<string, string>();
  for (const file of files) {
    byStem.set(file.toLowerCase(), file);
    byStem.set(path.parse(file).name.toLowerCase(), file);
  }

  const rows: StoryRow[] = [];
  const used = new Set<string>();
  const missing: string[] = [];

  const lines = fs.readFileSync(storyPath, "utf8").split(/\r?\n/);
  lines.forEach((raw, index) => {
    const line = raw.split("#")[0].trim();
    if (!line) return;

    const [kindWord, ...names] = line.split(/\s+/);
    const kind = kindWord.toLowerCase();
    if (!KINDS.has(kind)) {
      console.warn(`[story] ${slug}/story.txt line ${index + 1}: unknown row kind "${kindWord}" — skipped.`);
      return;
    }

    const resolved: string[] = [];
    for (const name of names) {
      const file = byStem.get(name.toLowerCase());
      if (!file) {
        missing.push(name);
        continue;
      }
      resolved.push(file);
      used.add(file);
    }
    if (resolved.length) rows.push({ kind: kind as StoryRow["kind"], files: resolved });
  });

  if (missing.length) {
    console.warn(`[story] ${slug}/story.txt mentions photos that are not in the folder: ${missing.join(", ")}`);
  }

  const leftover = files.filter((file) => !used.has(file));
  if (leftover.length) {
    console.warn(`[story] ${slug}: ${leftover.length} photo(s) not in story.txt, shown full width at the end: ${leftover.join(", ")}`);
    for (const file of leftover) rows.push({ kind: "full", files: [file] });
  }

  return rows.length ? rows : files.map((file) => ({ kind: "full", files: [file] }));
}
