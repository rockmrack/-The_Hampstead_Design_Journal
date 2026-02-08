'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  ChevronRight,
  Mail,
  CheckCircle,
  BookOpen,
  Home,
  Ruler,
  Scale,
  Shield,
  Hammer,
  Leaf,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const guides = [
  {
    id: 'conservation-area-guide',
    title: 'Complete Guide to Hampstead Conservation Areas',
    description: 'Everything you need to know about planning in NW3 conservation areas, including Article 4 directions, permitted development rights, and getting applications approved.',
    pages: 28,
    icon: Shield,
    category: 'Planning',
    popular: true,
    topics: [
      'All 7 conservation area boundaries mapped',
      'Article 4 restrictions explained',
      'Step-by-step planning application guide',
      'Officer contact details and tips',
      'Case studies of approved applications'
    ]
  },
  {
    id: 'basement-extension-guide',
    title: 'Hampstead Basement Extension Guide',
    description: 'Technical guide to basement construction in Hampstead, covering Camden\'s basement policy, structural considerations, and project management.',
    pages: 24,
    icon: Home,
    category: 'Construction',
    popular: true,
    topics: [
      'Camden basement policy explained',
      'Structural engineering requirements',
      'Waterproofing specifications',
      'Neighbour notification process',
      'Typical costs and timelines'
    ]
  },
  {
    id: 'period-window-guide',
    title: 'Period Window Restoration & Replacement',
    description: 'Comprehensive guide to maintaining, restoring, or replacing windows in heritage properties while complying with conservation requirements.',
    pages: 18,
    icon: Ruler,
    category: 'Restoration',
    popular: false,
    topics: [
      'Window types by era (Georgian to Edwardian)',
      'Restoration vs replacement decision matrix',
      'Approved suppliers and materials',
      'Draught-proofing and thermal performance',
      'Listed building consent requirements'
    ]
  },
  {
    id: 'listed-building-guide',
    title: 'Living in a Listed Building: Owner\'s Guide',
    description: 'Essential guide for Grade I, II*, and II listed building owners covering consents, maintenance obligations, and enhancement opportunities.',
    pages: 32,
    icon: Scale,
    category: 'Legal',
    popular: false,
    topics: [
      'What listing means for owners',
      'Works requiring consent',
      'Finding specialist contractors',
      'Insurance and mortgage considerations',
      'Grants and tax relief available'
    ]
  },
  {
    id: 'renovation-project-guide',
    title: 'Hampstead Renovation Project Planner',
    description: 'Complete project management guide from concept to completion, with templates, checklists, and local contractor recommendations.',
    pages: 36,
    icon: Hammer,
    category: 'Project Management',
    popular: true,
    topics: [
      'Project timeline templates',
      'Budget planning spreadsheets',
      'Contractor vetting checklist',
      'Communication templates',
      'Snagging and handover guide'
    ]
  },
  {
    id: 'sustainable-heritage-guide',
    title: 'Sustainable Retrofitting in Heritage Properties',
    description: 'How to improve energy efficiency in period properties without compromising character or conservation area requirements.',
    pages: 22,
    icon: Leaf,
    category: 'Sustainability',
    popular: false,
    topics: [
      'Approved insulation methods',
      'Secondary glazing options',
      'Heat pump considerations',
      'Solar panel regulations in conservation areas',
      'EPC improvements case studies'
    ]
  },
  {
    id: 'pre-purchase-guide',
    title: 'Buying a Period Property in Hampstead',
    description: 'Due diligence guide for prospective buyers covering surveys, searches, and hidden costs specific to heritage properties.',
    pages: 20,
    icon: BookOpen,
    category: 'Buying',
    popular: false,
    topics: [
      'Essential surveys for period properties',
      'Conservation area searches explained',
      'Party wall considerations',
      'Service charge analysis (for flats)',
      'Renovation cost estimation'
    ]
  },
  {
    id: 'seasonal-maintenance-guide',
    title: 'Seasonal Maintenance Calendar',
    description: 'Month-by-month maintenance guide to protect your Hampstead property through the year, with local tradesperson contacts.',
    pages: 16,
    icon: Clock,
    category: 'Maintenance',
    popular: false,
    topics: [
      'Spring: Exterior inspection checklist',
      'Summer: Drainage and ventilation',
      'Autumn: Heating and insulation prep',
      'Winter: Emergency procedures',
      'Trusted local tradesperson directory'
    ]
  }
];

