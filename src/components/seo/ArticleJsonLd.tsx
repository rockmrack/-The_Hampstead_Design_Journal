interface Article {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  url: string;
  coverImage?: string;
  keywords?: string;
}

interface ArticleJsonLdProps {
  article: Article;
}

// Base URL for the journal on the main site
const SITE_URL = 'https://www.hampsteadrenovations.co.uk/journal';

export default function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Hampstead Design Journal',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${article.url}`,
    },
    ...(article.coverImage && {
      image: {
        '@type': 'ImageObject',
        url: article.coverImage,
      },
    }),
    ...(article.keywords && {
      keywords: article.keywords,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
