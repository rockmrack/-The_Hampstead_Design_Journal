'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';

interface Article {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage?: string;
}

interface MagazineGridProps {
  articles: Article[];
}

export default function MagazineGrid({ articles }: MagazineGridProps) {
  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const tertiaryArticles = articles.slice(4, 10);

  if (!leadArticle) return null;

  return (
    <section className="section-spacing bg-hampstead-cream">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 border-b border-hampstead-charcoal/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-hampstead-charcoal/60 block mb-2">
              Curated Stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-hampstead-black">
              Latest from the Journal
            </h2>
          </div>
          <Link href="/articles" className="hidden md:flex items-center text-sm uppercase tracking-widest hover:text-hampstead-charcoal/60 transition-colors">
            View Archive <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Top Tier: Lead + Sidebar */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          
          {/* Lead Article (8 cols) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <Link href={`/articles/${leadArticle.slug}`}>
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image
                  src={leadArticle.coverImage || ''}
                  alt={leadArticle.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest">
                  Editor&apos;s Choice
                </div>
              </div>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-3">
                  <span className="font-medium text-hampstead-black">{leadArticle.category}</span>
                  <span>•</span>
                  <time>{format(new Date(leadArticle.date), 'MMMM d, yyyy')}</time>
                </div>
                <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-4 group-hover:text-hampstead-charcoal/80 transition-colors">
                  {leadArticle.title}
                </h3>
                <p className="text-lg text-hampstead-charcoal/70 leading-relaxed line-clamp-3 max-w-2xl">
                  {leadArticle.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* Secondary Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-10 border-l border-hampstead-charcoal/10 lg:pl-8">
            {secondaryArticles.map((article) => (
              <Link key={article._id} href={`/articles/${article.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden mb-4">
                  <Image
                    src={article.coverImage || ''}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2 block">
                    {article.category}
                  </span>
                  <h4 className="font-serif text-xl leading-snug group-hover:text-hampstead-charcoal/70 transition-colors">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tertiary Grid (3 cols) */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12 pt-12 border-t border-hampstead-charcoal/10">
          {tertiaryArticles.map((article) => (
            <Link key={article._id} href={`/articles/${article.slug}`} className="group block">
              <div className="mb-4 relative">
                <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2 block">
                  {article.category}
                </span>
                <h4 className="font-serif text-2xl leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {article.title}
                </h4>
                <p className="text-sm text-hampstead-charcoal/70 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
