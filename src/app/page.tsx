import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterSignup from '../components/layout/NewsletterSignup';

export const metadata: Metadata = {
  title: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="editorial-spacing border-b border-hampstead-grey">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 text-balance">
              The Hampstead Design Journal
            </h1>
            <p className="text-2xl md:text-3xl text-hampstead-charcoal leading-relaxed mb-12">
              Architecture, Interiors, and Living in North West London
            </p>
            <div className="editorial-divider" />
            <p className="text-lg md:text-xl leading-loose mt-12 max-w-3xl mx-auto">
              The authoritative voice on heritage restoration, planning policy, material 
              specification, and design excellence in Hampstead, Belsize Park, and NW3.
            </p>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="section-spacing bg-hampstead-cream">
        <div className="editorial-container">
          <h2 className="font-serif text-4xl text-center mb-16">Explore Our Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Link 
              href="/categories/heritage-architecture" 
              className="group no-underline block p-8 bg-hampstead-white border border-hampstead-grey hover:border-hampstead-black transition-all"
            >
              <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                Heritage & Architecture
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal">
                The history, construction methods, and restoration techniques specific to 
                Hampstead's Arts & Crafts, Victorian, and Edwardian buildings.
              </p>
            </Link>

            <Link 
              href="/categories/planning-regulations" 
              className="group no-underline block p-8 bg-hampstead-white border border-hampstead-grey hover:border-hampstead-black transition-all"
            >
              <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                Planning & Regulations
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal">
                Navigating Camden Council's planning policies, conservation area rules, 
                and building regulations for your Hampstead project.
              </p>
            </Link>

            <Link 
              href="/categories/interiors-materials" 
              className="group no-underline block p-8 bg-hampstead-white border border-hampstead-grey hover:border-hampstead-black transition-all"
            >
              <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                Interiors & Materials
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal">
                Specification guidance for finishes, materials, and interior design 
                appropriate to North West London's finest homes.
              </p>
            </Link>

            <Link 
              href="/categories/market-watch" 
              className="group no-underline block p-8 bg-hampstead-white border border-hampstead-grey hover:border-hampstead-black transition-all"
            >
              <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                Market Watch
              </h3>
              <p className="text-lg leading-relaxed text-hampstead-charcoal">
                Data-driven analysis of property values, renovation ROI, and market 
                trends across Hampstead and NW3.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-spacing">
        <div className="editorial-container">
          <h2 className="font-serif text-4xl text-center mb-16">Featured Articles</h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <article className="border-b border-hampstead-grey pb-12">
              <Link href="/articles/arts-and-crafts-renovation-guide" className="group no-underline">
                <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                  Redington Road to Frognal: A Guide to Renovating Arts & Crafts Homes in NW3
                </h3>
                <p className="text-lg leading-relaxed text-hampstead-charcoal mb-4">
                  From their distinctive red brickwork to hand-crafted timber detailing, 
                  the Arts & Crafts homes of Hampstead represent a pinnacle of domestic 
                  architecture. Here's how to restore them properly.
                </p>
                <span className="text-sm uppercase tracking-wide">Heritage & Architecture</span>
              </Link>
            </article>

            <article className="border-b border-hampstead-grey pb-12">
              <Link href="/articles/camden-basement-planning-guide" className="group no-underline">
                <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                  The Camden Basement Guide: Navigating Planning Permission in 2025
                </h3>
                <p className="text-lg leading-relaxed text-hampstead-charcoal mb-4">
                  Basement conversions are the only viable way to expand in Hampstead—but 
                  Camden Council's planning policies are among the strictest in London. 
                  Here's everything you need to know.
                </p>
                <span className="text-sm uppercase tracking-wide">Planning & Regulations</span>
              </Link>
            </article>

            <article className="border-b border-hampstead-grey pb-12">
              <Link href="/articles/herringbone-oak-flooring-guide" className="group no-underline">
                <h3 className="font-serif text-3xl mb-4 group-hover:underline">
                  Flooring Trends: Why Herringbone Oak is the Eternal Choice for Belsize Park
                </h3>
                <p className="text-lg leading-relaxed text-hampstead-charcoal mb-4">
                  From finish selection to grade specification, here's why engineered oak 
                  in herringbone pattern remains the definitive flooring choice for 
                  discerning North West London homeowners.
                </p>
                <span className="text-sm uppercase tracking-wide">Interiors & Materials</span>
              </Link>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/articles" 
              className="inline-block px-8 py-3 border border-hampstead-black text-hampstead-black hover:bg-hampstead-black hover:text-hampstead-white transition-colors no-underline"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* About Section */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-6">About The Journal</h2>
            <div className="editorial-divider" />
            <p className="text-lg leading-loose mt-8 mb-8">
              <em>The Hampstead Design Journal</em> is curated by the team at{' '}
              <strong>Hampstead Renovations</strong>. Based at 250 Finchley Road, we have 
              been the custodians of North West London's finest homes since 2009.
            </p>
            <Link 
              href="/about" 
              className="inline-block px-8 py-3 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}