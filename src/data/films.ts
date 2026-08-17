export type Film = {
  id: string;
  youtube: string;
  title: string;
  lede: string;
  poster: string;
  href: string;
};

export const films: Film[] = [
  {
    id: 'hold-back',
    youtube: 'A7R6RvkI2cI',
    title: 'Hold Back: A Perspective From Yoga',
    lede: 'This is a BEKIND film.',
    poster: '/images/films/hold-back.jpg',
    href: '/films/hold-back',
  },
  {
    id: 'a-mothers-love',
    youtube: '9YyoZzbUEgs',
    title: "A Mother's Love",
    lede: "A portrait of a mother's love.",
    poster: '/images/films/a-mothers-love.jpg',
    href: '/films/a-mothers-love',
  },
  {
    id: 'Sailing-4000-miles',
    youtube: '07Z8CXpRfEE',
    title: 'What Does Sailing 4000 Miles Teach You?',
    lede: 'This is my personal account of sailing from Brazil to the Caribbean over 6 weeks.',
    poster: '/images/films/Sailing-4000-miles.jpg',
    href: '/films/Sailing-4000-miles',
  },
  {
    id: 'what-is-beauty',
    youtube: 'u2vittiw3no',
    title: 'WHAT IS BEAUTY?',
    lede: 'The question is fundamental.',
    poster: '/images/films/what-is-beauty.jpg',
    href: '/films/what-is-beauty',
  },
  {
    id: 'the-strangers-project',
    youtube: 'BpshKSsTP4c',
    title: 'The Strangers Project',
    lede: 'This is a film about Strangers and the space that exists between them.',
    poster: '/images/films/the-strangers-project.jpg',
    href: '/films/the-strangers-project',
  },
  {
    id: 'what-is-carnival',
    youtube: '8OYEe4KCrg4',
    title: 'O que é Carnaval [What is Carnival]?',
    lede: 'Earlier this year I wanted to experience Brazilian Carnival.',
    poster: '/images/films/what-is-carnival.jpg',
    href: '/films/what-is-carnival',
  },
];

export const filmIds = films.map((film) => film.id);

export function getFilm(id: string | undefined) {
  return films.find((film) => film.id === id);
}

export function getAdjacentFilms(id: string) {
  const index = films.findIndex((film) => film.id === id);
  return {
    prev: index > 0 ? films[index - 1] : undefined,
    next: index >= 0 && index < films.length - 1 ? films[index + 1] : undefined,
  };
}
