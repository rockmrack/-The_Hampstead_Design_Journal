import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  thumbnail?: string;
  slug?: string;
  date?: string;
  category?: string;
  className?: string;
  variant?: 'vertical' | 'horizontal' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  excerpt, 
  thumbnail, 
  slug = '#', 
  date = new Date().toISOString(), 
  category = 'Article',
  className,
  variant = 'vertical'
}) => {
  const isHorizontal = variant === 'horizontal';
  const isFeatured = variant === 'featured';

  return (
    <article className={cn(
      "group relative flex flex-col",
      isHorizontal && "md:flex-row md:items-center md:gap-8",
      className
    )}>
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-hampstead-grey mb-6",
        isHorizontal ? "md:w-1/2 md:mb-0 aspect-[4/3]" : "aspect-[3/2] w-full",
        isFeatured && "aspect-[16/9]"
      )}>
        {thumbnail ? (
          <Image 
            src={thumbnail} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-hampstead-charcoal/20 bg-hampstead-grey/30">
            <span className="font-serif italic">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col",
        isHorizontal && "md:w-1/2"
      )}>
        <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-hampstead-charcoal/60 mb-3">
          <span className="font-medium text-hampstead-black">{category}</span>
          <span>•</span>
          <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
        </div>

        <Link href={`/journal/articles/${slug}`} className="group-hover:text-hampstead-charcoal transition-colors no-underline">
          <h3 className={cn(
            "font-serif mb-3 leading-tight",
            isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
          )}>
            {title}
          </h3>
        </Link>

        <p className="text-hampstead-charcoal/80 leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        <Link 
          href={`/journal/articles/${slug}`} 
          className="inline-flex items-center text-sm uppercase tracking-wide border-b border-hampstead-black pb-0.5 self-start hover:opacity-70 transition-opacity no-underline"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;