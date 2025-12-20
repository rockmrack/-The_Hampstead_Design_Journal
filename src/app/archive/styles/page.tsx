import type { Metadata } from 'next';
import StyleGuide from '@/components/interiors/StyleGuide';

export const metadata: Metadata = {
  title: 'Interior Styles | The Hampstead Design Journal',
  description: 'A guide to the interior design styles that define the Hampstead aesthetic.',
};

export default function StylesPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Design Aesthetics
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Interior Styles
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Defining the NW3 aesthetic through the ages.
          </p>
        </div>
        <StyleGuide />
      </div>
    </div>
  );
}
