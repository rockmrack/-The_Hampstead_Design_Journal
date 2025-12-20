import type { Metadata } from 'next';
import ArchitecturalTimeline from '@/components/archive/ArchitecturalTimeline';

export const metadata: Metadata = {
  title: 'Architectural Timeline | The Hampstead Design Journal',
  description: 'A chronological journey through the architectural history of North West London, from 1700 to the present day.',
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            History & Evolution
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Architectural Timeline
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Tracing the development of NW3 from a spa village to a modernist laboratory.
          </p>
        </div>
        <ArchitecturalTimeline />
      </div>
    </div>
  );
}
