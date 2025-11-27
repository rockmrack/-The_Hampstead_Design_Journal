'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight,
  Users,
  Hammer,
  Ruler,
  Paintbrush,
  Home,
  MapPin,
  Clock,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

const openRoles = [
  {
    id: 'project-manager',
    title: 'Senior Project Manager - Heritage Renovations',
    department: 'Project Management',
    type: 'Full-time',
    location: 'NW3 / Site-based',
    salary: '£65,000 - £85,000',
    description: 'Lead complex heritage renovation projects from inception to completion, managing client relationships, contractor coordination, and programme delivery.',
    requirements: [
      '7+ years experience in residential construction project management',
      'Deep understanding of conservation area regulations',
      'Experience with listed building projects preferred',
      'Strong client-facing communication skills',
      'PRINCE2 or APM certification',
    ],
    benefits: [
      'Performance bonus up to 20%',
      'Company vehicle allowance',
      'Professional development budget',
      '25 days holiday + bank holidays',
    ],
    posted: '2024-11-15',
  },
  {
    id: 'site-manager',
    title: 'Site Manager - Basement Construction',
    department: 'Construction',
    type: 'Full-time',
    location: 'NW3 Sites',
    salary: '£55,000 - £70,000',
    description: 'Manage day-to-day operations on residential basement construction sites across North London. Ensure quality, safety, and programme compliance.',
    requirements: [
      'SMSTS certification required',
      '5+ years basement/underpinning experience',
      'Experience with party wall works',
      'Strong understanding of structural engineering principles',
      'First Aid at Work certificate',
    ],
    benefits: [
      'Overtime opportunities',
      'Company van and fuel card',
      'Health insurance',
      'Pension contribution 5%',
    ],
    posted: '2024-11-10',
  },
  {
    id: 'architect',
    title: 'Heritage Architect',
    department: 'Design',
    type: 'Full-time',
    location: 'NW3 Studio',
    salary: '£50,000 - £65,000',
    description: 'Join our in-house design team specialising in sensitive extensions and alterations to period properties in Hampstead conservation areas.',
    requirements: [
      'Part 3 qualified architect',
      '3+ years post-qualification experience',
      'Portfolio of residential conservation projects',
      'Strong hand-drawing skills',
      'Proficiency in AutoCAD, SketchUp, and Adobe Suite',
    ],
    benefits: [
      'Studio in the heart of Hampstead',
      'Flexible working arrangements',
      'CPD training budget',
      'Annual architecture tour',
    ],
    posted: '2024-11-20',
  },
];

const craftRoles = [
  {
    id: 'master-plasterer',
    title: 'Master Plasterer - Period Restoration',
    trade: 'Plastering',
    type: 'Freelance / Contract',
    dayRate: '£350 - £450/day',
    description: 'Specialist restoration plastering including lime work, cornice restoration, and decorative moulding reproduction.',
    requirements: [
      'NVQ Level 3 in Plastering or equivalent',
      'Extensive experience with lime plaster',
      'Ability to match existing period profiles',
      'Own hand tools',
    ],
  },
  {
    id: 'joiner',
    title: 'Architectural Joiner',
    trade: 'Joinery',
    type: 'Freelance / Contract',
    dayRate: '£300 - £400/day',
    description: 'Create and install bespoke timber windows, doors, and internal joinery for heritage properties. Workshop and site work.',
    requirements: [
      'City & Guilds in Joinery or equivalent',
      'Experience with sash windows essential',
      'Understanding of traditional timber construction',
      'Full clean driving licence',
    ],
  },
  {
    id: 'stone-mason',
    title: 'Stone Mason',
    trade: 'Masonry',
    type: 'Freelance / Contract',
    dayRate: '£320 - £420/day',
    description: 'Restoration and new stone work including repairs, cleaning, pointing, and new installations on listed buildings.',
    requirements: [
      'NVQ Level 3 in Stonemasonry',
      'Experience with Portland and Bath stone',
      'Understanding of lime mortars',
      'CSCS card required',
    ],
  },
  {
    id: 'lead-worker',
    title: 'Lead Worker / Roofing Specialist',
    trade: 'Roofing',
    type: 'Freelance / Contract',
    dayRate: '£300 - £380/day',
    description: 'Lead sheet work, traditional roofing repairs, and heritage roof restorations across North London.',
    requirements: [
      'Lead sheet association certification',
      'Working at height certification',
      'Experience with heritage roofing materials',
      'Own lead working tools',
    ],
  },
];