const categories = ['All', 'Planning', 'Construction', 'Restoration', 'Legal', 'Project Management', 'Sustainability', 'Buying', 'Maintenance'];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredGuides = selectedCategory === 'All' 
    ? guides 
    : guides.filter(g => g.category === selectedCategory);

  const handleDownload = async (guideId: string) => {
    if (!email) {
      setSelectedGuide(guideId);
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    
    // In production, this would:
    // 1. Add email to newsletter list
    // 2. Trigger PDF email delivery
    // 3. Track download analytics
  };

  const popularGuides = guides.filter(g => g.popular);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/journal" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Guides</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Downloadable Guides
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Expert guides for Hampstead property owners—planning, renovation, restoration, 
              and maintenance. Free to download.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="section-spacing border-b border-hampstead-grey">
        <div className="editorial-container">
          <h2 className="font-serif text-2xl mb-8">Most Popular</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 bg-white border border-hampstead-grey hover:border-hampstead-black transition-colors"
              >
                <div className="absolute top-4 right-4 px-2 py-1 bg-hampstead-cream text-xs font-medium">
                  Popular
                </div>
                <guide.icon className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
                <h3 className="font-serif text-xl mb-2">{guide.title}</h3>
                <p className="text-sm text-hampstead-charcoal/60 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between text-xs text-hampstead-charcoal/50 mb-4">
                  <span>{guide.pages} pages</span>
                  <span>{guide.category}</span>
                </div>
                <button
                  onClick={() => handleDownload(guide.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Free
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="font-serif text-2xl">All Guides</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedCategory === category
                      ? 'border-hampstead-black bg-hampstead-black text-white'
                      : 'border-hampstead-grey hover:border-hampstead-charcoal'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-white border border-hampstead-grey hover:border-hampstead-black transition-colors"
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-8">
                    <div className="flex items-start gap-4">
                      <guide.icon className="w-10 h-10 text-hampstead-charcoal/20 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl">{guide.title}</h3>
                          <span className="px-2 py-0.5 bg-hampstead-cream text-xs">{guide.category}</span>
                        </div>
                        <p className="text-sm text-hampstead-charcoal/60 mb-4">{guide.description}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {guide.topics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-hampstead-charcoal/50">
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex flex-col items-end gap-4">
                    <div className="text-right">
                      <span className="text-2xl font-serif">{guide.pages}</span>
                      <span className="text-xs text-hampstead-charcoal/50 block">pages</span>
                    </div>
                    <button
                      onClick={() => handleDownload(guide.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Free
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      {selectedGuide && !submitted && (
        <div 
          className="fixed inset-0 bg-hampstead-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGuide(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-md w-full border border-hampstead-grey"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl mb-2">Download Your Guide</h3>
            <p className="text-sm text-hampstead-charcoal/60 mb-6">
              Enter your email to receive the guide. You&apos;ll also get our monthly 
              newsletter with Hampstead property insights.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); handleDownload(selectedGuide); }}>
              <div className="mb-4">
                <label htmlFor="email" className="text-xs font-medium block mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/30" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-hampstead-grey focus:border-hampstead-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Send Guide to Email
                  </>
                )}
              </button>

              <p className="text-xs text-hampstead-charcoal/50 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      )}

      {/* Success Modal */}
      {submitted && (
        <div 
          className="fixed inset-0 bg-hampstead-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => { setSubmitted(false); setSelectedGuide(null); setEmail(''); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-md w-full border border-hampstead-grey text-center"
            onClick={e => e.stopPropagation()}
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl mb-2">Check Your Email</h3>
            <p className="text-sm text-hampstead-charcoal/60 mb-6">
              We&apos;ve sent your guide to <strong>{email}</strong>. 
              It should arrive within a few minutes.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelectedGuide(null); setEmail(''); }}
              className="px-6 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
            >
              Download Another Guide
            </button>
          </motion.div>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="section-spacing bg-hampstead-cream border-t border-hampstead-grey">
        <div className="editorial-container">
          <div className="max-w-2xl mx-auto text-center">
            <FileText className="w-12 h-12 text-hampstead-charcoal/20 mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4">Custom Guides Available</h2>
            <p className="text-hampstead-charcoal/70 mb-6">
              Need a guide specific to your property or project? We create bespoke 
              documentation for complex renovations and planning applications.
            </p>
            <Link
              href="/journal/contact?subject=custom-guide"
              className="inline-flex items-center gap-2 px-8 py-4 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
            >
              Request Custom Guide
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
