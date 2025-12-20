import type { Metadata } from 'next';
import ArchitecturalGlossary from '@/components/archive/ArchitecturalGlossary';

export const metadata: Metadata = {
  title: 'Architectural Glossary | The Hampstead Design Journal',
  description: 'A comprehensive guide to the architectural terminology of Hampstead and North West London.',
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Terminology
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Architectural Glossary
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Decoding the language of London's built heritage.
          </p>
        </div>
        <ArchitecturalGlossary />
      </div>
    </div>
  );
}