const values = [
  {
    icon: Award,
    title: 'Craftsmanship First',
    description: 'We believe in doing work we\'re proud of. Every project should enhance the heritage of Hampstead.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Architects, builders, and craftspeople working together. No silos, no blame—just solutions.',
  },
  {
    icon: Heart,
    title: 'Client Relationships',
    description: 'Our clients trust us with their homes. That trust is earned through transparency and excellence.',
  },
  {
    icon: Building2,
    title: 'Local Commitment',
    description: 'We\'re part of the Hampstead community. Our work contributes to the area we call home.',
  },
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-20">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Careers</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Join Hampstead Renovations
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed mb-8">
              We&apos;re building a team of exceptional people who share our passion for 
              heritage architecture and meticulous craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
              >
                View Open Roles
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#craftspeople"
                className="inline-flex items-center gap-2 px-6 py-3 border border-hampstead-grey bg-white text-hampstead-charcoal hover:bg-hampstead-cream transition-colors"
              >
                Craftspeople Register
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing border-b border-hampstead-grey">
        <div className="editorial-container">
          <h2 className="font-serif text-2xl mb-8">What We Value</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-hampstead-cream border border-hampstead-grey"
              >
                <value.icon className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
                <h3 className="font-medium mb-2">{value.title}</h3>
                <p className="text-sm text-hampstead-charcoal/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="section-spacing border-b border-hampstead-grey">
        <div className="editorial-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl">Open Positions</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm">
              {openRoles.length} roles available
            </span>
          </div>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <motion.div
                key={role.id}
                layout
                className="border border-hampstead-grey bg-white overflow-hidden"
              >
                <button
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl mb-2">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-hampstead-charcoal/60">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {role.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{role.salary}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${selectedRole === role.id ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </button>

                {selectedRole === role.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-6 border-t border-hampstead-grey pt-6"
                  >
                    <p className="text-hampstead-charcoal/70 mb-6">{role.description}</p>

                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {role.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {role.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-hampstead-charcoal/30 flex-shrink-0 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`mailto:careers@hampsteadrenovations.com?subject=Application: ${role.title}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Apply Now
                      </a>
                      <a
                        href="tel:02074319823"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call to Discuss
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftspeople */}
      <section id="craftspeople" className="section-spacing border-b border-hampstead-grey bg-hampstead-cream">
        <div className="editorial-container">
          <div className="max-w-3xl mb-8">
            <h2 className="font-serif text-2xl mb-4">Craftspeople & Tradespeople</h2>
            <p className="text-hampstead-charcoal/70">
              We work with a network of exceptional tradespeople on heritage projects across North London. 
              If you&apos;re a specialist craftsperson with period property experience, we&apos;d like to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {craftRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white border border-hampstead-grey"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50">
                      {role.trade}
                    </span>
                    <h3 className="font-serif text-lg mt-1">{role.title}</h3>
                  </div>
                  <span className="px-2 py-1 bg-hampstead-cream text-xs">
                    {role.type}
                  </span>
                </div>

                <p className="text-sm text-hampstead-charcoal/60 mb-4">{role.description}</p>

                <div className="mb-4 p-3 bg-hampstead-cream">
                  <span className="text-sm font-medium">{role.dayRate}</span>
                </div>

                <ul className="space-y-1 mb-4">
                  {role.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-hampstead-charcoal/60">
                      <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:trades@hampsteadrenovations.com?subject=Trade Registration: ${role.title}`}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                >
                  Register Interest
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-hampstead-grey">
            <h3 className="font-medium mb-4">Other Trades We Work With</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Electricians',
                'Plumbers',
                'Decorators',
                'Tilers',
                'Ironmongers',
                'Glaziers',
                'Carpet Fitters',
                'Landscapers',
                'Roofers',
                'Scaffolders'
              ].map(trade => (
                <span key={trade} className="px-3 py-1 bg-hampstead-cream text-sm">
                  {trade}
                </span>
              ))}
            </div>
            <p className="text-sm text-hampstead-charcoal/60 mt-4">
              Don&apos;t see your trade? Get in touch anyway—we&apos;re always looking for quality tradespeople.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="max-w-2xl mx-auto text-center">
            <Hammer className="w-12 h-12 text-hampstead-charcoal/20 mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4">Ready to Join Us?</h2>
            <p className="text-hampstead-charcoal/70 mb-8">
              Whether you&apos;re applying for a role or registering as a tradesperson, 
              we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@hampsteadrenovations.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
              >
                <Mail className="w-5 h-5" />
                careers@hampsteadrenovations.com
              </a>
              <a
                href="tel:02074319823"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-hampstead-grey hover:bg-hampstead-cream transition-colors"
              >
                <Phone className="w-5 h-5" />
                020 7431 9823
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
