import type { Metadata } from 'next';
import MaterialsLibrary from '@/components/archive/MaterialsLibrary';

export const metadata: Metadata = {
  title: 'Materials Library | The Hampstead Design Journal',
  description: 'The definitive guide to heritage building materials in Hampstead. From London stock brick to Welsh slate and lime mortar.',
};

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Construction DNA
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            The Materials Library
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            A technical resource for architects and homeowners. Identifying and sourcing the correct materials for period restoration.
          </p>
        </div>
        <MaterialsLibrary />
      </div>
    </div>
  );
}
