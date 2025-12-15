import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Heritage & Architecture | The Hampstead Design Journal',
  description: 'Expert insights on preserving and renovating Hampstead\'s finest period properties. From Arts & Crafts homes to Victorian terraces, discover the architecture of NW3.',
  keywords: 'Hampstead architecture, heritage restoration, listed buildings NW3, Arts and Crafts homes, Victorian renovation',
};

export default function HeritageArchitecturePage() {
  return (
    <div className="editorial-spacing">
      <div className="editorial-container">
        <header className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="font-serif text-balance">Heritage & Architecture</h1>
          <div className="editorial-divider" />
          <p className="text-xl md:text-2xl leading-loose text-hampstead-charcoal">
            Exploring the architectural heritage of Hampstead and the art of preserving
            North West London&apos;s finest period properties.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg leading-loose mb-8">
            From the red brick Arts &amp; Crafts homes of Redington Road to the grand Victorian
            villas of Frognal, Hampstead&apos;s architectural heritage is unmatched. This section
            explores the history, craftsmanship, and specialist techniques required to restore
            and preserve these extraordinary buildings.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Article previews will go here */}
            <div className="border-b border-hampstead-grey pb-8">
              <h3 className="text-2xl mb-3">Featured Articles</h3>
              <p className="text-hampstead-charcoal">Articles coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
