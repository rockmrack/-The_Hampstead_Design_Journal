import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Watch | The Hampstead Design Journal',
  description: 'Data-driven insights on property values, renovation ROI, and market trends in Hampstead and North West London.',
  keywords: 'Hampstead property values, renovation ROI London, NW3 property market, Belsize Park prices',
};

export default function MarketWatchPage() {
  return (
    <div className="editorial-spacing">
      <div className="editorial-container">
        <header className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="font-serif text-balance">Market Watch</h1>
          <div className="editorial-divider" />
          <p className="text-xl md:text-2xl leading-loose text-hampstead-charcoal">
            Property values, renovation returns, and market intelligence for North West London.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg leading-loose mb-8">
            Understanding the financial implications of renovation is crucial for homeowners
            and investors alike. This section provides data-driven analysis of property values,
            renovation costs, and return on investment across Hampstead, Belsize Park, and
            the wider NW3 area.
          </p>

          <div className="mt-12">
            <h3 className="text-2xl mb-6 font-serif">What We Analyze</h3>
            <ul className="space-y-4 text-lg">
              <li>• Price per square foot: renovated vs. unmodernised properties</li>
              <li>• ROI analysis: extensions, loft conversions, and basement excavations</li>
              <li>• The "done-up" premium in different Hampstead postcodes</li>
              <li>• Market timing: when to renovate before selling</li>
              <li>• Investment opportunities in NW3</li>
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
