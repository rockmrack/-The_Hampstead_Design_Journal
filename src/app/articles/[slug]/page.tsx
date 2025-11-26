import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleContent from '../../../components/articles/ArticleContent';
import { fetchArticleBySlug } from '../../../lib/api';
import MetaTags from '../../../components/seo/MetaTags';

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const getArticle = async () => {
        try {
          const data = await fetchArticleBySlug(slug);
          setArticle(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      getArticle();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading article.</div>;
  if (!article) return <div>Article not found.</div>;

  return (
    <>
      <MetaTags title={article.title} description={article.excerpt} />
      <ArticleContent content={article.content} />
    </>
  );
};

export default ArticlePage;