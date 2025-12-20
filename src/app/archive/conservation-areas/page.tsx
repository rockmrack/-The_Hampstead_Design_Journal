import type { Metadata } from 'next';
import ConservationAreaGuide from '@/components/archive/ConservationAreaGuide';

export const metadata: Metadata = {
  title: 'Conservation Area Guide | The Hampstead Design Journal',
  description: 'A comprehensive guide to Camden\'s conservation areas, including Hampstead, Belsize Park, and Highgate. Understand the rules, restrictions, and history.',
};

export default function ConservationAreasPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Planning & Heritage
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Conservation Area Guide
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Navigating the complexities of planning permission in North West London's most protected neighbourhoods.
          </p>
        </div>
        <ConservationAreaGuide />
      </div>
    </div>
  );
}
