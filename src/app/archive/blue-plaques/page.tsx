import type { Metadata } from 'next';
import BluePlaqueMap from '@/components/archive/BluePlaqueMap';

export const metadata: Metadata = {
  title: 'Blue Plaques of Hampstead | The Hampstead Design Journal',
  description: 'Discover the homes of the artists, writers, and scientists who shaped Hampstead\'s history.',
};

export default function BluePlaquesPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Cultural Heritage
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Blue Plaques Map
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Walking in the footsteps of Hampstead's most famous residents.
          </p>
        </div>
        <BluePlaqueMap />
      </div>
    </div>
  );
}
