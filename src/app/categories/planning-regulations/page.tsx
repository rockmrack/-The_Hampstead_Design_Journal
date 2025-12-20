import type { Metadata } from 'next';
import ProcessTimeline from '@/components/planning/ProcessTimeline';
import DocumentChecklist from '@/components/planning/DocumentChecklist';
import PlanningFAQ from '@/components/planning/PlanningFAQ';

export const metadata: Metadata = {
  title: 'Planning & Regulations | The Hampstead Design Journal',
  description: 'Navigate Camden Council planning policy with confidence. Expert guidance on basement conversions, extensions, and conservation area regulations in NW3.',
  keywords: 'Camden planning permission, basement conversion NW3, conservation area Hampstead, planning regulations London',
};

export default function PlanningRegulationsPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Policy & Guidance
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Planning & Regulations</h1>
            <div className="w-24 h-1 bg-hampstead-olive mx-auto mb-8" />
            <p className="text-xl md:text-2xl leading-relaxed text-hampstead-charcoal/80">
              Expert guidance on navigating Camden&apos;s planning policies, conservation area rules,
              and building regulations for your Hampstead project.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-loose mb-8 text-hampstead-charcoal/80">
              Understanding Camden Council&apos;s planning requirements is essential for any renovation
              project in Hampstead. From Basement Impact Assessments to Conservation Area Consent,
              we demystify the regulatory landscape to help you achieve your vision while respecting
              the area&apos;s architectural heritage.
            </p>
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <DocumentChecklist />
      <PlanningFAQ />

      <section className="py-16 bg-hampstead-black text-white text-center">
        <div className="editorial-container">
          <h2 className="font-serif text-3xl mb-6">Need Professional Help?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Browse our directory of architects and planning consultants who specialize in Camden conservation areas.
          </p>
          <a 
            href="/archive/trades" 
            className="inline-block px-8 py-4 border border-white/30 hover:bg-white hover:text-hampstead-black transition-colors uppercase tracking-widest text-sm font-bold"
          >
            Find a Specialist
          </a>
        </div>
      </section>
    </main>
  );
}
