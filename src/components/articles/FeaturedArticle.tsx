import React from 'react';
import { Article } from '../../types';
import ArticleContent from './ArticleContent';
import Typography from '../ui/Typography';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="featured-article">
      <Typography variant="h2">{article.title}</Typography>
      <ArticleContent content={article.content} />
    </div>
  );
};

export default FeaturedArticle;