import type { Metadata } from 'next';
import RestorationCaseStudies from '@/components/archive/RestorationCaseStudies';

export const metadata: Metadata = {
  title: 'Restoration Case Studies | The Hampstead Design Journal',
  description: 'In-depth analysis of heritage restoration projects in Hampstead, Belsize Park, and Highgate. Before and after transformations.',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-hampstead-cream pt-24 pb-16">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            Project Archive
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-hampstead-black">
            Restoration Case Studies
          </h1>
          <p className="text-lg text-hampstead-charcoal/70 leading-relaxed">
            Detailed walkthroughs of significant restoration projects, highlighting technical challenges and design solutions.
          </p>
        </div>
        <RestorationCaseStudies />
      </div>
    </div>
  );
}
