'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../articles/ArticleCard';

// Define a type that matches the shape of your Contentlayer articles
// Since we can't import the type directly yet, we'll define a compatible interface
interface Article {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  url: string;
}

interface LatestArticlesProps {
  articles: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  // Split articles into featured (first one) and the rest
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 4); // Next 3 articles

  if (!featuredArticle) return null;

  return (
    <section className="section-spacing bg-hampstead-white">
      <div className="editorial-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Latest Stories</h2>
          <div className="editorial-divider" />
        </motion.div>

        {/* Featured Article - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <ArticleCard
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            slug={featuredArticle.slug}
            date={featuredArticle.date}
            category={featuredArticle.category}
            variant="featured"
            thumbnail="/images/placeholder-hero.jpg" // Placeholder until we have real images
          />
        </motion.div>

        {/* Recent Articles Grid */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {recentArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ArticleCard
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
                date={article.date}
                category={article.category}
                variant="vertical"
                thumbnail={`/images/placeholder-${index + 1}.jpg`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
