'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  ArrowRight,
  Building2,
  Footprints,
  FileText,
  Palette
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { sanitizeUrl } from '@braintree/sanitize-url';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  address: string;
  postcode: string;
  category: 'open-house' | 'walk' | 'workshop' | 'talk' | 'exhibition' | 'planning';
  price: string;
  capacity?: number;
  spotsLeft?: number;
  bookingUrl?: string;
  organiser: string;
  featured: boolean;
  image?: string;
}

const events: Event[] = [
  // December 2025
  {
    id: 'e1',
    title: 'Hampstead Conservation Area Walking Tour',
    description: 'Join architectural historian Dr. Sarah Mitchell for a 2-hour guided walk through Hampstead Village, exploring Georgian and Victorian architecture, blue plaque locations, and hidden architectural gems. Learn about the area\'s development from rural retreat to artistic enclave.',
    date: '2025-12-06',
    time: '10:00 - 12:00',
    location: 'Hampstead Underground Station',
    address: 'Heath Street',
    postcode: 'NW3 1DN',
    category: 'walk',
    price: '£25',
    capacity: 20,
    spotsLeft: 8,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },
  {
    id: 'e2',
    title: 'Traditional Lime Plastering Workshop',
    description: 'A hands-on workshop covering lime plaster mixing, application techniques, and repair methods for historic buildings. Suitable for homeowners planning renovations and those interested in traditional building crafts. All materials provided.',
    date: '2025-12-14',
    time: '09:30 - 16:00',
    location: 'Hampstead Renovations Workshop',
    address: 'Unit 3, Palace Court, 250 Finchley Road',
    postcode: 'NW3 6DN',
    category: 'workshop',
    price: '£150',
    capacity: 12,
    spotsLeft: 4,
    bookingUrl: '#',
    organiser: 'Hampstead Renovations',
    featured: true
  },
  {
    id: 'e3',
    title: 'Camden Planning Committee Meeting',
    description: 'Public meeting of Camden Council\'s Planning Committee. Major applications being considered include basement extensions in Belsize Park and alterations to listed buildings in Hampstead. Members of the public may attend.',
    date: '2025-12-19',
    time: '19:00 - 21:30',
    location: 'Camden Town Hall',
    address: 'Judd Street',
    postcode: 'WC1H 9JE',
    category: 'planning',
    price: 'Free',
    bookingUrl: 'https://www.camden.gov.uk/planning',
    organiser: 'Camden Council',
    featured: false
  },

  // January 2026
  {
    id: 'e4',
    title: 'Georgian Architecture: Principles & Practice',
    description: 'An illustrated talk by conservation architect James Harrison exploring the principles underlying Georgian architecture—symmetry, proportion, and classical order—and how they should inform modern restoration work. Includes case studies from NW3.',
    date: '2026-01-15',
    time: '19:00 - 21:00',
    location: 'Burgh House & Hampstead Museum',
    address: 'New End Square',
    postcode: 'NW3 1LT',
    category: 'talk',
    price: '£15',
    capacity: 60,
    spotsLeft: 22,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },
  {
    id: 'e5',
    title: 'Sash Window Restoration Masterclass',
    description: 'Learn professional techniques for repairing and restoring original sash windows. Covers draught-proofing, cord replacement, putty repairs, and when secondary glazing is appropriate. Bring photos of your windows for advice.',
    date: '2026-01-25',
    time: '10:00 - 14:00',
    location: 'Hampstead Renovations Workshop',
    address: 'Unit 3, Palace Court, 250 Finchley Road',
    postcode: 'NW3 6DN',
    category: 'workshop',
    price: '£95',
    capacity: 15,
    spotsLeft: 9,
    bookingUrl: '#',
    organiser: 'Hampstead Renovations',
    featured: false
  },
  {
    id: 'e6',
    title: 'Hampstead Garden Suburb Architecture Walk',
    description: 'Explore the unique planned community designed by Raymond Unwin and Barry Parker. This 2.5-hour walk covers the Central Square, St Jude\'s Church, Lutyens\' Free Church, and the distinctive domestic architecture. Learn about HGS Trust requirements.',
    date: '2026-01-18',
    time: '11:00 - 13:30',
    location: 'Hampstead Garden Suburb Station',
    address: 'Hampstead Way',
    postcode: 'NW11 7AH',
    category: 'walk',
    price: '£25',
    capacity: 18,
    spotsLeft: 12,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: false
  },

  // February 2026
  {
    id: 'e7',
    title: 'Understanding Listed Buildings: A Homeowner\'s Guide',
    description: 'Essential seminar for owners of listed buildings covering: what listing means, Listed Building Consent process, working with conservation officers, and managing repairs. Q&A session included. Presented by heritage consultant Elizabeth Shaw.',
    date: '2026-02-05',
    time: '18:30 - 20:30',
    location: 'Burgh House & Hampstead Museum',
    address: 'New End Square',
    postcode: 'NW3 1LT',
    category: 'talk',
    price: '£20',
    capacity: 50,
    spotsLeft: 31,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },
  {
    id: 'e8',
    title: 'Open House: Church Row Georgian Restoration',
    description: 'Exclusive opportunity to visit a recently completed Grade II* Georgian townhouse restoration on historic Church Row. The owners and project team will share insights into the 18-month restoration process, planning challenges, and specialist techniques used.',
    date: '2026-02-15',
    time: '11:00 - 15:00',
    location: 'Church Row',
    address: 'Church Row',
    postcode: 'NW3 6UP',
    category: 'open-house',
    price: '£35',
    capacity: 40,
    spotsLeft: 6,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },
  {
    id: 'e9',
    title: 'Camden Planning Committee Meeting',
    description: 'Monthly public meeting of the Planning Committee. Agenda published one week before meeting on Camden Council website.',
    date: '2026-02-19',
    time: '19:00 - 21:30',
    location: 'Camden Town Hall',
    address: 'Judd Street',
    postcode: 'WC1H 9JE',
    category: 'planning',
    price: 'Free',
    bookingUrl: 'https://www.camden.gov.uk/planning',
    organiser: 'Camden Council',
    featured: false
  },

  // March 2026
  {
    id: 'e10',
    title: 'Victorian Tile Conservation Workshop',
    description: 'Hands-on workshop focused on cleaning, repairing, and conserving Victorian encaustic and geometric floor tiles. Learn professional techniques for removing stubborn stains, re-fixing loose tiles, and colour-matching replacements.',
    date: '2026-03-07',
    time: '10:00 - 15:00',
    location: 'Hampstead Renovations Workshop',
    address: 'Unit 3, Palace Court, 250 Finchley Road',
    postcode: 'NW3 6DN',
    category: 'workshop',
    price: '£125',
    capacity: 10,
    spotsLeft: 7,
    bookingUrl: '#',
    organiser: 'Hampstead Renovations',
    featured: false
  },
  {
    id: 'e11',
    title: 'Arts & Crafts Movement Walk: Flask Walk to Frognal',
    description: 'Discover Hampstead\'s Arts & Crafts heritage on this architectural walk. See houses influenced by William Morris, Philip Webb, and C.F.A. Voysey. Learn about the movement\'s principles and how they shaped North London\'s domestic architecture.',
    date: '2026-03-14',
    time: '14:00 - 16:30',
    location: 'Flask Walk',
    address: 'Outside The Flask pub',
    postcode: 'NW3 1HE',
    category: 'walk',
    price: '£25',
    capacity: 20,
    spotsLeft: 15,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: false
  },
  {
    id: 'e12',
    title: 'Basement Extensions: Planning, Engineering & Reality',
    description: 'A comprehensive evening seminar covering all aspects of basement development in conservation areas. Structural engineer, planning consultant, and contractor perspectives. Includes case studies and honest assessment of costs and timelines.',
    date: '2026-03-19',
    time: '18:30 - 21:00',
    location: 'Burgh House & Hampstead Museum',
    address: 'New End Square',
    postcode: 'NW3 1LT',
    category: 'talk',
    price: '£25',
    capacity: 60,
    spotsLeft: 28,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },

  // April 2026
  {
    id: 'e13',
    title: 'Spring Garden Design for Period Properties',
    description: 'Chelsea gold medal winner garden designer Amanda Sterling discusses appropriate garden design for Georgian, Victorian, and Edwardian properties. Covers period-appropriate planting, hardscape materials, and integrating modern functionality.',
    date: '2026-04-04',
    time: '14:00 - 16:00',
    location: 'Burgh House & Hampstead Museum',
    address: 'New End Square',
    postcode: 'NW3 1LT',
    category: 'talk',
    price: '£15',
    capacity: 50,
    spotsLeft: 35,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: false
  },
  {
    id: 'e14',
    title: 'Open House: Belsize Park Basement Project',
    description: 'Tour a completed Victorian villa basement excavation including swimming pool, home cinema, and wine cellar. The homeowner and project team discuss the 14-month construction process, party wall experiences, and living through the works.',
    date: '2026-04-18',
    time: '10:00 - 14:00',
    location: 'Belsize Park Gardens',
    address: 'Belsize Park Gardens',
    postcode: 'NW3 4LH',
    category: 'open-house',
    price: '£35',
    capacity: 30,
    spotsLeft: 12,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: true
  },

  // May 2026
  {
    id: 'e15',
    title: 'Heritage Paint Colours & Finishes',
    description: 'Workshop exploring historically appropriate paint colours and finishes. Includes colour analysis techniques, understanding Georgian and Victorian palettes, and hands-on mixing of limewash and traditional paints.',
    date: '2026-05-09',
    time: '10:00 - 14:00',
    location: 'Hampstead Renovations Workshop',
    address: 'Unit 3, Palace Court, 250 Finchley Road',
    postcode: 'NW3 6DN',
    category: 'workshop',
    price: '£95',
    capacity: 15,
    spotsLeft: 15,
    bookingUrl: '#',
    organiser: 'Hampstead Renovations',
    featured: false
  },
  {
    id: 'e16',
    title: 'Keats House & Romantic Hampstead Walk',
    description: 'Literary and architectural walk exploring Hampstead\'s connection to the Romantic poets. Visit Keats House, see where Coleridge walked, and discover the Georgian buildings that housed London\'s artistic community.',
    date: '2026-05-16',
    time: '11:00 - 13:30',
    location: 'Keats House',
    address: 'Keats Grove',
    postcode: 'NW3 2RR',
    category: 'walk',
    price: '£30',
    capacity: 20,
    spotsLeft: 20,
    bookingUrl: '#',
    organiser: 'Hampstead Design Journal',
    featured: false
  }
] as const;

