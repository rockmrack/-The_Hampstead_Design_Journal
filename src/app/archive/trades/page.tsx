import type { Metadata } from 'next';
import HistoricTradesDirectory from '@/components/archive/HistoricTradesDirectory';

export const metadata: Metadata = {
  title: 'Historic Trades Directory | The Hampstead Design Journal',
  description: 'A directory of traditional craftspeople and specialist trades serving North West London\'s heritage properties.',
};

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Specialist Craftsmanship
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Historic Trades Directory
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Connecting custodians of period homes with the skilled artisans required to maintain them.
          </p>
        </div>
        <HistoricTradesDirectory />
      </div>
    </div>
  );
}
