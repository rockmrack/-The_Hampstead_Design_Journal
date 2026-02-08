'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowUpRight, Clock, Bookmark } from 'lucide-react';

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

const categoryColors: Record<string, string> = {
  'heritage-architecture': 'bg-amber-100 text-amber-800',
  'planning-regulations': 'bg-blue-100 text-blue-800',
  'interiors-materials': 'bg-rose-100 text-rose-800',
  'market-watch': 'bg-emerald-100 text-emerald-800',
  'default': 'bg-hampstead-grey text-hampstead-charcoal'
};

export default function MagazineGrid({ articles }: MagazineGridProps) {
  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const tertiaryArticles = articles.slice(4, 10);

  if (!leadArticle) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-hampstead-cream">
      <div className="editorial-container">
        
        {/* Premium Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-hampstead-charcoal/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-hampstead-black" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-hampstead-charcoal/50">
                Curated Stories
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-hampstead-black tracking-tight">
              Latest from the Journal
            </h2>
          </div>
          <Link 
            href="/journal/articles" 
            className="mt-6 md:mt-0 group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-medium hover:text-hampstead-charcoal/60 transition-colors"
          >
            View Full Archive 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>

        {/* Top Tier: Lead + Sidebar */}
        <motion.div 
          className="grid lg:grid-cols-12 gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Lead Article (8 cols) - Premium Card */}
          <motion.div className="lg:col-span-8" variants={itemVariants}>
            <Link href={`/journal/articles/${leadArticle.slug}`} className="group block">
              <div className="relative aspect-[16/10] mb-8 overflow-hidden bg-hampstead-grey/20">
                {/* Elegant placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/5 to-hampstead-charcoal/15" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-5xl text-hampstead-charcoal/10 italic">Featured</span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-hampstead-black/0 group-hover:bg-hampstead-black/40 transition-all duration-500" />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="px-4 py-2 bg-white text-xs font-bold uppercase tracking-[0.15em]">
                    Editor&apos;s Pick
                  </span>
                </div>
                
                {/* Bookmark icon on hover */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <Bookmark className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.15em] text-hampstead-charcoal/60 mb-4">
                  <span className={`px-3 py-1 ${categoryColors[leadArticle.category] || categoryColors.default}`}>
                    {leadArticle.category.replace(/-/g, ' ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(leadArticle.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-5 group-hover:text-hampstead-charcoal/80 transition-colors tracking-tight">
                  {leadArticle.title}
                </h3>
                <p className="text-lg text-hampstead-charcoal/70 leading-relaxed line-clamp-3 max-w-2xl font-light">
                  {leadArticle.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Column (4 cols) - Numbered List */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-0 border-l border-hampstead-charcoal/10 lg:pl-10"
            variants={itemVariants}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-hampstead-charcoal/50 mb-6 pb-4 border-b border-hampstead-charcoal/10">
              Trending Now
            </div>
            {secondaryArticles.map((article, idx) => (
              <Link 
                key={article._id} 
                href={`/journal/articles/${article.slug}`} 
                className="group flex gap-5 py-6 border-b border-hampstead-charcoal/10 last:border-none"
              >
                <span className="font-serif text-4xl text-hampstead-charcoal/20 group-hover:text-hampstead-black/40 transition-colors leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-hampstead-charcoal/50 mb-2 block">
                    {article.category.replace(/-/g, ' ')}
                  </span>
                  <h4 className="font-serif text-lg leading-snug group-hover:text-hampstead-charcoal/70 transition-colors">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Tertiary Grid (3 cols) - Card Style */}
        <motion.div 
          className="grid md:grid-cols-3 gap-x-10 gap-y-14 pt-16 border-t border-hampstead-charcoal/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tertiaryArticles.map((article, idx) => (
            <motion.div key={article._id} variants={itemVariants}>
              <Link href={`/journal/articles/${article.slug}`} className="group block">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${categoryColors[article.category] || categoryColors.default}`}>
                    {article.category.replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs text-hampstead-charcoal/40">
                    {format(new Date(article.date), 'MMM d')}
                  </span>
                </div>
                <h4 className="font-serif text-2xl leading-tight mb-4 group-hover:text-hampstead-charcoal/70 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-hampstead-charcoal/60 leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-hampstead-charcoal/50 group-hover:text-hampstead-black transition-colors">
                  Read More
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
