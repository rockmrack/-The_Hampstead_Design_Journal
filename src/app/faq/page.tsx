'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronDown, 
  Search, 
  HelpCircle,
  Building2,
  Hammer,
  FileText,
  Banknote,
  Clock,
  Shield,
  Leaf,
  Home,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  related?: string[];
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const categories: FAQCategory[] = [
  { 
    id: 'planning', 
    name: 'Planning & Permissions', 
    icon: <FileText className="w-5 h-5" />,
    description: 'Conservation areas, listed buildings, and Camden planning'
  },
  { 
    id: 'costs', 
    name: 'Costs & Budgeting', 
    icon: <Banknote className="w-5 h-5" />,
    description: 'Project pricing, payment terms, and value engineering'
  },
  { 
    id: 'process', 
    name: 'Project Process', 
    icon: <Clock className="w-5 h-5" />,
    description: 'Timelines, stages, and what to expect'
  },
  { 
    id: 'heritage', 
    name: 'Heritage & Conservation', 
    icon: <Building2 className="w-5 h-5" />,
    description: 'Listed buildings, period features, and authenticity'
  },
  { 
    id: 'materials', 
    name: 'Materials & Techniques', 
    icon: <Hammer className="w-5 h-5" />,
    description: 'Lime plaster, sash windows, and traditional crafts'
  },
  { 
    id: 'sustainability', 
    name: 'Sustainability & Energy', 
    icon: <Leaf className="w-5 h-5" />,
    description: 'Eco-friendly heritage renovation approaches'
  },
  { 
    id: 'basement', 
    name: 'Basements & Extensions', 
    icon: <Home className="w-5 h-5" />,
    description: 'Excavation, party walls, and structural work'
  },
  { 
    id: 'guarantees', 
    name: 'Warranties & Insurance', 
    icon: <Shield className="w-5 h-5" />,
    description: 'Protection, guarantees, and your peace of mind'
  }
];

