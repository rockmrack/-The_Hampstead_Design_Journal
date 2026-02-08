'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Star, 
  Quote, 
  Play, 
  MapPin, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Award,
  ThumbsUp,
  Building2,
  Hammer,
  CheckCircle2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

interface Review {
  id: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
  date: string;
  review: string;
  source: 'google' | 'houzz' | 'checkatrade' | 'trustatrader';
  verified: boolean;
  response?: string;
  projectValue?: string;
  highlights?: string[];
}

interface VideoTestimonial {
  id: string;
  title: string;
  client: string;
  location: string;
  duration: string;
  thumbnail: string;
  projectType: string;
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'The Ashworth Family',
    location: 'Church Row, NW3',
    projectType: 'Full Restoration',
    rating: 5,
    date: 'November 2023',
    review: "Hampstead Renovations transformed our Grade II* listed Georgian townhouse with extraordinary care and expertise. From the initial survey through to final snagging, James and his team demonstrated deep knowledge of heritage construction. They sourced authentic lime plaster, reproduced our original sash windows, and even matched the historic paint colours through laboratory analysis. The project was complex—18 months of structural repairs, services upgrades, and restoration work—but they communicated clearly throughout and managed Listed Building Consent flawlessly. Our home is now both historically authentic and beautifully functional for modern family life. We couldn't recommend them more highly.",
    source: 'google',
    verified: true,
    response: "Thank you so much for this wonderful review. Working on Church Row was a privilege—it's one of Hampstead's most significant Georgian streets. We're delighted the lime plaster restoration met your expectations, and we look forward to returning for the garden project next spring.",
    projectValue: '£1.8m - £2.2m',
    highlights: ['Listed Building Consent', 'Lime plaster restoration', 'Sash window reproduction']
  },
  {
    id: '2',
    author: 'Dr. Michael Chen',
    location: 'Belsize Park Gardens, NW3',
    projectType: 'Basement Excavation',
    rating: 5,
    date: 'August 2023',
    review: "After interviewing five contractors, we chose Hampstead Renovations for our basement excavation. It was immediately clear they understood the technical challenges—Victorian foundations, party wall agreements, and Camden's strict planning requirements. The project added 1,800 sq ft including a swimming pool, home cinema, and wine cellar. What impressed us most was their management of neighbours and the council. Not a single complaint despite 14 months of construction. The engineering was impeccable, and the finished spaces exceed our expectations. They turned what could have been a nightmare into a surprisingly smooth process.",
    source: 'google',
    verified: true,
    projectValue: '£650k - £750k',
    highlights: ['Party wall management', 'Swimming pool installation', 'Zero neighbour complaints']
  },
  {
    id: '3',
    author: 'Sarah & James Morton',
    location: 'Flask Walk, NW3',
    projectType: 'Interior Restoration',
    rating: 5,
    date: 'March 2024',
    review: "Our 1908 Arts & Crafts house needed specialists who understood the movement's principles. Hampstead Renovations delivered beyond our dreams. They conserved original William Morris wallpaper we didn't know we had, sourced craftspeople who could replicate Voysey-style joinery, and integrated smart home technology so subtly you'd never know it exists. The encaustic tile restoration in our hallway brought us to tears—colours we hadn't seen in decades emerged. Every decision honoured the original architects' intent while making the house work for 21st-century life. True heritage specialists.",
    source: 'houzz',
    verified: true,
    response: "Working with Arts & Crafts properties is always special—the attention to detail those original craftsmen put in deserves equal care today. We're thrilled the William Morris paper could be saved; our paper conservator did remarkable work. Thank you for trusting us with such a significant home.",
    projectValue: '£380k - £450k',
    highlights: ['Morris wallpaper conservation', 'Hidden smart home', 'Encaustic tile restoration']
  },
  {
    id: '4',
    author: 'The Richardson Family',
    location: 'Frognal, NW3',
    projectType: 'Extension',
    rating: 5,
    date: 'June 2023',
    review: "Getting planning approval for a contemporary extension in Frognal's conservation area seemed impossible. Our first architect's designs were rejected twice. Hampstead Renovations introduced us to their planning consultant and within three months we had approval for a stunning glazed extension that everyone now asks about. The build quality is exceptional—structural glass roof, zinc cladding that will patinate beautifully, and bi-fold doors that frame our garden perfectly. They understood exactly what Camden would accept while still delivering something architecturally bold. Worth every penny.",
    source: 'google',
    verified: true,
    projectValue: '£280k - £340k',
    highlights: ['Planning success', 'Conservation area approval', 'Contemporary design']
  },
  {
    id: '5',
    author: 'The Pemberton Family',
    location: 'Hampstead Garden Suburb, NW11',
    projectType: 'Modernisation',
    rating: 5,
    date: 'September 2023',
    review: "HGS Trust is famously strict about alterations, but Hampstead Renovations navigated this brilliantly. Our Lutyens house needed sensitive modernisation—new kitchen, master suite, updated services—without compromising its Grade II character. They presented designs the Trust approved first time, every time. Their knowledge of the Garden Suburb's design principles meant we never had to compromise on our vision. The attention to period-appropriate details, from door furniture to radiator covers, shows their commitment to authenticity. Now we have a home that functions for modern life while honouring Lutyens' genius.",
    source: 'checkatrade',
    verified: true,
    response: "Hampstead Garden Suburb requires a particular understanding of the original architects' intentions. We've developed strong relationships with the HGS Trust over many projects, which certainly helps, but it's really about respecting their design ethos. Delighted you're happy with the result.",
    projectValue: '£890k - £1.1m',
    highlights: ['HGS Trust approval', 'Lutyens preservation', 'Period-appropriate details']
  },
  {
    id: '6',
    author: 'David & Emma Taylor',
    location: 'Heath Street, NW3',
    projectType: 'Conversion',
    rating: 5,
    date: 'December 2023',
    review: "Converting a derelict Victorian shop into our family home seemed daunting, but Hampstead Renovations made it straightforward. They handled change of use applications, structural engineering for the mezzanine, and even the tricky negotiations with our new neighbours. The restored shopfront now gets compliments daily, and the interior is pure modern comfort behind that heritage façade. They found efficiencies that reduced our original budget estimate significantly without cutting corners. Professional, knowledgeable, and genuinely nice people to work with.",
    source: 'trustatrader',
    verified: true,
    projectValue: '£520k - £620k',
    highlights: ['Change of use approval', 'Shopfront restoration', 'Budget efficiency']
  },
  {
    id: '7',
    author: 'Catherine Howard',
    location: 'Well Walk, NW3',
    projectType: 'Refurbishment',
    rating: 5,
    date: 'October 2023',
    review: "A mid-project contractor failure left me with a half-gutted house and mounting stress. Hampstead Renovations stepped in, assessed the mess professionally, and completed the work to an impeccable standard. They found several serious defects from the previous contractor that would have caused problems for years. Their remedial work actually improved on the original plans. I cannot overstate how relieved I was to find them. They turned disaster into a home I'm proud of.",
    source: 'google',
    verified: true,
    response: "We're glad we could help rescue the project. Unfortunately, contractor failures in heritage buildings often reveal hidden problems. Thank you for your patience as we worked through the remediation—the final result shows what can be achieved with proper care."
  },
  {
    id: '8',
    author: 'Professor Michael Armstrong',
    location: 'Downshire Hill, NW3',
    projectType: 'Full Renovation',
    rating: 5,
    date: 'July 2023',
    review: "Academic schedules meant we needed work completed during a specific window while we were on sabbatical. Hampstead Renovations not only met the deadline but communicated daily via video calls so we could make decisions from abroad. The Georgian townhouse renovation included structural underpinning, full rewiring, new heating, and period-sensitive decoration. Every decision was documented with photos, and they managed deliveries and access without us being there. Extraordinary project management.",
    source: 'houzz',
    verified: true,
    projectValue: '£950k - £1.1m',
    highlights: ['Remote management', 'Deadline precision', 'Daily communication']
  },
  {
    id: '9',
    author: 'The Newman Family',
    location: 'East Heath Road, NW3',
    projectType: 'Extension & Refurbishment',
    rating: 5,
    date: 'April 2024',
    review: "We needed accessible modifications for an elderly parent moving in, combined with a general refurbishment of our Edwardian home. Hampstead Renovations designed solutions that look architectural rather than clinical—the ground floor shower room could grace a design magazine, yet includes all safety features. The rear extension provides the perfect granny annexe. They consulted with occupational therapists to ensure everything was right. Compassionate and clever design.",
    source: 'google',
    verified: true,
    highlights: ['Accessibility focus', 'Design-led solutions', 'Occupational therapy consultation']
  },
  {
    id: '10',
    author: 'Alexandra Konstantinidis',
    location: 'Keats Grove, NW3',
    projectType: 'Historic Restoration',
    rating: 5,
    date: 'February 2024',
    review: "Our Regency villa needed a team who understood both conservation principles and modern building science. Hampstead Renovations surveyed meticulously before proposing works, identifying damp issues from previous inappropriate repairs. They removed cement renders, restored breathable lime systems, and the house now regulates moisture naturally as designed 200 years ago. The original features they revealed—including a blocked fireplace with intact surround—were bonuses. Heritage expertise that genuinely understands old buildings.",
    source: 'google',
    verified: true,
    response: "Removing inappropriate cement repairs is so important in Regency buildings—they cause more damage than they solve. Delighted the house is breathing properly again, and that fireplace was certainly a lovely discovery!",
    highlights: ['Damp remediation', 'Lime system restoration', 'Hidden feature discovery']
  }
];

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'v1',
    title: 'Georgian Townhouse Complete Restoration',
    client: 'The Ashworth Family',
    location: 'Church Row',
    duration: '4:32',
    thumbnail: '/images/testimonials/church-row-video.jpg',
    projectType: 'Full Restoration'
  },
  {
    id: 'v2',
    title: 'Basement Excavation Journey',
    client: 'Dr. Michael Chen',
    location: 'Belsize Park',
    duration: '3:45',
    thumbnail: '/images/testimonials/belsize-video.jpg',
    projectType: 'Basement'
  },
  {
    id: 'v3',
    title: 'Arts & Crafts Sensitive Restoration',
    client: 'Sarah & James Morton',
    location: 'Flask Walk',
    duration: '5:12',
    thumbnail: '/images/testimonials/flask-walk-video.jpg',
    projectType: 'Interior'
  }
];

