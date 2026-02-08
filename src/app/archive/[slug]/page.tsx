import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, AlertTriangle, CheckCircle, Building } from 'lucide-react';
import ImageComparisonSlider from '@/components/archive/ImageComparisonSlider';
import HeritageSurveyCTA from '@/components/archive/HeritageSurveyCTA';

// Street profiles data - In production, this would come from Contentlayer or a CMS
const streetProfiles = {
  'redington-road': {
    name: 'Redington Road',
    fullName: 'The Redington Road Archive',
    era: 'Arts & Crafts',
    period: '1890-1910',
    conservationArea: 'Redington Frognal',
    location: 'NW3',
    heroImage: '/images/archive/streets/redington-road-hero.jpg',
    excerpt: 'Built between 1890 and 1910, Redington Road represents the peak of the Arts & Crafts movement in Hampstead. Unlike the white stucco of Belsize, these homes utilize deep red brick and terracotta detailing.',
    history: `Redington Road takes its name from the Redington family, who owned much of the land in this area during the 18th century. The road was developed during the height of the Arts & Crafts movement, when architects and builders consciously rejected the mass-produced uniformity of Victorian terraces.

The homes here were designed as individual artistic statements. Each property, while sharing common materials and proportions, exhibits unique detailing in its porch designs, window arrangements, and decorative brickwork. The street attracted successful artists, academics, and professionals who valued craftsmanship over ostentation.

Notable residents have included the architect Sir Giles Gilbert Scott (designer of the red telephone box) and the scientist Rosalind Franklin.`,
    builderAnalysis: {
      brick: {
        type: 'Soft Red Rubber Bricks (Imperial Size)',
        detail: '9" × 4.5" × 3" - These pre-metric bricks were hand-pressed and have a distinctive soft texture. The deep red colour comes from the iron-rich clay of the Home Counties.',
        warning: 'Modern metric bricks (215mm × 102.5mm × 65mm) will NOT fit these facades. Matching requires sourcing reclaimed Imperial-sized bricks or commissioning special runs.',
      },
      mortar: {
        type: 'Original Lime Putty Mortar',
        detail: 'Fat lime (non-hydraulic) mixed with sharp sand, typically in a 1:3 ratio. The mortar was intentionally softer than the brick to allow moisture movement.',
        warning: 'Using cement mortar on these properties will cause the brick faces to "blow" (spall) within 10-15 years. The building cannot breathe and moisture becomes trapped.',
      },
      windows: {
        type: 'Lead-Light Casements with Timber Frames',
        detail: 'Original windows feature hand-made leaded lights in Arts & Crafts geometric patterns. The frames are typically in oak or Douglas fir, with traditional iron casement stays.',
        warning: 'UPVC replacements are generally refused in this Conservation Area. Even timber replacements must match the original glazing bar profile exactly.',
      },
      roofing: {
        type: 'Hand-Made Clay Tiles',
        detail: 'Typically Keymer or Ashdown hand-made clay tiles in a warm orange-red. The natural variation in colour and slight camber are key characteristics.',
        warning: 'Machine-made tiles and concrete tiles are visually incompatible. Camden planning will likely refuse them in Conservation Area applications.',
      },
      details: {
        type: 'Terracotta and Carved Stone',
        detail: 'Many properties feature terracotta panels above windows and carved stone lintels. These were often bespoke designs by the original architect.',
        warning: 'Painting over terracotta or stonework is irreversible and will be flagged as enforcement action.',
      },
    },
    planningNotes: `Properties on Redington Road fall within the Redington Frognal Conservation Area. This means:

- **Permitted Development Rights are restricted.** Many alterations that would normally be "permitted development" require full planning permission here.
- **Article 4 Direction applies.** This removes additional permitted development rights, including changes to windows, doors, and front boundary treatments.
- **Pre-application advice is strongly recommended.** Camden charges approximately £200 for householder pre-application advice, but this can save months of delay from refused applications.

The conservation area character appraisal specifically notes the importance of "deep red brick, terracotta detailing, and Arts & Crafts architectural character" as elements to preserve.`,
    ourExpertise: 'At Hampstead Renovations, we hold a stock of reclaimed Imperial Red bricks specifically for Redington Road projects. We do not patch; we restore. Our lime mortar specifications have been developed over 15 years of working on NW3 heritage properties.',
    beforeAfter: {
      before: '/images/archive/streets/redington-road-1905.jpg',
      after: '/images/archive/streets/redington-road-now.jpg',
      beforeYear: '1905',
      afterYear: '2024',
    },
    relatedStreets: ['frognal', 'the-bishops-avenue', 'hampstead-garden-suburb'],
  },
  'frognal': {
    name: 'Frognal',
    fullName: 'The Frognal Archive',
    era: 'Mixed Heritage',
    period: '1870-1920',
    conservationArea: 'Redington Frognal',
    location: 'NW3',
    heroImage: '/images/archive/streets/frognal-hero.jpg',
    excerpt: 'From grand Victorian villas to Arts & Crafts gems, Frognal charts the evolution of Hampstead architecture over fifty transformative years.',
    history: `Frognal is one of the ancient roads of Hampstead, its name deriving from the medieval "Frogenhale" (valley of frogs). While the road has existed for centuries, the majority of surviving buildings date from the Victorian and Edwardian periods.

The street demonstrates an unusual architectural diversity. The southern section, developed in the 1870s-1880s, features imposing Victorian villas in the Italianate style with white stucco facades. Moving northward, the architecture transitions through Queen Anne Revival to full Arts & Crafts by the 1900s.

This evolution makes Frognal a living textbook of late 19th-century residential architecture. Notable properties include University College School (relocated here in 1907) and several houses attributed to prominent Arts & Crafts architects.`,
    builderAnalysis: {
      brick: {
        type: 'Variable: Stock Brick (South) to Red Brick (North)',
        detail: 'Southern properties use yellow London stock brick, often behind stucco. Northern properties use the characteristic red rubber bricks of the Arts & Crafts movement.',
        warning: 'The stucco on Victorian properties is lime-based. Patching with cement render will cause delamination and dampness.',
      },
      mortar: {
        type: 'Lime Mortar Throughout',
        detail: 'Both periods used lime-based mortars, though the Victorian properties often used a slightly harder hydraulic lime for the stucco base coats.',
        warning: 'Never use cement-based render or pointing on ANY Frognal property, regardless of period.',
      },
      windows: {
        type: 'Timber Sash (Victorian) / Casement (Arts & Crafts)',
        detail: 'Victorian properties feature elegant sash windows with slim glazing bars. Arts & Crafts properties have casement windows, often with decorative leaded lights.',
        warning: 'Window replacement requires Conservation Area consent and designs must match original patterns exactly.',
      },
      roofing: {
        type: 'Welsh Slate (Victorian) / Clay Tiles (Edwardian)',
        detail: 'The Victorian villas typically have Welsh blue slate roofs, while Arts & Crafts properties use hand-made clay tiles.',
        warning: 'Spanish or Chinese slate is visually incompatible with Welsh slate and will likely be refused.',
      },
      details: {
        type: 'Stucco Mouldings / Terracotta Details',
        detail: 'Victorian properties feature elaborate stucco cornices and window surrounds. Edwardian properties have terracotta embellishments and carved woodwork.',
        warning: 'Stucco repairs must use matching lime putty and traditional casting techniques. Modern "fibrous plaster" repairs are often visible.',
      },
    },
    planningNotes: `Frognal presents unique planning challenges due to its mixed character:

- **Two distinct character areas** are recognized within the conservation area appraisal. Proposals must respect the specific character of each section.
- **Height and massing** are strictly controlled. Frognal has resisted the "iceberg basement" developments seen elsewhere in Camden.
- **Tree Preservation Orders** cover many mature trees on the street. Any work to trees requires Council consent.

The Camden Planning guidance specifically states that "the varied but coherent architectural character of Frognal is a key heritage asset to be preserved."`,
    ourExpertise: 'We maintain separate material specifications for Victorian Frognal and Edwardian Frognal. Our stucco repair team has restored facades across the southern section, while our Arts & Crafts specialists work on the northern properties.',
    beforeAfter: {
      before: '/images/archive/streets/frognal-1890.jpg',
      after: '/images/archive/streets/frognal-now.jpg',
      beforeYear: '1890',
      afterYear: '2024',
    },
    relatedStreets: ['redington-road', 'belsize-park', 'well-walk'],
  },
  'the-bishops-avenue': {
    name: 'The Bishops Avenue',
    fullName: 'The Bishops Avenue Archive',
    era: 'Edwardian & Inter-War',
    period: '1900-1935',
    conservationArea: 'Kenwood',
    location: 'N2',
    heroImage: '/images/archive/streets/bishops-avenue-hero.jpg',
    excerpt: 'London\'s "Billionaires\' Row" began as Arts & Crafts mansions before embracing Inter-War grandeur. The original houses tell a different story from today\'s headlines.',
    history: `The Bishops Avenue takes its name from the Bishops of London, who owned the Manor of Hornsey (which included this land) from medieval times. The road was laid out in the 1890s, but significant development began only after 1900.

The original properties were substantial but restrained Arts & Crafts and Edwardian mansions, designed for wealthy but not necessarily aristocratic families. They featured the characteristic red brick, generous gardens, and quality craftsmanship of the era.

The street's transformation into "Billionaires' Row" began in the 1980s when Middle Eastern investors began purchasing properties. Many original houses were demolished and replaced with larger modern constructions. However, a significant number of original Edwardian and Inter-War properties survive, representing some of the finest examples of their type in North London.`,
    builderAnalysis: {
      brick: {
        type: 'High-Quality Red Facing Brick',
        detail: 'The original mansions used premium red facing bricks, often from the Butterley or Ibstock works. The quality is noticeably higher than standard residential construction of the period.',
        warning: 'Replacement bricks must be of equivalent quality. Standard engineering bricks are visually incompatible.',
      },
      mortar: {
        type: 'Lime Mortar with Fine Sand',
        detail: 'Original mortar used a finer sand than typical for the period, giving a smoother joint. The colour is typically a warm cream rather than grey.',
        warning: 'Cement pointing will stand out dramatically against the fine-jointed original work.',
      },
      windows: {
        type: 'Timber Sash and Casement (Steel in Inter-War)',
        detail: 'Edwardian properties have timber windows. Inter-War houses introduced Crittall-style steel windows, which are now protected as heritage features.',
        warning: 'Crittall window replacements must match original profiles exactly. Modern thermal break versions may be acceptable with listed building consent.',
      },
      roofing: {
        type: 'Clay Tiles and Slate',
        detail: 'Roofing materials vary by period: clay tiles for Arts & Crafts properties, slate for grander Edwardian houses, and some pantiles on Inter-War construction.',
        warning: 'The roofscape is a key heritage asset. Dormers, roof extensions, and material changes are tightly controlled.',
      },
      details: {
        type: 'Stone Dressings and Decorative Woodwork',
        detail: 'Many properties feature Portland stone porticos, window surrounds, and quoins. Timber work includes elaborate porches and bay window constructions.',
        warning: 'Stone cleaning must use appropriate non-abrasive methods. Sandblasting is prohibited.',
      },
    },
    planningNotes: `The Bishops Avenue presents unique planning circumstances:

- **Part of the Kenwood Conservation Area,** which includes Kenwood House and its grounds. The setting of Kenwood is a key planning consideration.
- **Many properties are locally listed** even if not nationally listed. This provides significant protection against demolition and harmful alterations.
- **The Borough boundary** runs through the street (Barnet/Haringey). Planning requirements differ slightly depending on which side your property falls.

Recent planning policy has become stricter following public concern about derelict "mothballed" properties and inappropriate redevelopments.`,
    ourExpertise: 'Our work on The Bishops Avenue has included full restorations of Inter-War mansions, sensitive extensions to Edwardian properties, and the reinstatement of original architectural features lost to previous insensitive alterations.',
    beforeAfter: {
      before: '/images/archive/streets/bishops-avenue-1925.jpg',
      after: '/images/archive/streets/bishops-avenue-now.jpg',
      beforeYear: '1925',
      afterYear: '2024',
    },
    relatedStreets: ['redington-road', 'hampstead-garden-suburb', 'well-walk'],
  },
};

