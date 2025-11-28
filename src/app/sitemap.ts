import { MetadataRoute } from 'next';
import { allArticles } from 'contentlayer/generated';

const BASE_URL = 'https://hampsteaddesignjournal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/articles',
    '/search',
    '/contact',
    '/archive',
    // Categories
    '/categories/architecture',
    '/categories/heritage-architecture',
    '/categories/interiors',
    '/categories/interiors-materials',
    '/categories/living',
    '/categories/market-watch',
    '/categories/planning-regulations',
    // Tools & Resources
    '/planning-map',
    '/calculators',
    '/guides',
    '/valuation',
    '/suppliers',
    '/market-dashboard',
    // Info pages
    '/careers',
    '/projects',
    '/testimonials',
    '/faq',
    '/glossary',
    '/events',
    '/compare',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/categories') ? 0.8 : 0.7,
  }));

  // Dynamic article pages
  const articlePages = allArticles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.9 : 0.6,
  }));

  // Archive pages (street profiles)
  const archivePages = [
    'chruch-row',
    'frognal-way',
    'hampstead-grove',
    'keats-grove',
    'well-walk',
    'perrin-walk',
    'flask-walk',
    'holly-mount',
    'mount-vernon',
    'windmill-hill',
    'admiral-walk',
    'cannon-place',
    'gainsborough-gardens',
    'branch-hill',
    'redington-road',
    'templewood-avenue',
    'west-heath-road',
    'oak-hill-park',
    'cannon-lane',
    'upper-terrace',
    'hollycroft-avenue',
    'ferncroft-avenue',
    'arkwright-road',
    'lyndhurst-gardens',
    'thurlow-road',
    'belsize-park-gardens',
    'howitt-road',
    'lawn-road',
    'steeles-road',
    'haverstock-hill',
    'england-lane',
    'south-hill-park',
    'parliament-hill',
    'nassington-road',
    'tanza-road',
  ].map((slug) => ({
    url: `${BASE_URL}/archive/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...archivePages];
}
