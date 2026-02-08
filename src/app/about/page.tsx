import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | The Hampstead Design Journal',
  description: 'The authoritative voice on architecture, heritage, and design in Hampstead. Curated by the experts at Hampstead Renovations.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="editorial-spacing">
      <div className="editorial-container">
        <article className="max-w-3xl mx-auto">
          <header className="mb-16 text-center">
            <h1 className="font-serif text-balance mb-6">About The Journal</h1>
            <div className="editorial-divider" />
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-loose mb-8 text-center text-hampstead-charcoal">
              The Hampstead Design Journal is the authoritative voice on architecture, 
              interiors, and living in North West London.
            </p>

            <h2 className="font-serif text-3xl mt-16 mb-6">Our Mission</h2>
            <p className="leading-loose">
              We exist to document, analyze, and celebrate the architectural heritage and 
              design excellence of Hampstead. This is not a lifestyle blog. It is a serious 
              publication for homeowners, architects, and design professionals who understand 
              that every building decision—from brick mortar specification to flooring grade 
              selection—carries consequences.
            </p>

            <p className="leading-loose">
              Our coverage is comprehensive: heritage restoration techniques, Camden planning 
              policy, material specification, property market analysis, and the intersection 
              of period architecture with modern living. We write long-form, deeply researched 
              articles because superficial coverage serves no one.
            </p>

            <h2 className="font-serif text-3xl mt-16 mb-6">Our Standards</h2>
            <p className="leading-loose">
              The Journal maintains editorial independence while being informed by real-world 
              experience. Our content is:
            </p>

            <ul className="space-y-4 my-8 text-lg">
              <li><strong>Data-Driven:</strong> Property values, planning success rates, and ROI 
              calculations are based on verified Land Registry data and our analysis of 150+ 
              projects annually.</li>
              
              <li><strong>Technically Accurate:</strong> Restoration techniques, material 
              specifications, and building regulations are verified by chartered professionals.</li>
              
              <li><strong>Locally Specific:</strong> We write about Hampstead, Belsize Park, 
              and NW3—not generic London advice. Street names, planning precedents, and 
              architectural history are precise.</li>
              
              <li><strong>Written for Practitioners:</strong> We assume readers are undertaking 
              actual projects, not browsing aspirationally. Our articles provide actionable 
              information.</li>
            </ul>

            <h2 className="font-serif text-3xl mt-16 mb-6">The Editorial Team</h2>
            <p className="leading-loose">
              The Hampstead Design Journal is curated by the team at{' '}
              <strong>Hampstead Renovations</strong>. Based at 250 Finchley Road, we have 
              been the custodians of North West London&apos;s finest homes since 2009.
            </p>

            <p className="leading-loose">
              This editorial connection is deliberate. We do not write about theoretical 
              restoration techniques—we execute them. We do not speculate about Camden 
              planning policy—we navigate it weekly. We do not recommend materials we 
              haven&apos;t specified in dozens of projects.
            </p>

            <p className="leading-loose">
              Our contributors include structural engineers, conservation architects, 
              planning consultants, and craftspeople who have spent decades working 
              exclusively in Hampstead&apos;s period properties. Their expertise informs 
              every article.
            </p>

            <h2 className="font-serif text-3xl mt-16 mb-6">Content Pillars</h2>
            <p className="leading-loose">
              Our coverage is organized into four categories:
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="border-l-2 border-hampstead-black pl-6">
                <h3 className="font-serif text-2xl mb-3">
                  <Link href="/journal/categories/heritage-architecture" className="no-underline hover:underline">
                    Heritage & Architecture
                  </Link>
                </h3>
                <p className="text-base">
                  The history, construction methods, and restoration techniques specific 
                  to Hampstead&apos;s Arts &amp; Crafts, Victorian, and Edwardian buildings.
                </p>
              </div>

              <div className="border-l-2 border-hampstead-black pl-6">
                <h3 className="font-serif text-2xl mb-3">
                  <Link href="/journal/categories/planning-regulations" className="no-underline hover:underline">
                    Planning & Regulations
                  </Link>
                </h3>
                <p className="text-base">
                  Navigating Camden Council&apos;s planning policies, conservation area rules, 
                  and building regulations.
                </p>
              </div>

              <div className="border-l-2 border-hampstead-black pl-6">
                <h3 className="font-serif text-2xl mb-3">
                  <Link href="/journal/categories/interiors-materials" className="no-underline hover:underline">
                    Interiors & Materials
                  </Link>
                </h3>
                <p className="text-base">
                  Specification guidance for finishes, materials, and interior design 
                  appropriate to North West London homes.
                </p>
              </div>

              <div className="border-l-2 border-hampstead-black pl-6">
                <h3 className="font-serif text-2xl mb-3">
                  <Link href="/journal/categories/market-watch" className="no-underline hover:underline">
                    Market Watch
                  </Link>
                </h3>
                <p className="text-base">
                  Data-driven analysis of property values, renovation ROI, and market 
                  trends across Hampstead and NW3.
                </p>
              </div>
            </div>

            <h2 className="font-serif text-3xl mt-16 mb-6">For Readers</h2>
            <p className="leading-loose">
              The Journal is published for homeowners, architects, investors, and design 
              professionals working in North West London. If you are:
            </p>

            <ul className="space-y-3 my-8 text-lg">
              <li>• Planning a renovation or restoration project</li>
              <li>• Navigating Camden&apos;s planning process</li>
              <li>• Selecting materials or contractors</li>
              <li>• Analyzing property investment opportunities</li>
              <li>• Simply interested in the architecture and design of Hampstead</li>
            </ul>

            <p className="leading-loose">
              ...then this publication is for you.
            </p>

            <div className="mt-16 p-8 bg-hampstead-cream border border-hampstead-grey">
              <h3 className="font-serif text-2xl mb-4 text-center">Get in Touch</h3>
              <p className="text-center leading-loose mb-6">
                For project inquiries, editorial suggestions, or professional consultations:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://hampsteadrenovations.co.uk/consultation"
                  className="inline-block px-8 py-3 bg-hampstead-black text-hampstead-white no-underline hover:bg-hampstead-charcoal transition-colors"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/journal/contact"
                  className="inline-block px-8 py-3 border border-hampstead-black text-hampstead-black no-underline hover:bg-hampstead-grey transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}