import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interiors & Materials | The Hampstead Design Journal',
  description: 'Curated insights on interior design, finishes, and materials for North West London homes. From herringbone oak to bespoke joinery.',
  keywords: 'Hampstead interiors, luxury materials London, engineered oak flooring, bespoke joinery NW3',
};

export default function InteriorsMaterialsPage() {
  return (
    <div className="editorial-spacing">
      <div className="editorial-container">
        <header className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="font-serif text-balance">Interiors & Materials</h1>
          <div className="editorial-divider" />
          <p className="text-xl md:text-2xl leading-loose text-hampstead-charcoal">
            A curated exploration of finishes, materials, and interior design for
            discerning Hampstead homeowners.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg leading-loose mb-8">
            The selection of materials and finishes defines the character of a home. From
            selecting the perfect engineered oak flooring to specifying natural stone worktops
            or commissioning bespoke joinery, every detail matters. Here we explore the options
            available to those creating exceptional interiors in North West London.
          </p>

          <div className="mt-12">
            <h3 className="text-2xl mb-6 font-serif">Topics We Cover</h3>
            <ul className="space-y-4 text-lg">
              <li>• Flooring: engineered oak, natural stone, reclaimed timber</li>
              <li>• Kitchen design and material selection</li>
              <li>• Bathroom finishes and fixtures</li>
              <li>• Bespoke joinery and fitted furniture</li>
              <li>• Paint, wallcoverings, and decorative finishes</li>
              <li>• Lighting design and specification</li>
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl mb-3 font-serif">Featured Articles</h3>
            <p className="text-hampstead-charcoal">Articles coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
