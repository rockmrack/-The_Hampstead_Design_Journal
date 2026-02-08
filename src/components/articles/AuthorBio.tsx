'use client';

import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';

interface AuthorBioProps {
  articleTopic?: string;
}

export default function AuthorBio({ articleTopic }: AuthorBioProps) {
  return (
    <div className="mt-16 border-t border-b border-hampstead-grey py-10 md:py-12">
      <div className="flex items-start gap-6">
        {/* Logo/Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-hampstead-black flex items-center justify-center flex-shrink-0">
          <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>

        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2 block">
            About the Author
          </span>
          
          <h3 className="font-serif text-xl md:text-2xl mb-4">
            The Hampstead Design Journal
          </h3>
          
          <p className="text-hampstead-charcoal/80 leading-relaxed mb-6">
            The Hampstead Design Journal is curated by the team at{' '}
            <a 
              href="https://hampsteadrenovations.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-hampstead-black underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Hampstead Renovations
            </a>
            . For 15 years, we have been the custodians of NW3&apos;s finest homes. 
            {articleTopic ? (
              <> If you are considering a project involving {articleTopic}, our Senior Architect 
              is available for a consultation at our Finchley Road showroom.</>
            ) : (
              <> If you are considering a project mentioned in this article, our Senior Architect 
              is available for a consultation at our Finchley Road showroom.</>
            )}
          </p>

          <Link
            href="/journal/contact?subject=consultation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white font-medium hover:bg-hampstead-charcoal transition-colors"
          >
            Book a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
