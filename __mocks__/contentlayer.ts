// Mock contentlayer generated types for testing
export const allArticles = [
  {
    title: 'Test Article',
    slug: 'test-article',
    date: '2024-01-01',
    category: 'architecture',
    excerpt: 'This is a test article excerpt.',
    author: 'Test Author',
    featured: true,
    body: {
      raw: 'This is the raw body content.',
      code: 'var Component=(()=>{return {}})()',
    },
    url: '/articles/test-article',
    readingTime: {
      text: '5 min read',
      minutes: 5,
      words: 1000,
    },
    headings: [],
  },
  {
    title: 'Second Test Article',
    slug: 'second-test-article',
    date: '2024-01-02',
    category: 'interiors',
    excerpt: 'This is another test article.',
    author: 'Test Author',
    featured: false,
    body: {
      raw: 'Second article body content.',
      code: 'var Component=(()=>{return {}})()',
    },
    url: '/articles/second-test-article',
    readingTime: {
      text: '3 min read',
      minutes: 3,
      words: 600,
    },
    headings: [],
  },
];

export type Article = typeof allArticles[number];
