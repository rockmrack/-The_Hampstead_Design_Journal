'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';
import Callout from './Callout';
import PullQuote from './PullQuote';
import KeyTakeaways from './KeyTakeaways';

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
    <p className="text-[1.15rem] leading-[1.9] mb-8 text-hampstead-charcoal font-light [&:first-of-type]:first-letter:float-left [&:first-of-type]:first-letter:text-7xl [&:first-of-type]:first-letter:pr-4 [&:first-of-type]:first-letter:font-serif [&:first-of-type]:first-letter:leading-[0.8] [&:first-of-type]:first-letter:mt-2" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-8 space-y-3 text-[1.15rem] text-hampstead-charcoal font-light" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-8 space-y-3 text-[1.15rem] text-hampstead-charcoal font-light" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed pl-2" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-2 border-hampstead-black pl-8 my-12 font-serif text-2xl md:text-3xl italic text-hampstead-black leading-tight"
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
  img: () => null,
  hr: () => (
    <hr className="my-12 border-0 h-px bg-hampstead-grey" />
  ),
  // Custom components
  Callout,
  PullQuote,
  KeyTakeaways,
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
