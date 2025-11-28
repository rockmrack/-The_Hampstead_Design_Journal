import React from 'react';
import ArticleCard from './ArticleCard';

interface LegacyArticle {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
}

interface ContentlayerArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  coverImage?: string;
}

type Article = LegacyArticle | ContentlayerArticle;

interface ArticleGridProps {
  articles: Article[];
}

function isContentlayerArticle(article: Article): article is ContentlayerArticle {
  return 'slug' in article;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => {
        if (isContentlayerArticle(article)) {
          return (
            <ArticleCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              thumbnail={article.coverImage || ''}
              slug={article.slug}
            />
          );
        }
        return (
          <ArticleCard
            key={article.id}
            title={article.title}
            excerpt={article.excerpt}
            thumbnail={article.thumbnail}
          />
        );
      })}
    </div>
  );
};

export { ArticleGrid };
export default ArticleGrid;