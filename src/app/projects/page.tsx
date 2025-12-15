'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Ruler, 
  PoundSterling, 
  Clock, 
  Award, 
  ChevronRight,
  ArrowRight,
  Star,
  Building2,
  Hammer,
  CheckCircle2,
  Quote,
  Filter
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

interface Project {
  id: string;
  title: string;
  location: string;
  postcode: string;
  category: 'full-renovation' | 'basement' | 'restoration' | 'extension' | 'interior';
  period: string;
  listing?: 'Grade II' | 'Grade II*' | 'Locally Listed';
  conservationArea: string;
  completionDate: string;
  duration: string;
  squareFootage: number;
  budgetRange: string;
  beforeImage: string;
  afterImage: string;
  heroImage: string;
  highlights: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  awards?: string[];
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'church-row-restoration',
    title: 'Georgian Townhouse Complete Restoration',
    location: 'Church Row, Hampstead',
    postcode: 'NW3',
    category: 'full-renovation',
    period: 'Georgian (1720)',
    listing: 'Grade II*',
    conservationArea: 'Hampstead',
    completionDate: 'November 2023',
    duration: '18 months',
    squareFootage: 4200,
    budgetRange: '£1.8m - £2.2m',
    beforeImage: '/images/projects/church-row-before.jpg',
    afterImage: '/images/projects/church-row-after.jpg',
    heroImage: '/images/projects/church-row-hero.jpg',
    highlights: [
      'Full structural repair of original timber frame',
      'Restoration of original lime plaster throughout',
      'Bespoke sash window reproduction',
      'Historic paint analysis and authentic colour scheme',
      'Underfloor heating with heritage-sensitive installation',
      'Listed Building Consent obtained in 8 weeks'
    ],
    testimonial: {
      quote: "Hampstead Renovations understood our home's history from day one. They didn't just renovate—they revived 300 years of craftsmanship. Every detail, from the lime wash to the hand-forged ironmongery, speaks to their expertise.",
      author: "The Ashworth Family",
      role: "Homeowners"
    },
    awards: ['RIBA Regional Award 2024', 'Georgian Group Conservation Award'],
    featured: true
  },
  {
    id: 'belsize-park-basement',
    title: 'Victorian Villa Basement & Lower Ground',
    location: 'Belsize Park Gardens',
    postcode: 'NW3',
    category: 'basement',
    period: 'Victorian (1872)',
    conservationArea: 'Belsize',
    completionDate: 'August 2023',
    duration: '14 months',
    squareFootage: 1800,
    budgetRange: '£650k - £750k',
    beforeImage: '/images/projects/belsize-basement-before.jpg',
    afterImage: '/images/projects/belsize-basement-after.jpg',
    heroImage: '/images/projects/belsize-basement-hero.jpg',
    highlights: [
      'Full basement excavation with party wall agreements',
      'Swimming pool and spa installation',
      'Light well with heritage-compliant glazing',
      'Home cinema with acoustic isolation',
      'Wine cellar with climate control',
      'Zero impact on garden footprint'
    ],
    testimonial: {
      quote: "We gained 1,800 square feet of living space without touching the garden. The team managed neighbours, planning, and engineering seamlessly. It's now the heart of our home.",
      author: "Dr. Michael Chen",
      role: "Homeowner"
    },
    featured: true
  },
  {
    id: 'flask-walk-arts-crafts',
    title: 'Arts & Crafts Sensitive Interior Restoration',
    location: 'Flask Walk',
    postcode: 'NW3',
    category: 'interior',
    period: 'Arts & Crafts (1908)',
    listing: 'Grade II',
    conservationArea: 'Hampstead',
    completionDate: 'March 2024',
    duration: '8 months',
    squareFootage: 2800,
    budgetRange: '£380k - £450k',
    beforeImage: '/images/projects/flask-walk-before.jpg',
    afterImage: '/images/projects/flask-walk-after.jpg',
    heroImage: '/images/projects/flask-walk-hero.jpg',
    highlights: [
      'Original William Morris wallpaper conservation',
      'Bespoke oak joinery matching Voysey style',
      'Restored Arts & Crafts fireplace surrounds',
      'Period-appropriate electrical installation',
      'Hidden smart home integration',
      'Original encaustic tile floor restoration'
    ],
    testimonial: {
      quote: "They found craftspeople who could replicate techniques from 1908. Our home looks exactly as intended, yet works for modern life. The hidden technology is invisible but transforms how we live.",
      author: "Sarah & James Morton",
      role: "Homeowners"
    },
    awards: ['Victorian Society Award 2024'],
    featured: true
  },
  {
    id: 'frognal-extension',
    title: 'Contemporary Rear Extension in Conservation Area',
    location: 'Frognal',
    postcode: 'NW3',
    category: 'extension',
    period: 'Edwardian (1905)',
    conservationArea: 'Frognal',
    completionDate: 'June 2023',
    duration: '10 months',
    squareFootage: 600,
    budgetRange: '£280k - £340k',
    beforeImage: '/images/projects/frognal-before.jpg',
    afterImage: '/images/projects/frognal-after.jpg',
    heroImage: '/images/projects/frognal-hero.jpg',
    highlights: [
      'Glazed extension with zinc cladding',
      'Structural glass roof for natural light',
      'Seamless indoor-outdoor living',
      'Planning approval in conservation area',
      'Underfloor heating throughout',
      'Bespoke steel-framed bi-fold doors'
    ],
    testimonial: {
      quote: "Getting planning approval seemed impossible, but they knew exactly what Camden would accept. The design is bold yet respects our Edwardian home. Worth every penny.",
      author: "The Richardson Family",
      role: "Homeowners"
    },
    featured: false
  },
  {
    id: 'heath-street-commercial',
    title: 'Period Shop Conversion to Residential',
    location: 'Heath Street',
    postcode: 'NW3',
    category: 'full-renovation',
    period: 'Victorian (1885)',
    listing: 'Locally Listed',
    conservationArea: 'Hampstead',
    completionDate: 'December 2023',
    duration: '12 months',
    squareFootage: 1600,
    budgetRange: '£520k - £620k',
    beforeImage: '/images/projects/heath-street-before.jpg',
    afterImage: '/images/projects/heath-street-after.jpg',
    heroImage: '/images/projects/heath-street-hero.jpg',
    highlights: [
      'Change of use planning approval',
      'Original shopfront restoration',
      'Mezzanine floor insertion',
      'Heritage-sensitive double glazing',
      'Private courtyard garden creation',
      'Full mechanical & electrical upgrade'
    ],
    testimonial: {
      quote: "From derelict shop to family home in 12 months. They handled everything: planning, conservation officers, even the neighbours. Professional from start to finish.",
      author: "David & Emma Taylor",
      role: "Homeowners"
    },
    featured: false
  },
  {
    id: 'hampstead-garden-suburb',
    title: 'Lutyens House Sympathetic Modernisation',
    location: 'Hampstead Garden Suburb',
    postcode: 'NW11',
    category: 'restoration',
    period: 'Arts & Crafts (1912)',
    listing: 'Grade II',
    conservationArea: 'Hampstead Garden Suburb',
    completionDate: 'September 2023',
    duration: '15 months',
    squareFootage: 3400,
    budgetRange: '£890k - £1.1m',
    beforeImage: '/images/projects/hgs-before.jpg',
    afterImage: '/images/projects/hgs-after.jpg',
    heroImage: '/images/projects/hgs-hero.jpg',
    highlights: [
      'Lutyens original features preserved',
      'New kitchen within service wing',
      'Master suite with ensuite addition',
      'HGS Trust design approval',
      'Period-appropriate window repairs',
      'Garden designed by Chelsea winner'
    ],
    testimonial: {
      quote: "HGS Trust is famously strict, but Hampstead Renovations had done their homework. Every proposal was approved first time. They understand the Garden Suburb like no one else.",
      author: "The Pemberton Family",
      role: "Homeowners"
    },
    featured: true
  }
];

