'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';
import Callout from './Callout';
import PullQuote from './PullQuote';

const components = {
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      id={id} 
      className="font-serif text-3xl md:text-4xl mt-16 mb-6 scroll-mt-32"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      id={id} 
      className="font-serif text-2xl md:text-3xl mt-12 mb-4 scroll-mt-32"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-lg leading-loose mb-6 text-hampstead-charcoal" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-hampstead-charcoal" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-hampstead-charcoal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-hampstead-black pl-6 my-8 italic text-xl text-hampstead-charcoal/80"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-hampstead-black" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-hampstead-black underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link 
        href={href || '#'} 
        className="text-hampstead-black underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-10">
      <div className="relative aspect-[16/9] bg-hampstead-grey/30 overflow-hidden">
        {src && (
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        )}
      </div>
      {alt && (
        <figcaption className="text-sm text-hampstead-charcoal/60 mt-3 text-center italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-hampstead-grey" />
  ),
  // Custom components
  Callout,
  PullQuote,
};

interface ArticleBodyProps {
  code: string;
}

export default function ArticleBody({ code }: ArticleBodyProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div className="article-body">
      <MDXContent components={components} />
    </div>
  );
}
