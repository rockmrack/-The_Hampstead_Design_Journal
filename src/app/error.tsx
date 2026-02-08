'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="editorial-container text-center">
        <span className="text-6xl mb-6 block">⚠️</span>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Something Went Wrong</h1>
        <p className="text-xl text-hampstead-charcoal/70 mb-10 max-w-md mx-auto">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors uppercase tracking-widest text-sm"
          >
            Try Again
          </button>
          <Link
            href="/journal" 
            className="px-8 py-4 border border-hampstead-black text-hampstead-black hover:bg-hampstead-black hover:text-hampstead-white transition-colors uppercase tracking-widest text-sm"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
