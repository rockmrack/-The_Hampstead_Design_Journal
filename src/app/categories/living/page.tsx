import React from 'react';
import { ArticleGrid } from '../../../components/articles/ArticleGrid';
import { MetaTags } from '../../../components/seo/MetaTags';
import { fetchArticlesByCategory } from '../../../lib/api';

const LivingPage = async () => {
    const articles = await fetchArticlesByCategory('living');

    return (
        <>
            <MetaTags title="Living - The Hampstead Design Journal" description="Explore articles on living in North West London, featuring design insights and lifestyle tips." />
            <main>
                <h1>Living</h1>
                <ArticleGrid articles={articles} />
            </main>
        </>
    );
};

export default LivingPage;