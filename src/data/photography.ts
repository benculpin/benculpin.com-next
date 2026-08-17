export type Photo = {
  src: string;
  alt: string;
};

export type Collection = {
  slug: string;
  title: string;
  /** One-liner on the photography landing. Omit when the heading is enough. */
  lede?: string;
  /** Optional project-page intro when it differs from the landing lede. */
  intro?: string;
  /**
   * Notebook write-up for this series, when it is the same work.
   * Photography stays pictures; the words live at /notebook/{notebook}.
   */
  notebook?: string;
  cover: string;
  href: string;
  images: Photo[];
  quote?: {
    lines: string[];
    background: string;
  };
};

const nuanceFiles = [
  'IMG_6728.jpg', 'IMG_6766.jpg', 'IMG_6806.jpg', 'IMG_6846.jpg', 'IMG_6862.jpg', 'IMG_6865.jpg',
  'IMG_6881.jpg', 'IMG_6907.jpg', 'IMG_6927.jpg', 'IMG_6935.jpg', 'IMG_6939.jpg', 'IMG_6945.jpg',
  'IMG_6956.jpg', 'IMG_6986.jpg', 'IMG_6989.jpg', 'IMG_7049.jpg', 'IMG_7090.jpg', 'IMG_7096.jpg',
];

/**
 * Newest first. To add a series later:
 * 1. Put images in public/images/photography/<slug>/
 * 2. Add one object here (cover, title, optional lede, images)
 * 3. If the series has a write-up, set `notebook` to that post's slug
 *    and keep the words in the notebook — do not copy them here.
 * The shared /photography/[slug] page picks it up.
 */
export const collections: Collection[] = [
  {
    slug: 'nuance-of-experience',
    title: 'Nuance of Experience',
    lede: "Pushing the limits of an iPhone while also exploring the nuance of what's really going on.",
    notebook: 'nuance-of-experience',
    cover: '/images/photography/nuance-hero.jpg',
    href: '/photography/nuance-of-experience',
    images: nuanceFiles.map((name) => ({
      src: `/images/photography/nuance/${name}`,
      alt: '',
    })),
  },
  {
    slug: 'portraits-and-moments',
    title: 'Portraits & Moments',
    cover: '/images/photography/portrait-dsc09555.jpg',
    href: '/photography/portraits-and-moments',
    images: [
      { src: '/images/photography/portrait-dsc09555.jpg', alt: 'Portrait' },
      { src: '/images/photography/portrait-dsc00887.jpg', alt: 'Portrait' },
      { src: '/images/photography/portrait-img7880.jpeg', alt: 'Portrait' },
      { src: '/images/photography/portrait-dsc07527.jpeg', alt: 'Moment' },
      { src: '/images/photography/portrait-dsc07489.jpeg', alt: 'Moment' },
      { src: '/images/photography/portrait-dsc07317.jpg', alt: 'Moment' },
      { src: '/images/photography/portrait-dsc07642.jpg', alt: 'Moment' },
      { src: '/images/photography/portrait-91f64.jpg', alt: 'Moment' },
      { src: '/images/photography/portrait-dsc06310.jpeg', alt: 'Moment' },
    ],
  },
  {
    slug: 'saudi-arabia',
    title: 'Saudi Arabia',
    lede: 'Nike research project 2019',
    cover: '/images/photography/saudi-dsc05731.jpeg',
    href: '/photography/saudi-arabia',
    images: [
      { src: '/images/photography/saudi-dsc05731.jpeg', alt: 'Saudi Arabia research photo' },
      { src: '/images/photography/saudi-dsc05808.jpeg', alt: 'Saudi Arabia research photo' },
      { src: '/images/photography/saudi-dsc05536.jpeg', alt: 'Saudi Arabia research photo' },
      { src: '/images/photography/saudi-dsc05894.jpeg', alt: 'Saudi Arabia research photo' },
      { src: '/images/photography/saudi-dsc05423.jpeg', alt: 'Saudi Arabia research photo' },
    ],
    quote: {
      lines: [
        'I said "Shukran" and he said "Habibi".',
        'Just like that, we were friends.',
      ],
      background: '/images/photography/quote-bg.jpeg',
    },
  },
];

export function getCollection(slug: string | undefined) {
  return collections.find((c) => c.slug === slug);
}
