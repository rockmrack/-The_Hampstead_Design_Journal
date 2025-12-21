import React from 'react';
import { Quote } from 'lucide-react';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export default function PullQuote({ children, author, role }: PullQuoteProps) {
  return (
    <figure className="my-12 relative pl-8 md:pl-0">
      <div className="hidden md:block absolute -left-12 top-0 text-hampstead-grey/40">
        <Quote className="w-16 h-16 rotate-180" />
      </div>
      <blockquote className="font-serif text-2xl md:text-3xl leading-tight text-hampstead-black italic border-l-4 border-hampstead-black md:border-none pl-6 md:pl-0 md:text-center max-w-4xl mx-auto">
        &ldquo;{children}&rdquo;
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-6 flex flex-col items-center text-sm tracking-widest uppercase">
          {author && <span className="font-bold text-hampstead-black">{author}</span>}
          {role && <span className="text-hampstead-charcoal/60 mt-1">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