const categoryConfig: Record<Event['category'], { label: string; icon: React.ReactNode; color: string }> = {
  'open-house': { label: 'Open House', icon: <Building2 className="w-4 h-4" />, color: 'bg-amber-100 text-amber-800' },
  'walk': { label: 'Architecture Walk', icon: <Footprints className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-800' },
  'workshop': { label: 'Workshop', icon: <Palette className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' },
  'talk': { label: 'Talk & Seminar', icon: <Users className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
  'exhibition': { label: 'Exhibition', icon: <Building2 className="w-4 h-4" />, color: 'bg-rose-100 text-rose-800' },
  'planning': { label: 'Planning Meeting', icon: <FileText className="w-4 h-4" />, color: 'bg-gray-100 text-gray-800' }
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Event['category'] | 'all'>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Booking URLs are now accessed via the static module-level STATIC_BOOKING_URLS lookup
  // which was pre-computed and sanitized at module load time.

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const eventMonth = new Date(event.date).getMonth();
      const matchesMonth = selectedMonth === 'all' || eventMonth === parseInt(selectedMonth);
      return matchesCategory && matchesMonth;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedCategory, selectedMonth]);

  const featuredEvents = events.filter(e => e.featured).slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-GB', { month: 'short' }),
      weekday: date.toLocaleDateString('en-GB', { weekday: 'short' })
    };
  };

  // Events schema for SEO
  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Heritage Architecture Events",
    "description": "Architecture walks, workshops, and heritage events in Hampstead and North West London",
    "url": "https://hampsteaddesignjournal.com/events",
    "numberOfItems": events.length,
    "itemListElement": events.slice(0, 10).map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": event.title,
        "description": event.description,
        "startDate": event.date,
        "location": {
          "@type": "Place",
          "name": event.location,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": event.address,
            "postalCode": event.postcode,
            "addressLocality": "London",
            "addressCountry": "GB"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": event.organiser
        },
        "offers": {
          "@type": "Offer",
          "price": event.price === 'Free' ? '0' : event.price.replace('£', ''),
          "priceCurrency": "GBP"
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-hampstead-black via-hampstead-black/95 to-hampstead-charcoal/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'Events' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-white/60" />
              <span className="text-white/60 text-sm uppercase tracking-wider">Events Calendar</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Heritage Events & Workshops
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Architecture walks, hands-on workshops, expert talks, and exclusive 
              open house events across Hampstead and North West London
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10 sticky top-20 md:top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-hampstead-charcoal/60" />
              <span className="text-sm text-hampstead-charcoal/60">Filter:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-hampstead-black text-white'
                    : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                }`}
              >
                All Events
              </button>
              {Object.entries(categoryConfig).map(([key, { label, icon }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as Event['category'])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === key
                      ? 'bg-hampstead-black text-white'
                      : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Month Filter */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm bg-white border border-hampstead-charcoal/20 focus:outline-none focus:ring-2 focus:ring-hampstead-black/20"
            >
              <option value="all">All Months</option>
              {months.map((month, i) => (
                <option key={month} value={i}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {selectedCategory === 'all' && selectedMonth === 'all' && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
              Featured Events
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredEvents.map((event, index) => {
                const dateInfo = formatShortDate(event.date);
                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-hampstead-cream rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-hampstead-black text-white rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                          <div className="text-xs uppercase mt-1">{dateInfo.month}</div>
                        </div>
                        <div className="flex-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${categoryConfig[event.category].color}`}>
                            {categoryConfig[event.category].icon}
                            {categoryConfig[event.category].label}
                          </span>
                          <h3 className="font-playfair text-lg font-bold mt-2 line-clamp-2">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-hampstead-charcoal/70 line-clamp-2 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-hampstead-charcoal/60 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-hampstead-charcoal/10">
                        <div className="font-semibold">{event.price}</div>
                        {event.spotsLeft && event.spotsLeft < 10 && (
                          <span className="text-xs text-rose-600 font-medium">
                            {event.spotsLeft} spots left
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-12 md:py-20 bg-hampstead-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
            {selectedCategory === 'all' && selectedMonth === 'all' 
              ? 'Upcoming Events' 
              : `${filteredEvents.length} Events Found`}
          </h2>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <Calendar className="w-12 h-12 text-hampstead-charcoal/30 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold mb-2">No events found</h3>
              <p className="text-hampstead-charcoal/60">
                Try adjusting your filters or check back soon
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => {
                const dateInfo = formatShortDate(event.date);
                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Date Badge */}
                        <div className="flex md:flex-col items-center gap-3 md:gap-0 md:min-w-[70px]">
                          <div className="bg-hampstead-cream rounded-lg p-3 text-center w-16">
                            <div className="text-xs text-hampstead-charcoal/60">{dateInfo.weekday}</div>
                            <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                            <div className="text-xs uppercase mt-1">{dateInfo.month}</div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${categoryConfig[event.category].color}`}>
                              {categoryConfig[event.category].icon}
                              {categoryConfig[event.category].label}
                            </span>
                            <span className="text-xs text-hampstead-charcoal/50">
                              by {event.organiser}
                            </span>
                          </div>

                          <h3 className="font-playfair text-lg font-bold mb-2">
                            {event.title}
                          </h3>

                          <p className="text-sm text-hampstead-charcoal/70 mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-hampstead-charcoal/60 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}, {event.postcode}
                            </span>
                            {event.capacity && (
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.capacity} places
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hampstead-charcoal/10">
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">{event.price}</span>
                              {event.spotsLeft && event.spotsLeft < 10 && (
                                <span className="text-xs text-rose-600 font-medium bg-rose-50 px-2 py-1 rounded">
                                  Only {event.spotsLeft} spots left
                                </span>
                              )}
                            </div>
                            {/* SECURITY: Sanitize URL at render time to ensure safe href */}
                            {(() => {
                              if (!event.bookingUrl) return null;

                              const safeHref = sanitizeUrl(event.bookingUrl);
                              if (!safeHref || safeHref === 'about:blank') return null;

                              try {
                                const parsed = new URL(safeHref, window.location.origin);
                                if (!['http:', 'https:'].includes(parsed.protocol)) return null;
                              } catch {
                                return null;
                              }

                              return (
                                <a
                                  href={safeHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-hampstead-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hampstead-charcoal transition-colors"
                                >
                                  <Ticket className="w-4 h-4" />
                                  Book Now
                                </a>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Host a Heritage Event
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-8 max-w-2xl mx-auto">
            Have a recently completed renovation you&apos;d like to share? Interested in 
            hosting a workshop or speaking at an event? We&apos;re always looking for 
            partners and venues.
          </p>
          <Link
            href="/journal/contact"
            className="inline-flex items-center justify-center gap-2 bg-hampstead-black text-white px-8 py-4 rounded-lg font-medium hover:bg-hampstead-charcoal transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-hampstead-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-6 text-white/60" />
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Never Miss an Event
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for early access to event bookings, 
            exclusive open house invitations, and heritage news from NW3
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-hampstead-black rounded-lg font-medium hover:bg-hampstead-cream transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
