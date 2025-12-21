'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 md:py-32 border-b border-hampstead-black/5 overflow-hidden">
      <div className="editorial-container">
        <motion.div 
          className={`flex flex-col lg:flex-row gap-16 lg:gap-24 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          
          {/* Editorial Context - Premium Styled */}
          <motion.div 
            className="lg:w-1/3 flex flex-col justify-center"
            variants={itemVariants}
          >
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-hampstead-black" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-hampstead-charcoal/50">
                  {subtitle}
                </span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[0.95] tracking-tight">
                {title}
              </h2>
              
              <p className="text-lg text-hampstead-charcoal/70 leading-relaxed mb-10 font-light">
                {description}
              </p>
              
              <Link 
                href={`/categories/${subtitle.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
                className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-medium border-b-2 border-hampstead-black pb-2 hover:border-hampstead-charcoal hover:text-hampstead-charcoal transition-all"
              >
                View Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>

              {/* Decorative Element */}
              <div className="hidden lg:block mt-16 pt-8 border-t border-hampstead-grey">
                <div className="flex items-center gap-4 text-xs text-hampstead-charcoal/40 uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-hampstead-black/20 rounded-full" />
                  Curated Selection
                </div>
              </div>
            </div>
          </motion.div>

          {/* Article Grid - Enhanced */}
          <div className="lg:w-2/3 space-y-8">
            {/* Main Feature - Full Width with Overlay */}
            <motion.div variants={itemVariants}>
              <Link href={`/articles/${mainArticle.slug}`} className="group block relative">
                <div className="aspect-[16/10] bg-hampstead-grey/20 overflow-hidden relative">
                  {/* Placeholder with elegant styling */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/5 to-hampstead-charcoal/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-4xl text-hampstead-charcoal/10 italic">Featured</span>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-hampstead-black/0 group-hover:bg-hampstead-black/60 transition-all duration-500" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex justify-end">
                      <ArrowUpRight className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                      {mainArticle.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 pb-4 border-b border-hampstead-grey group-hover:border-hampstead-black transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-hampstead-charcoal/50">
                      {mainArticle.category}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-hampstead-charcoal/40">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight group-hover:text-hampstead-charcoal/80 transition-colors">
                    {mainArticle.title}
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Articles - Side by Side */}
            <div className="grid md:grid-cols-2 gap-8">
              {secondaryArticles.map((article, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Link href={`/articles/${article.slug}`} className="group block">
                    <div className="aspect-[4/3] bg-hampstead-grey/15 mb-5 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-hampstead-charcoal/5 to-hampstead-charcoal/10" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-hampstead-black/50">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-hampstead-charcoal/50 mb-2 block">
                      {article.category}
                    </span>
                    <h4 className="font-serif text-xl leading-snug group-hover:text-hampstead-charcoal/70 transition-colors mb-3">
                      {article.title}
                    </h4>
                    <p className="text-sm text-hampstead-charcoal/60 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
