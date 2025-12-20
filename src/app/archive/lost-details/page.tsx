import type { Metadata } from 'next';
import LostDetailsLibrary from '@/components/archive/LostDetailsLibrary';

export const metadata: Metadata = {
  title: 'Lost Details Library | The Hampstead Design Journal',
  description: 'A visual archive of the architectural details that have been lost from Hampstead\'s streetscape.',
};

export default function LostDetailsPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Preservation
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Lost Details Library
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Documenting the vanishing architectural features of NW3.
          </p>
        </div>
        <LostDetailsLibrary />
      </div>
    </div>
  );
}
