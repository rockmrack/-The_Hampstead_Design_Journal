import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planning & Regulations | The Hampstead Design Journal',
  description: 'Navigate Camden Council planning policy with confidence. Expert guidance on basement conversions, extensions, and conservation area regulations in NW3.',
  keywords: 'Camden planning permission, basement conversion NW3, conservation area Hampstead, planning regulations London',
};

export default function PlanningRegulationsPage() {
  return (
    <div className="editorial-spacing">
      <div className="editorial-container">
        <header className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="font-serif text-balance">Planning & Regulations</h1>
          <div className="editorial-divider" />
          <p className="text-xl md:text-2xl leading-loose text-hampstead-charcoal">
            Expert guidance on navigating Camden's planning policies, conservation area rules,
            and building regulations for your Hampstead project.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg leading-loose mb-8">
            Understanding Camden Council's planning requirements is essential for any renovation
            project in Hampstead. From Basement Impact Assessments to Conservation Area Consent,
            we demystify the regulatory landscape to help you achieve your vision while respecting
            the area's architectural heritage.
          </p>

          <div className="mt-12">
            <h3 className="text-2xl mb-6 font-serif">Key Topics</h3>
            <ul className="space-y-4 text-lg">
              <li>• Basement conversions and excavation policy</li>
              <li>• Conservation area regulations</li>
              <li>• Listed building consent</li>
              <li>• Party wall agreements</li>
              <li>• Construction Management Plans</li>
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
