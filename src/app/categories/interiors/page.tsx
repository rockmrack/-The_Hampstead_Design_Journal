import React from 'react';
import { ArticleGrid } from '../../../components/articles/ArticleGrid';
import { MetaTags } from '../../../components/seo/MetaTags';
import { fetchArticlesByCategory } from '../../../lib/api';

const InteriorsPage = async () => {
  const articles = await fetchArticlesByCategory('interiors');

  return (
    <>
      <MetaTags title="Interiors - The Hampstead Design Journal" description="Explore the latest trends and insights in interior design in North West London." />
      <main>
        <h1>Interiors</h1>
        <ArticleGrid articles={articles} />
      </main>
    </>
  );
};

export default InteriorsPage;