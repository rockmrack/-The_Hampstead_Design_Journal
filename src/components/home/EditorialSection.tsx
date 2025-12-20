'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
}

interface EditorialSectionProps {
  title: string;
  subtitle: string;
  description: string;
  articles: Article[];
  align?: 'left' | 'right';
}

const EditorialSection: React.FC<EditorialSectionProps> = ({ 
  title, 
  subtitle, 
  description, 
  articles,
  align = 'left' 
}) => {
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <section className="section-spacing border-b border-hampstead-black/5">
      <div className="editorial-container">
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Editorial Context */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-hampstead-charcoal/40 mb-6 block">
              {subtitle}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              {title}
            </h2>
            <div className="w-12 h-0.5 bg-hampstead-black mb-8" />
            <p className="text-lg text-hampstead-charcoal/70 leading-relaxed mb-8 font-light">
              {description}
            </p>
            <Link 
              href={`/categories/${subtitle.toLowerCase().replace(' ', '-')}`}
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-hampstead-charcoal/60 transition-colors"
            >
              View Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Visuals */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Feature */}
            <Link href={mainArticle.slug} className="group md:col-span-2 relative aspect-[16/9] overflow-hidden">
              <Image
                src={mainArticle.image}
                alt={mainArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs text-white/70 uppercase tracking-widest mb-2 block">
                  {mainArticle.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:underline decoration-1 underline-offset-4">
                  {mainArticle.title}
                </h3>
              </div>
            </Link>

            {/* Secondary Articles */}
            {secondaryArticles.map((article, idx) => (
              <Link key={idx} href={article.slug} className="group block">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs text-hampstead-charcoal/50 uppercase tracking-widest mb-2 block">
                  {article.category}
                </span>
                <h4 className="font-serif text-xl leading-snug group-hover:text-hampstead-charcoal/70 transition-colors">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
