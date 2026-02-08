'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProductRecommendation {
  category: string;
  name: string;
  brand: string;
  link?: string;
  note?: string;
}

interface GetTheLookProps {
  title?: string;
  description?: string;
  products: ProductRecommendation[];
  className?: string;
}

const GetTheLook: React.FC<GetTheLookProps> = ({
  title = 'Get the Look',
  description = 'Curated recommendations to recreate this aesthetic in your home.',
  products,
  className = '',
}) => {
  return (
    <div className={`bg-hampstead-cream border border-hampstead-grey p-6 md:p-8 ${className}`}>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2 block">
          {title}
        </span>
        <p className="text-sm text-hampstead-charcoal/70">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-start justify-between gap-4 pb-4 border-b border-hampstead-grey last:border-0 last:pb-0"
          >
            <div className="flex-1">
              <span className="text-xs text-hampstead-charcoal/50 uppercase tracking-wide">
                {product.category}
              </span>
              <p className="font-medium">
                {product.brand} &apos;{product.name}&apos;
              </p>
              {product.note && (
                <p className="text-xs text-hampstead-charcoal/60 mt-1">{product.note}</p>
              )}
            </div>
            {product.link && (
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-hampstead-charcoal/60 hover:text-hampstead-black transition-colors flex items-center gap-1"
              >
                View
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-hampstead-grey">
        <Link
          href="/journal/contact?subject=showroom-visit"
          className="flex items-center justify-center gap-2 w-full py-3 bg-hampstead-black text-white text-sm font-medium hover:bg-hampstead-charcoal transition-colors"
        >
          View in Our Showroom
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default GetTheLook;
