import React from 'react';
import { ArticleGrid } from '../../../components/articles/ArticleGrid';
import { MetaTags } from '../../../components/seo/MetaTags';
import { fetchArticlesByCategory } from '../../../lib/api';

const ArchitecturePage = async () => {
  const articles = await fetchArticlesByCategory('architecture');

  return (
    <>
      <MetaTags title="Architecture - The Hampstead Design Journal" description="Explore the latest in architecture from North West London." />
      <main>
        <h1>Architecture</h1>
        <ArticleGrid articles={articles} />
      </main>
    </>
  );
};

export default ArchitecturePage;