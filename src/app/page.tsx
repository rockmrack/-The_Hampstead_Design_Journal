import React from 'react';
import { MetaTags } from '../components/seo/MetaTags';
import { ArticleGrid } from '../components/articles/ArticleGrid';

const HomePage = () => {
  return (
    <div>
      <MetaTags title="The Hampstead Design Journal" description="Explore architecture, interiors, and living in North West London." />
      <main>
        <h1>Welcome to The Hampstead Design Journal</h1>
        <p>Your go-to source for high-quality content on architecture, interiors, and living in North West London.</p>
        <ArticleGrid />
      </main>
    </div>
  );
};

export default HomePage;