import React from 'react';
import ArticleGrid from '../../components/articles/ArticleGrid';
import { fetchArticles } from '../../lib/api';

const ArticlesPage = async () => {
  const articles = await fetchArticles();

  return (
    <main>
      <h1>The Hampstead Design Journal - Articles</h1>
      <ArticleGrid articles={articles} />
    </main>
  );
};

export default ArticlesPage;