const faqs: FAQ[] = [
  // Planning & Permissions
  {
    id: 'p1',
    question: 'Do I need planning permission to renovate my period property in Hampstead?',
    answer: 'It depends on the scope of work and your property\'s status. Internal alterations typically don\'t require planning permission unless your property is listed. However, if you\'re in a conservation area (which covers most of NW3), external changes including windows, doors, and roof alterations may require permission. Properties subject to Article 4 Directions have even stricter controls—permitted development rights are removed, meaning even small external changes need approval. We always conduct a thorough planning assessment before proposing any works.',
    category: 'planning'
  },
  {
    id: 'p2',
    question: 'What is Listed Building Consent and when do I need it?',
    answer: 'Listed Building Consent (LBC) is required for any works to a listed building that affect its character as a building of special architectural or historic interest. This includes both internal and external works—even minor alterations like removing a door or changing a fireplace. Grade II* and Grade I listed buildings have the strictest requirements. The application process typically takes 8-12 weeks, and we have a 100% success rate with our LBC applications over the past five years. We work closely with conservation officers to ensure proposals respect the building\'s significance.',
    category: 'planning'
  },
  {
    id: 'p3',
    question: 'How long does planning permission take in Camden?',
    answer: 'Standard planning applications in Camden typically take 8 weeks for a decision, though conservation area applications can take 8-13 weeks. Listed Building Consent applications often take 8-12 weeks. Complex applications involving heritage assets may be extended to 16 weeks if an extension of time is agreed. Our planning consultant has strong relationships with Camden\'s planning team, which helps applications proceed smoothly. We also offer pre-application advice meetings with the council, which can identify potential issues early and speed up the formal application.',
    category: 'planning'
  },
  {
    id: 'p4',
    question: 'Can I add a contemporary extension to my period property?',
    answer: 'Yes, contemporary extensions can work beautifully with period properties when designed sensitively. Camden Council generally prefers extensions that are either faithful replications of original style or high-quality contemporary designs that contrast respectfully with the historic building. What they dislike is pastiche—poor imitations of period style. We\'ve successfully delivered glazed extensions, zinc-clad additions, and modern garden rooms in conservation areas. The key is demonstrating how the new work respects and enhances the original building\'s character.',
    category: 'planning'
  },
  {
    id: 'p5',
    question: 'What are Article 4 Directions and how do they affect my property?',
    answer: 'Article 4 Directions remove permitted development rights in specific areas, meaning work that would normally be allowed without permission requires formal planning approval. In Hampstead, several streets have Article 4 Directions protecting their architectural character. This includes restrictions on changing windows, doors, roofing materials, painting external surfaces, and even satellite dish placement. We can check whether your property is affected and advise on compliance. While it adds steps, Article 4 areas often command premium prices because their character is protected.',
    category: 'planning'
  },

  // Costs & Budgeting
  {
    id: 'c1',
    question: 'How much does a full renovation cost per square foot in Hampstead?',
    answer: 'Heritage renovation costs in NW3 typically range from £250-450 per square foot for mid-range work, rising to £450-700+ for high-specification projects involving listed buildings or complex restoration. Basic refurbishment might start around £150/sq ft. These figures include all trades, materials, and project management but exclude professional fees (typically 10-15%) and VAT where applicable. The wide range reflects the complexity of heritage work—original features requiring specialist restoration, bespoke joinery, and premium materials all affect costs. We provide detailed cost breakdowns during our feasibility assessment.',
    category: 'costs'
  },
  {
    id: 'c2',
    question: 'What is your payment structure for renovation projects?',
    answer: 'We typically structure payments as follows: 10% deposit on contract signing, followed by stage payments aligned with project milestones. Common stages include completion of demolition/strip-out, structural works, first fix (plumbing/electrical), plastering, second fix, and practical completion. Final retention (typically 2.5-5%) is held for 6-12 months against snagging. We provide detailed payment schedules with your contract, and all payments are linked to inspectable completion of specific works. This protects both parties and ensures cash flow matches project progress.',
    category: 'costs'
  },
  {
    id: 'c3',
    question: 'Should I budget for contingency and how much?',
    answer: 'Absolutely—we recommend 10-15% contingency for standard renovations, rising to 15-20% for listed buildings or properties with unknown construction. Heritage buildings often reveal surprises once work begins: concealed damp, structural issues, asbestos, or unforeseen repairs. A healthy contingency ensures these discoveries don\'t derail your project. Any unused contingency remains yours. We\'ve found that well-surveyed projects with realistic contingencies rarely exceed budget, while under-budgeted projects create stress for everyone.',
    category: 'costs'
  },
  {
    id: 'c4',
    question: 'Is VAT payable on renovation work?',
    answer: 'Standard rate VAT (20%) applies to most renovation work. However, there are exceptions: listed building alterations approved by the local authority may qualify for zero-rated VAT; conversions of non-residential buildings to dwellings may qualify for reduced rate (5%); and certain energy-saving materials installed in residential properties can be zero-rated. We work with specialist heritage accountants who can advise on your specific situation. The VAT savings on a listed building project can be substantial, so it\'s worth exploring early.',
    category: 'costs'
  },
  {
    id: 'c5',
    question: 'How do you handle cost overruns?',
    answer: 'Our contracts are based on detailed specifications, so overruns are rare when we\'ve surveyed properly. However, heritage buildings can surprise us. If additional works are needed, we pause, explain the issue clearly with photos/documentation, provide a written cost for the extra work, and don\'t proceed until you\'ve approved. We never present surprise bills at completion. Our reputation depends on transparent communication about costs throughout the project. Changes you request mid-project are handled the same way—quoted, approved, then executed.',
    category: 'costs'
  },

  // Project Process
  {
    id: 'pr1',
    question: 'What does your design process involve?',
    answer: 'Our design process has five stages: (1) Initial consultation and property assessment, (2) Feasibility study including measured survey and planning analysis, (3) Concept design with 3D visualisations, (4) Detailed design and specification, (5) Planning submission if required. For heritage properties, we also conduct historical research to inform design decisions. Each stage has clear deliverables and sign-off points. The process typically takes 8-16 weeks depending on complexity, ensuring we understand your home thoroughly before work begins.',
    category: 'process'
  },
  {
    id: 'pr2',
    question: 'How long does a typical renovation take?',
    answer: 'Timelines vary significantly by scope: bathroom refurbishment 3-4 weeks; kitchen installation 4-6 weeks; single-storey extension 16-20 weeks; full house renovation 6-12 months; basement excavation 12-18 months. Listed building projects typically add 20-30% to timelines due to approval processes and specialist requirements. We provide detailed programme schedules before starting, updated weekly during construction. Weather, material availability, and discovery of unexpected conditions can affect timing—we communicate any changes immediately.',
    category: 'process'
  },
  {
    id: 'pr3',
    question: 'Can we live in the property during renovation?',
    answer: 'For smaller projects (single room, bathroom, kitchen), living in is usually manageable with careful phasing. For whole-house renovations or any work involving structural alterations, asbestos removal, or floor removal, we typically recommend moving out for safety, dust control, and faster completion. Basement excavations definitely require you to vacate. We can advise on the best approach for your specific project and can recommend short-term let specialists who help Hampstead families during major renovations.',
    category: 'process'
  },
  {
    id: 'pr4',
    question: 'How do you communicate during the project?',
    answer: 'You\'ll have a dedicated project manager as your single point of contact. We provide: weekly progress reports with photos; monthly in-person site meetings; a project portal with all documents, approvals, and financial tracking; and 24/7 emergency contact for genuine issues. Our site managers send daily WhatsApp updates if you prefer. We find over-communication prevents problems—if you\'re ever unsure what\'s happening, we\'ve failed. Remote clients (those abroad or working away) receive video walk-throughs at key stages.',
    category: 'process'
  },
  {
    id: 'pr5',
    question: 'What happens at practical completion?',
    answer: 'Practical completion is when the works are substantially complete and the property is habitable/usable. We conduct a comprehensive inspection together, creating a snagging list of any minor defects or omissions. These are addressed within an agreed timeframe (typically 14-28 days). You receive: all certification (electrical, gas, building control sign-off); operating manuals for equipment; maintenance guidance for heritage features; and warranty documentation. Final payment less retention becomes due at practical completion.',
    category: 'process'
  },

  // Heritage & Conservation
  {
    id: 'h1',
    question: 'How do you approach listed building work?',
    answer: 'Listed building work requires a "conservation philosophy"—we assess the significance of every element before proposing changes. Our approach: (1) Understand what makes your building special through historical research, (2) Retain and repair original fabric wherever possible, (3) Where intervention is needed, use like-for-like materials and traditional techniques, (4) Make any necessary modern interventions reversible and distinguishable from historic fabric, (5) Document all works for future generations. We employ specialist conservation architects and craftspeople for listed projects.',
    category: 'heritage'
  },
  {
    id: 'h2',
    question: 'Can you match original period features exactly?',
    answer: 'In most cases, yes. We maintain a network of specialist craftspeople—lime plasterers, sash window makers, traditional joiners, decorative plaster moulders, and encaustic tile makers—who can replicate original features. We can commission bespoke mouldings from your existing profiles, match paint colours through spectral analysis, and source reclaimed materials from architectural salvage yards. For truly unique pieces, we photograph, measure, and workshop drawings before creating new. The goal is making repairs invisible while using historically appropriate methods.',
    category: 'heritage'
  },
  {
    id: 'h3',
    question: 'What is the difference between renovation and restoration?',
    answer: 'Renovation updates a property for modern living—it may involve changing layouts, installing contemporary kitchens, and upgrading services. Restoration returns a property to an earlier state, often removing inappropriate later additions and reinstating original features. Conservation maintains a building\'s significance while allowing necessary changes. Most heritage projects are a blend: we might restore original features in principal rooms while sensitively renovating service areas. We\'ll recommend the right approach based on your building\'s significance and your living requirements.',
    category: 'heritage'
  },
  {
    id: 'h4',
    question: 'Should I remove Victorian additions to my Georgian house?',
    answer: 'Not necessarily—Victorian additions can have their own significance and character. The heritage principle is that all periods of a building\'s history contribute to its story. We assess each addition individually: a sensitive Victorian service wing might be retained and restored, while a poor-quality 1970s extension could be removed. Camden conservation officers generally resist removing genuine historic fabric. We\'ll advise on what should stay, what could go, and what might be improved.',
    category: 'heritage'
  },
  {
    id: 'h5',
    question: 'Can I install modern amenities in a listed building?',
    answer: 'Yes—listed buildings can accommodate kitchens, bathrooms, central heating, and even smart home technology when installed thoughtfully. The key principles: avoid damaging historic fabric; make installations as reversible as possible; conceal modern services sensitively; choose designs that don\'t compete with original features. We\'ve installed underfloor heating through lime screeds, hidden home automation, and designed contemporary kitchens for Grade II* buildings. Good design makes modern living compatible with heritage architecture.',
    category: 'heritage'
  },

  // Materials & Techniques
  {
    id: 'm1',
    question: 'Why should I use lime plaster instead of gypsum in my old house?',
    answer: 'Lime plaster is breathable—it allows moisture to move through walls, which is essential in old buildings with solid walls. Modern gypsum plaster is harder and non-breathable, trapping moisture and leading to damp problems, salt crystallisation, and deterioration of historic fabric. Lime also has natural antifungal properties and can accommodate the slight movements that occur in old buildings. Application requires specialist skills (slower curing, multiple coats), but the result is more sympathetic to your building\'s construction and healthier long-term.',
    category: 'materials'
  },
  {
    id: 'm2',
    question: 'Should I replace my original sash windows with double glazing?',
    answer: 'We generally advise against replacing original sash windows. Well-maintained single-glazed sashes with secondary glazing can achieve similar thermal performance to double glazing while preserving authenticity and character. Replacement windows rarely match original profiles, glass quality, or proportions—they\'re usually obvious and reduce value. For listed buildings, replacement is usually prohibited. We can overhaul original sashes, install discreet secondary glazing, and add draught-proofing to dramatically improve thermal performance while keeping your originals.',
    category: 'materials'
  },
  {
    id: 'm3',
    question: 'What wood species should I use for joinery in my period home?',
    answer: 'Georgian properties typically used Baltic pine (slow-grown, tight-grained) for joinery and oak for structural elements. Victorian properties used similar species but also introduced pitch pine and mahogany. For matching repairs, we source reclaimed timber or new timber from sustainable sources with similar characteristics. For new joinery that will be painted, we use Accoya (acetylated wood with exceptional stability and durability) or sustainable hardwoods. Species choice affects appearance, durability, and cost—we\'ll recommend based on your specific application.',
    category: 'materials'
  },
  {
    id: 'm4',
    question: 'Can modern insulation be used in period properties?',
    answer: 'Yes, but material choice is critical. Conventional insulations (fibreglass, foam boards) can cause moisture problems in solid-walled buildings. We use breathable insulations: wood fibre boards, sheep\'s wool, hemp-lime, or aerogel for thin applications. These allow moisture to move while improving thermal performance. Internal wall insulation requires careful design to avoid cold bridging and condensation. External insulation is rarely appropriate for period properties due to visual impact. We balance thermal improvement with heritage conservation.',
    category: 'materials'
  },
  {
    id: 'm5',
    question: 'What finish should I use on original floorboards?',
    answer: 'It depends on the boards and your lifestyle. Traditional options: beeswax polish (authentic, needs regular maintenance), linseed oil (penetrating, natural, needs topping up), shellac (historic, less durable). Modern options: hard wax oils (durable, repairable, natural look), water-based lacquers (very durable, some sheen). We never recommend heavy polyurethane varnishes which plastify the surface and are difficult to repair. For high-traffic areas, hard wax oils offer the best balance of durability and repairability. We can show samples on test areas.',
    category: 'materials'
  },

  // Sustainability & Energy
  {
    id: 's1',
    question: 'How can I make my period property more energy efficient?',
    answer: 'The conservation approach to energy efficiency prioritises: (1) Reducing heat loss through draught-proofing, secondary glazing, and loft insulation (usually non-controversial), (2) Careful internal wall insulation where appropriate using breathable materials, (3) High-efficiency boilers or heat pumps where feasible, (4) LED lighting and efficient appliances, (5) Smart heating controls to avoid heating empty rooms. We avoid measures that damage historic fabric or trap moisture. A whole-house approach typically achieves 30-50% energy reduction while respecting heritage.',
    category: 'sustainability'
  },
  {
    id: 's2',
    question: 'Can I install a heat pump in my listed building?',
    answer: 'Air source heat pumps can often be installed in listed buildings when positioned discreetly—typically in rear gardens or concealed plant areas. Ground source heat pumps are more readily accepted as they\'re invisible once installed, though garden archaeology may need assessment. The main challenges: radiator sizing (heat pumps work best with larger radiators or underfloor heating), listed building consent for any visible equipment, and noise considerations for air source units. We\'ve successfully installed both types in conservation area properties.',
    category: 'sustainability'
  },
  {
    id: 's3',
    question: 'Are solar panels allowed on heritage properties?',
    answer: 'Solar panels on principal elevations or visible roof slopes are rarely approved for listed buildings or in conservation areas. However, panels on rear roof slopes, flat roofs, or outbuildings may be acceptable. Solar tiles (which look like traditional slates) are emerging but not yet cost-effective. Battery storage and smart systems maximise benefit from any panels you can install. Camden is generally supportive of sustainable measures that don\'t harm heritage character—we can advise on what might be achievable for your specific property.',
    category: 'sustainability'
  },
  {
    id: 's4',
    question: 'What is the EPC rating requirement for selling a period home?',
    answer: 'Currently, an EPC rating of E or above is required for rental properties. Owner-occupied homes have no minimum requirement for sale, though EPC ratings influence buyer decisions. Period properties often score poorly because EPCs don\'t credit original features\' embodied carbon or traditional construction\'s benefits. The government has consulted on raising requirements to C by 2028 for rentals, with exemptions for heritage properties. We can advise on pragmatic improvements that boost ratings without compromising your building\'s character.',
    category: 'sustainability'
  },

  // Basements & Extensions
  {
    id: 'b1',
    question: 'Is basement excavation possible under my Victorian house?',
    answer: 'Most Victorian and Georgian houses can accommodate basement excavation, though feasibility depends on: existing foundations (depth and condition), soil conditions, water table levels, neighbouring properties, and tree root proximity. We conduct full structural and geotechnical surveys before advising. Camden has specific basement development policies limiting extent and requiring basement impact assessments. Single-storey basements under main building footprints are most likely to succeed. We\'ve completed over 30 basement projects in NW3.',
    category: 'basement'
  },
  {
    id: 'b2',
    question: 'How do party wall agreements work?',
    answer: 'The Party Wall Act 1996 requires you to notify neighbours before certain works: excavating within 3m of their foundations (if going deeper than their footings), building on the boundary, or cutting into a party wall. Neighbours can consent or dissent—if they dissent, both parties appoint surveyors who agree a Party Wall Award setting out how work will proceed and protecting neighbours\' property. The process typically takes 4-8 weeks and costs £800-2,000 per neighbour. We manage this process and our surveyor has excellent relationships with regular neighbouring property surveyors.',
    category: 'basement'
  },
  {
    id: 'b3',
    question: 'How long does a basement excavation take?',
    answer: 'A typical single-level basement under a terraced house takes 12-18 months from start to completion, plus 3-6 months pre-construction for planning, party walls, and tendering. The stages: underpinning existing foundations (8-12 weeks), bulk excavation (4-6 weeks), basement slab and walls (4-6 weeks), waterproofing (2-3 weeks), fit-out (8-16 weeks depending on specification). Construction phasing around neighbours\' lives adds time. We provide detailed programmes and stick to them—delays in basement projects are expensive for everyone.',
    category: 'basement'
  },
  {
    id: 'b4',
    question: 'What can I include in my basement conversion?',
    answer: 'Common basement uses include: home cinema (excellent acoustic isolation), gym/spa, swimming pool (requires significant structural design), wine cellar, home office, additional bedrooms with light wells, playroom, and plant/storage rooms. Light wells or rear garden access can provide natural light and ventilation. Building Regulations require habitable rooms to have minimum ceiling heights (2.4m recommended), emergency egress, and adequate ventilation. We\'ll design spaces that maximise the basement\'s potential while meeting all regulations.',
    category: 'basement'
  },
  {
    id: 'b5',
    question: 'How much does a basement excavation cost per square foot?',
    answer: 'Basement construction costs typically range from £350-500 per square foot for the shell (structural work, waterproofing, basic finish) and £500-800+ per square foot fully fitted to high specification. Swimming pools add £150k-300k depending on size and features. The variation reflects site-specific factors: ease of access, number of party walls, existing cellar condition, and specification level. A 1,500 sq ft basement might cost £600k-1.2m depending on these factors. We provide detailed cost plans after structural surveys.',
    category: 'basement'
  },

  // Warranties & Insurance
  {
    id: 'w1',
    question: 'What warranties do you provide on your work?',
    answer: 'We provide tiered warranties: 12 months defects liability on all works (covering defects in materials and workmanship); 10 years structural warranty on major works (basement excavations, extensions, structural alterations) through an insurance-backed scheme; manufacturer warranties on products (windows typically 10 years, kitchens 5-10 years, appliances per manufacturer). These warranties are transferable to future owners. We also leave detailed maintenance schedules so you can keep finishes and systems in optimal condition.',
    category: 'guarantees'
  },
  {
    id: 'w2',
    question: 'Do I need to inform my insurer about renovation works?',
    answer: 'Yes—you must inform your buildings insurer before major works begin. Most insurers require notification of any works affecting structure, electrics, or plumbing. During construction, we maintain contractor\'s all-risks insurance covering the works themselves and public liability for third-party claims. You should check your policy: some exclude certain work types, some require approved contractors, some won\'t cover unoccupied properties. After completion, update your insurer with increased rebuild cost values.',
    category: 'guarantees'
  },
  {
    id: 'w3',
    question: 'What accreditations and memberships do you hold?',
    answer: 'We are: Federation of Master Builders members (vetted, inspected, with FMB warranty scheme access); TrustMark registered (Government-endorsed quality scheme); registered with the RIBA Conservation Register for heritage work; members of the Guild of Master Craftsmen; Checkatrade and TrustATrader vetted. Our team includes RICS-qualified surveyors, RIBA architects, and NVQ-certified tradespeople. All subcontractors are vetted for competence, insurance, and references. We can provide evidence of all accreditations on request.',
    category: 'guarantees'
  },
  {
    id: 'w4',
    question: 'What insurance do you carry?',
    answer: 'We maintain: £10m public liability insurance (covering injury to third parties or damage to property); £10m employer\'s liability (covering our employees); contractor\'s all-risks insurance (covering the works during construction); professional indemnity insurance for design work. All policies are with A-rated insurers and certificates are provided at contract stage. Our insurance covers work on listed buildings and includes specific heritage provisions. We recommend you verify these details with your solicitor if undertaking major works.',
    category: 'guarantees'
  },
  {
    id: 'w5',
    question: 'How do you handle disputes or complaints?',
    answer: 'We hope never to have formal disputes, but our process ensures resolution: (1) Direct discussion with your project manager to understand concerns, (2) Meeting with our director if unresolved, (3) Independent inspection if disagreement persists, (4) FMB mediation service for registered disputes. Our contracts include dispute resolution clauses. In 15 years, we\'ve never had a complaint reach formal mediation—early, open communication prevents escalation. If you\'re ever unhappy during a project, please tell us immediately so we can address it.',
    category: 'guarantees'
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // FAQ Schema for rich results - uses static faqs array to avoid XSS concerns
  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }), []);

  // Safely serialize schema to prevent XSS
  const schemaString = useMemo(() => JSON.stringify(faqSchema), [faqSchema]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaString }}
      />

      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-hampstead-black via-hampstead-black/95 to-hampstead-charcoal/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'FAQ' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Expert answers to common questions about heritage renovation, 
              planning, costs, and the project process
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/40" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-hampstead-black placeholder-hampstead-charcoal/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10 sticky top-20 md:top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-hampstead-black text-white'
                  : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              All ({faqs.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-hampstead-black text-white'
                    : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory !== 'all' && (
            <div className="mb-8 p-6 bg-hampstead-cream rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                {categories.find(c => c.id === selectedCategory)?.icon}
                <h2 className="font-playfair text-xl font-bold">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
              </div>
              <p className="text-hampstead-charcoal/70">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
          )}

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-hampstead-charcoal/30 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold mb-2">No matching questions</h3>
              <p className="text-hampstead-charcoal/60">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border border-hampstead-charcoal/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 hover:bg-hampstead-cream/50 transition-colors"
                  >
                    <span className="font-medium text-hampstead-black pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-hampstead-charcoal/60 flex-shrink-0 transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                          <div className="pt-4 border-t border-hampstead-charcoal/10">
                            <p className="text-hampstead-charcoal/80 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium bg-hampstead-cream`}>
                                {categories.find(c => c.id === faq.category)?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 md:py-24 bg-hampstead-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-8 max-w-2xl mx-auto">
            Our team is happy to discuss your specific situation. 
            Book a free consultation to get expert advice tailored to your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-hampstead-black text-white px-8 py-4 rounded-lg font-medium hover:bg-hampstead-charcoal transition-colors"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:02074319823"
              className="inline-flex items-center justify-center gap-2 bg-white text-hampstead-black px-8 py-4 rounded-lg font-medium hover:bg-hampstead-charcoal/5 transition-colors border border-hampstead-charcoal/20"
            >
              Call 020 7431 9823
            </a>
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center">
            Browse by Topic
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl mx-auto text-center">
            Explore our comprehensive knowledge base organised by category
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="p-6 bg-hampstead-cream rounded-xl text-left hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:bg-hampstead-black group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-playfair text-lg font-bold mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-hampstead-charcoal/70 mb-3">
                  {cat.description}
                </p>
                <span className="text-sm font-medium text-hampstead-black flex items-center gap-1">
                  {faqs.filter(f => f.category === cat.id).length} questions
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
