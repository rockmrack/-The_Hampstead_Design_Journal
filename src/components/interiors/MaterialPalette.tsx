import React from 'react';

const materials = [
  { name: 'Carrara Marble', type: 'Stone', hex: '#F3F3F3' },
  { name: 'Unlacquered Brass', type: 'Metal', hex: '#E5C25D' },
  { name: 'Smoked Oak', type: 'Wood', hex: '#6D5A45' },
  { name: 'Tadelakt', type: 'Plaster', hex: '#D6CFC7' },
  { name: 'Zellige', type: 'Tile', hex: '#E8E8E8' },
  { name: 'Bouclé', type: 'Fabric', hex: '#F5F5F0' },
];

export default function MaterialPalette() {
  return (
    <section className="py-16 bg-hampstead-cream">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Materiality
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              The Hampstead Palette
            </h2>
            <p className="text-lg text-hampstead-charcoal/70 leading-relaxed mb-8">
              A curated selection of materials that define the contemporary Hampstead home. 
              Natural, enduring, and improving with age.
            </p>
            <button className="px-6 py-3 bg-hampstead-black text-white text-sm font-medium hover:bg-hampstead-olive transition-colors">
              Explore Material Library
            </button>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div key={material.name} className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="aspect-square w-full mb-4"
                  style={{ backgroundColor: material.hex }}
                />
                <h3 className="font-serif text-lg mb-1">{material.name}</h3>
                <span className="text-xs text-hampstead-charcoal/50 uppercase tracking-wider">
                  {material.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