const categoryLabels: Record<Project['category'], string> = {
  'full-renovation': 'Full Renovation',
  'basement': 'Basement & Excavation',
  'restoration': 'Heritage Restoration',
  'extension': 'Extension',
  'interior': 'Interior Design'
};

const categoryColors: Record<Project['category'], string> = {
  'full-renovation': 'bg-amber-100 text-amber-800',
  'basement': 'bg-blue-100 text-blue-800',
  'restoration': 'bg-emerald-100 text-emerald-800',
  'extension': 'bg-purple-100 text-purple-800',
  'interior': 'bg-rose-100 text-rose-800'
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);
  const categories = Object.keys(categoryLabels) as Project['category'][];

  // Projects schema for SEO
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Heritage Renovation Projects Portfolio",
    "description": "Explore our portfolio of heritage renovation projects across North West London, featuring before/after transformations of Georgian, Victorian, and Edwardian properties.",
    "url": "https://hampsteaddesignjournal.com/projects",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.highlights.join('. '),
          "datePublished": project.completionDate,
          "locationCreated": {
            "@type": "Place",
            "name": project.location,
            "address": {
              "@type": "PostalAddress",
              "postalCode": project.postcode,
              "addressLocality": "London"
            }
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-hampstead-black via-hampstead-black/95 to-hampstead-black/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'Projects' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
              Transforming North West London&apos;s finest heritage properties. 
              Explore our portfolio of award-winning renovations, restorations, 
              and sensitive modernisations.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>47+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>12 Industry Awards</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span>4.9★ Average Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-hampstead-charcoal/60 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-hampstead-black text-white'
                  : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
              }`}
            >
              All Projects ({projects.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-hampstead-black text-white'
                    : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                }`}
              >
                {categoryLabels[cat]} ({projects.filter(p => p.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {selectedCategory === 'all' && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl">
              Award-winning transformations showcasing the pinnacle of heritage craftsmanship
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-hampstead-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-hampstead-charcoal/20 to-hampstead-charcoal/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-hampstead-charcoal/20" />
                    </div>
                    {project.awards && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {project.awards.slice(0, 1).map(award => (
                          <span key={award} className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Award Winner
                          </span>
                        ))}
                      </div>
                    )}
                    {project.listing && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                          {project.listing}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                        {categoryLabels[project.category]}
                      </span>
                      <span className="text-hampstead-charcoal/60 text-sm">
                        {project.period}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl md:text-2xl font-bold mb-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-hampstead-charcoal/60 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        {project.squareFootage.toLocaleString()} sq ft
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {project.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-hampstead-charcoal/70">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-hampstead-charcoal/10">
                      <div className="text-sm">
                        <span className="text-hampstead-charcoal/60">Investment: </span>
                        <span className="font-semibold">{project.budgetRange}</span>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-2 text-hampstead-black font-medium hover:gap-3 transition-all"
                      >
                        View Project
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className={`py-16 md:py-24 ${selectedCategory === 'all' ? 'bg-hampstead-cream' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory === 'all' && (
            <>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                All Projects
              </h2>
              <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl">
                Browse our complete portfolio of heritage renovations across Hampstead, 
                Belsize Park, and surrounding conservation areas
              </p>
            </>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-hampstead-charcoal/5"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-hampstead-charcoal/15 to-hampstead-charcoal/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-hampstead-charcoal/20" />
                  </div>
                  {project.listing && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                        {project.listing}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[project.category]}`}>
                      {categoryLabels[project.category]}
                    </span>
                  </div>

                  <h3 className="font-playfair text-lg font-bold mb-2 line-clamp-2 group-hover:text-hampstead-charcoal/80 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-hampstead-charcoal/60 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-hampstead-charcoal/70 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      {project.squareFootage.toLocaleString()} sq ft
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-hampstead-charcoal/10">
                    <span className="text-sm font-medium">{project.budgetRange}</span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-medium text-hampstead-black hover:underline"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-hampstead-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-playfair text-4xl md:text-5xl font-bold mb-2">47+</div>
              <div className="text-white/60">Projects Completed</div>
            </div>
            <div>
              <div className="font-playfair text-4xl md:text-5xl font-bold mb-2">£28m</div>
              <div className="text-white/60">Total Project Value</div>
            </div>
            <div>
              <div className="font-playfair text-4xl md:text-5xl font-bold mb-2">12</div>
              <div className="text-white/60">Industry Awards</div>
            </div>
            <div>
              <div className="font-playfair text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-white/60">Planning Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-hampstead-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Heritage Property?
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-8 max-w-2xl mx-auto">
            Book a consultation with our heritage renovation specialists. 
            We&apos;ll discuss your vision, assess your property, and provide 
            a detailed proposal within two weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-hampstead-black text-white px-8 py-4 rounded-lg font-medium hover:bg-hampstead-charcoal transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-white text-hampstead-black px-8 py-4 rounded-lg font-medium hover:bg-hampstead-charcoal/5 transition-colors border border-hampstead-charcoal/20"
            >
              Estimate Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-hampstead-charcoal/30 to-hampstead-charcoal/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-20 h-20 text-hampstead-charcoal/20" />
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {selectedProject.awards && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {selectedProject.awards.map(award => (
                      <span key={award} className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {award}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[selectedProject.category]}`}>
                    {categoryLabels[selectedProject.category]}
                  </span>
                  <span className="text-hampstead-charcoal/60">{selectedProject.period}</span>
                  {selectedProject.listing && (
                    <span className="bg-hampstead-cream px-3 py-1 rounded-full text-sm font-medium">
                      {selectedProject.listing}
                    </span>
                  )}
                </div>

                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
                  {selectedProject.title}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-hampstead-cream rounded-xl">
                  <div>
                    <div className="text-xs text-hampstead-charcoal/60 mb-1">Location</div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-hampstead-charcoal/60 mb-1">Duration</div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {selectedProject.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-hampstead-charcoal/60 mb-1">Size</div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Ruler className="w-4 h-4" />
                      {selectedProject.squareFootage.toLocaleString()} sq ft
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-hampstead-charcoal/60 mb-1">Investment</div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <PoundSterling className="w-4 h-4" />
                      {selectedProject.budgetRange}
                    </div>
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-bold mb-4">Project Highlights</h3>
                <ul className="grid md:grid-cols-2 gap-3 mb-8">
                  {selectedProject.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-hampstead-charcoal/80">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Testimonial */}
                <div className="bg-hampstead-black text-white rounded-xl p-6 md:p-8 mb-8">
                  <Quote className="w-10 h-10 text-white/30 mb-4" />
                  <blockquote className="text-lg md:text-xl leading-relaxed mb-6">
                    &ldquo;{selectedProject.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium">
                        {selectedProject.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{selectedProject.testimonial.author}</div>
                      <div className="text-white/60 text-sm">{selectedProject.testimonial.role}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-hampstead-black text-white px-6 py-3 rounded-lg font-medium hover:bg-hampstead-charcoal transition-colors"
                  >
                    Discuss a Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-hampstead-cream text-hampstead-black px-6 py-3 rounded-lg font-medium hover:bg-hampstead-charcoal/10 transition-colors"
                  >
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