type StreetSlug = keyof typeof streetProfiles;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(streetProfiles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = streetProfiles[resolvedParams.slug as StreetSlug];

  if (!profile) {
    return {
      title: 'Street Not Found | The Hampstead Design Journal',
    };
  }

  return {
    title: `${profile.fullName} | Heritage Archive`,
    description: profile.excerpt,
    keywords: `${profile.name} history, ${profile.name} architecture, ${profile.name} conservation, ${profile.location} heritage, ${profile.era} houses`,
    alternates: {
      canonical: `/archive/${resolvedParams.slug}`,
    },
  };
}

export default async function StreetProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const profile = streetProfiles[resolvedParams.slug as StreetSlug];

  if (!profile) {
    notFound();
  }

  const analysisItems = Object.entries(profile.builderAnalysis);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Breadcrumb */}
      <div className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-4">
          <nav className="flex items-center gap-2 text-sm text-hampstead-charcoal/60">
            <Link href="/journal" className="hover:text-hampstead-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/journal/archive" className="hover:text-hampstead-black transition-colors">Archive</Link>
            <span>/</span>
            <span className="text-hampstead-black">{profile.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-hampstead-black text-white text-xs font-medium uppercase tracking-wide">
                Street Profile
              </span>
              <span className="text-sm text-hampstead-charcoal/60">{profile.era}</span>
              <span className="text-sm text-hampstead-charcoal/60">•</span>
              <span className="text-sm text-hampstead-charcoal/60">{profile.period}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              {profile.fullName}
            </h1>

            <p className="text-xl md:text-2xl text-hampstead-charcoal/70 leading-relaxed">
              {profile.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-hampstead-charcoal/50" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-hampstead-charcoal/50" />
                <span>{profile.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-hampstead-charcoal/50" />
                <span>{profile.conservationArea} Conservation Area</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Column */}
            <div>
              {/* Then & Now Slider */}
              <div className="mb-12">
                <ImageComparisonSlider
                  beforeImage={profile.beforeAfter.before}
                  afterImage={profile.beforeAfter.after}
                  beforeYear={profile.beforeAfter.beforeYear}
                  afterYear={profile.beforeAfter.afterYear}
                  beforeLabel="Then"
                  afterLabel="Now"
                />
              </div>

              {/* History Section */}
              <div className="mb-12">
                <h2 className="font-serif text-3xl mb-6">The History</h2>
                <div className="prose prose-lg prose-hampstead max-w-none">
                  {profile.history.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Inline CTA */}
              <HeritageSurveyCTA streetName={profile.name} variant="inline" />

              {/* Builder's Analysis */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Ruler className="w-6 h-6" />
                  <h2 className="font-serif text-3xl">The Builder&apos;s Analysis</h2>
                </div>
                <p className="text-lg text-hampstead-charcoal/70 mb-8">
                  Technical DNA of {profile.name}. These specifications are essential for 
                  any restoration work on this street.
                </p>

                <div className="space-y-6">
                  {analysisItems.map(([key, item]) => (
                    <div 
                      key={key} 
                      className="bg-hampstead-cream border border-hampstead-grey p-6 md:p-8"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-1 block">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <h3 className="font-serif text-xl">{item.type}</h3>
                        </div>
                      </div>

                      <p className="text-hampstead-charcoal/80 leading-relaxed mb-4">
                        {item.detail}
                      </p>

                      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-900">
                          <strong>Warning:</strong> {item.warning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planning Notes */}
              <div className="mb-12">
                <h2 className="font-serif text-3xl mb-6">Planning & Conservation</h2>
                <div className="prose prose-lg prose-hampstead max-w-none">
                  {profile.planningNotes.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Our Expertise */}
              <div className="bg-hampstead-black text-white p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Our Expertise
                  </span>
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {profile.ourExpertise}
                </p>
                <Link
                  href={`/journal/contact?subject=heritage-survey&street=${encodeURIComponent(profile.name)}`}
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-hampstead-black font-medium hover:bg-hampstead-cream transition-colors"
                >
                  Book a {profile.name} Survey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <HeritageSurveyCTA streetName={profile.name} variant="sidebar" />

              {/* Related Streets */}
              <div className="bg-hampstead-cream border border-hampstead-grey p-6">
                <h4 className="font-serif text-lg mb-4">Related Archives</h4>
                <div className="space-y-3">
                  {profile.relatedStreets.map((slug) => {
                    const related = streetProfiles[slug as StreetSlug];
                    if (!related) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/journal/archive/${slug}`}
                        className="flex items-center justify-between group"
                      >
                        <span className="group-hover:text-hampstead-charcoal/70 transition-colors">
                          {related.name}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white border border-hampstead-grey p-6">
                <h4 className="font-serif text-lg mb-4">Quick Facts</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-hampstead-charcoal/60">Era</dt>
                    <dd className="font-medium">{profile.era}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-hampstead-charcoal/60">Period</dt>
                    <dd className="font-medium">{profile.period}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-hampstead-charcoal/60">Conservation Area</dt>
                    <dd className="font-medium">{profile.conservationArea}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-hampstead-charcoal/60">Location</dt>
                    <dd className="font-medium">{profile.location}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="border-t border-hampstead-grey py-8">
        <div className="editorial-container">
          <Link
            href="/journal/archive"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-hampstead-charcoal/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Heritage Archive
          </Link>
        </div>
      </section>
    </main>
  );
}
