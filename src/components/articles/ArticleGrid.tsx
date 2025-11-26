import React from 'react';
import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          title={article.title}
          excerpt={article.excerpt}
          thumbnail={article.thumbnail}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;