const sourceLogos: Record<Review['source'], { name: string; color: string }> = {
  google: { name: 'Google', color: 'bg-blue-50 text-blue-700' },
  houzz: { name: 'Houzz', color: 'bg-emerald-50 text-emerald-700' },
  checkatrade: { name: 'Checkatrade', color: 'bg-orange-50 text-orange-700' },
  trustatrader: { name: 'TrustATrader', color: 'bg-purple-50 text-purple-700' }
};

export default function TestimonialsPage() {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<Review['source'] | 'all'>('all');

  const filteredReviews = filterSource === 'all' 
    ? reviews 
    : reviews.filter(r => r.source === filterSource);

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Review schema for SEO
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hampstead Renovations",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.slice(0, 5).map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "datePublished": r.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating,
        "bestRating": "5"
      },
      "reviewBody": r.review
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-hampstead-black via-hampstead-black/95 to-hampstead-charcoal/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'Testimonials' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
              Hear directly from homeowners across Hampstead and North West London 
              about their heritage renovation experience
            </p>
          </motion.div>

          {/* Aggregate Rating Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-6 md:gap-12 mt-12 pt-8 border-t border-white/20"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className="w-6 h-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <div className="text-3xl font-bold mb-1">{averageRating.toFixed(1)}</div>
              <div className="text-white/60 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{totalReviews}</div>
              <div className="text-white/60 text-sm">Verified Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-white/60 text-sm">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">47+</div>
              <div className="text-white/60 text-sm">Projects Completed</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Logos */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-sm text-hampstead-charcoal/60">Reviewed on:</span>
            {Object.entries(sourceLogos).map(([key, { name, color }]) => (
              <button
                key={key}
                onClick={() => setFilterSource(filterSource === key ? 'all' : key as Review['source'])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterSource === key 
                    ? 'bg-hampstead-black text-white' 
                    : color + ' hover:opacity-80'
                }`}
              >
                {name} ({reviews.filter(r => r.source === key).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Video Testimonials
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl">
            Watch homeowners share their renovation stories in their own words
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-hampstead-cream rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Video Thumbnail Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-hampstead-charcoal/30 to-hampstead-charcoal/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-hampstead-black ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-playfair text-lg font-bold mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-hampstead-charcoal/60">
                    <span>{video.client}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {video.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Written Reviews */}
      <section className="py-16 md:py-24 bg-hampstead-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Written Reviews
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl">
            Detailed feedback from our clients across all project types
          </p>

          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Review Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-hampstead-cream rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-playfair text-lg font-bold">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{review.author}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-hampstead-charcoal/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {review.location}
                          </span>
                          <span>•</span>
                          <span>{review.projectType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${sourceLogos[review.source].color}`}>
                        {sourceLogos[review.source].name}
                        {review.verified && ' ✓'}
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <p className={`text-hampstead-charcoal/80 leading-relaxed ${
                      expandedReview !== review.id && review.review.length > 300 
                        ? 'line-clamp-3' 
                        : ''
                    }`}>
                      {review.review}
                    </p>
                    {review.review.length > 300 && (
                      <button
                        onClick={() => setExpandedReview(
                          expandedReview === review.id ? null : review.id
                        )}
                        className="text-hampstead-black font-medium text-sm mt-2 hover:underline"
                      >
                        {expandedReview === review.id ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Highlights */}
                  {review.highlights && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.highlights.map(highlight => (
                        <span 
                          key={highlight}
                          className="bg-hampstead-cream px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-hampstead-charcoal/60 pt-4 border-t border-hampstead-charcoal/10">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {review.date}
                    </span>
                    {review.projectValue && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {review.projectValue}
                      </span>
                    )}
                  </div>

                  {/* Response */}
                  {review.response && expandedReview === review.id && (
                    <div className="mt-4 p-4 bg-hampstead-cream/50 rounded-lg border-l-4 border-hampstead-black">
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <Hammer className="w-4 h-4" />
                        Response from Hampstead Renovations
                      </div>
                      <p className="text-sm text-hampstead-charcoal/80">
                        {review.response}
                      </p>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-12 text-center">
            Trusted & Accredited
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Federation of Master Builders', year: 'Member since 2012' },
              { name: 'TrustMark Government Endorsed', year: 'All trades verified' },
              { name: 'RIBA Conservation Register', year: 'Specialist listing' },
              { name: 'Guild of Master Craftsmen', year: 'Full membership' }
            ].map((accreditation, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-hampstead-cream rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-hampstead-black/60" />
                </div>
                <div className="font-medium text-sm">{accreditation.name}</div>
                <div className="text-xs text-hampstead-charcoal/60">{accreditation.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-hampstead-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Join Our Happy Clients
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Start your heritage renovation journey with a team trusted by 
            Hampstead&apos;s most discerning homeowners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/journal/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-hampstead-black px-8 py-4 rounded-lg font-medium hover:bg-hampstead-cream transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/journal/projects"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors border border-white/30"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
