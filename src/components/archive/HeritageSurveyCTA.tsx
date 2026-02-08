'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

interface HeritageSurveyCTAProps {
  streetName?: string;
  className?: string;
  variant?: 'sidebar' | 'inline' | 'full';
}

const HeritageSurveyCTA: React.FC<HeritageSurveyCTAProps> = ({
  streetName,
  className = '',
  variant = 'sidebar',
}) => {
  if (variant === 'sidebar') {
    return (
      <div className={`bg-hampstead-cream border border-hampstead-grey p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-hampstead-black text-white flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60">
            Heritage Survey
          </span>
        </div>

        <h4 className="font-serif text-xl mb-3">Own a piece of history?</h4>

        <p className="text-sm text-hampstead-charcoal/70 leading-relaxed mb-4">
          {streetName ? (
            <>
              We hold the original brick and mortar specifications for <strong>{streetName}</strong>. 
              Don&apos;t let a standard builder ruin your heritage asset.
            </>
          ) : (
            <>
              We hold original material specifications for streets across NW3. 
              Don&apos;t let a standard builder ruin your heritage asset.
            </>
          )}
        </p>

        <Link
          href={`/journal/contact?subject=heritage-survey${streetName ? `&street=${encodeURIComponent(streetName)}` : ''}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-hampstead-black text-white text-sm font-medium hover:bg-hampstead-charcoal transition-colors"
        >
          Book a Heritage Survey
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="mt-4 pt-4 border-t border-hampstead-grey text-center">
          <a 
            href="tel:+442071234567" 
            className="flex items-center justify-center gap-2 text-sm text-hampstead-charcoal/70 hover:text-hampstead-black transition-colors"
          >
            <Phone className="w-4 h-4" />
            020 7123 4567
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-hampstead-cream border-l-4 border-hampstead-black p-6 my-8 ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg mb-1">
              {streetName ? `Own a property on ${streetName}?` : 'Own a heritage property in NW3?'}
            </h4>
            <p className="text-sm text-hampstead-charcoal/70">
              We hold original specifications. Book a heritage survey before any work begins.
            </p>
          </div>
          <Link
            href={`/journal/contact?subject=heritage-survey${streetName ? `&street=${encodeURIComponent(streetName)}` : ''}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-hampstead-black text-white text-sm font-medium hover:bg-hampstead-charcoal transition-colors whitespace-nowrap"
          >
            Book Survey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`bg-hampstead-black text-white p-8 md:p-12 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block">
          Heritage Conservation
        </span>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">
          {streetName 
            ? `We Are the Guardians of ${streetName}` 
            : 'We Are the Guardians of NW3\'s Heritage'}
        </h3>
        <p className="text-lg text-white/70 mb-8 leading-relaxed">
          Since 2009, we have documented the construction DNA of Hampstead&apos;s finest streets. 
          We hold original brick samples, lime mortar recipes, and moulding profiles that allow 
          us to restore—not just repair—your heritage property.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/journal/contact?subject=heritage-survey${streetName ? `&street=${encodeURIComponent(streetName)}` : ''}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-colors"
          >
            Book a Heritage Survey
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a 
            href="tel:+442071234567" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            020 7123 4567
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeritageSurveyCTA;
