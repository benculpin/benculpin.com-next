import type { Collection } from "./photography";

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

const MONTH = "January|February|March|April|May|June|July|August|September|October|November|December";

export type TripRange = {
  start: string;
  end: string;
  kind: "month" | "year";
};

function toYearMonth(monthName: string, year: string) {
  return `${year}-${MONTHS[monthName.toLowerCase()]}`;
}

/** Latest month (or year) in a photography lede / set.txt date line. */
export function parseTripRange(lede?: string): TripRange | undefined {
  if (!lede) return undefined;

  const months: string[] = [];
  const sharedYear = new RegExp(
    `\\b(${MONTH})\\s*[\\u2013\\u2014\\-]\\s*(${MONTH})\\s+(\\d{4})\\b`,
    "gi",
  );
  for (const match of lede.matchAll(sharedYear)) {
    months.push(toYearMonth(match[1], match[3]), toYearMonth(match[2], match[3]));
  }

  const monthYear = new RegExp(`\\b(${MONTH})\\s+(\\d{4})\\b`, "gi");
  for (const match of lede.matchAll(monthYear)) {
    months.push(toYearMonth(match[1], match[2]));
  }

  const unique = [...new Set(months)].sort();
  if (unique.length) {
    return { start: unique[0], end: unique[unique.length - 1], kind: "month" };
  }

  const years = [...lede.matchAll(/\b((?:19|20)\d{2})\b/g)].map((match) => match[1]);
  if (years.length) {
    const year = years.sort()[years.length - 1];
    return { start: year, end: year, kind: "year" };
  }

  return undefined;
}

export function parseLedeSortDate(lede?: string): string | undefined {
  return parseTripRange(lede)?.end;
}

/**
 * /photography landing cards: most recent trip first.
 * Month-dated sets, then undated, then year-only (Saudi 2019).
 * Equal end months break toward the later range start (Taiwan before Philippines).
 */
export function sortPhotographyCards(items: Collection[]): Collection[] {
  return items
    .map((item) => {
      const range = parseTripRange(item.lede);
      return {
        item: range ? { ...item, sortDate: item.sortDate ?? range.end } : item,
        range,
      };
    })
    .sort((a, b) => {
      const tier = (range: TripRange | undefined) =>
        !range ? 1 : range.kind === "month" ? 0 : 2;
      const ta = tier(a.range);
      const tb = tier(b.range);
      if (ta !== tb) return ta - tb;
      if (a.range && b.range) {
        if (a.range.end !== b.range.end) return b.range.end.localeCompare(a.range.end);
        if (a.range.start !== b.range.start) return b.range.start.localeCompare(a.range.start);
      }
      return 0;
    })
    .map((entry) => entry.item);
}
