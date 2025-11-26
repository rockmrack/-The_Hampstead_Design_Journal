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
      url: 'https://hampsteaddesignjournal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Hampstead Design Journal',
      url: 'https://hampsteaddesignjournal.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hampsteaddesignjournal.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hampsteaddesignjournal.com${article.url}`,
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
