import fs from "node:fs";
import path from "node:path";
import type { Collection } from "./photography";

const PHOTO_DIR = path.join(process.cwd(), "public/images/photography");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Folders with a set.txt are photo sets Ben can add himself. */
export function loadFolderSets(existingSlugs: Set<string>): Collection[] {
  if (!fs.existsSync(PHOTO_DIR)) return [];

  const sets: Collection[] = [];
  for (const name of fs.readdirSync(PHOTO_DIR)) {
    if (existingSlugs.has(name)) continue;
    const dir = path.join(PHOTO_DIR, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    const metaPath = path.join(dir, "set.txt");
    if (!fs.existsSync(metaPath)) continue;

    const lines = fs
      .readFileSync(metaPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const title = lines[0] || titleFromSlug(name);
    const lede = lines[1];

    const files = fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXT.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (!files.length) continue;

    const coverFile = files.find((file) => /^cover\./i.test(file)) || files[0];
    sets.push({
      slug: name,
      title,
      lede,
      cover: `/images/photography/${name}/${coverFile}`,
      href: `/photography/${name}`,
      images: files.map((file) => ({
        src: `/images/photography/${name}/${file}`,
        alt: "",
      })),
    });
  }

  return sets.sort((a, b) => {
    const aTime = fs.statSync(path.join(PHOTO_DIR, a.slug)).mtimeMs;
    const bTime = fs.statSync(path.join(PHOTO_DIR, b.slug)).mtimeMs;
    return bTime - aTime;
  });
}
