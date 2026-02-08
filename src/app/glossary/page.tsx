'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Book, 
  ArrowRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  seeAlso?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  // A
  { term: 'Acanthus', definition: 'A Mediterranean plant whose stylised leaves feature prominently in Classical and Corinthian decorative motifs, commonly found on column capitals, corbels, and plasterwork in Georgian buildings.', category: 'Ornament' },
  { term: 'Architrave', definition: 'The moulded frame surrounding a door or window opening. In Georgian and Victorian properties, architraves feature characteristic profiles that help date the building.', category: 'Joinery', relatedTerms: ['Skirting', 'Dado rail'] },
  { term: 'Article 4 Direction', definition: 'A planning designation that removes permitted development rights in a specific area, meaning that changes normally allowed without planning permission (like window replacement) require formal approval.', category: 'Planning' },
  { term: 'Arts and Crafts', definition: 'An architectural and design movement (1880-1920) emphasising traditional craftsmanship, natural materials, and honest construction. Hampstead has significant Arts and Crafts housing, particularly around Flask Walk and Hampstead Garden Suburb.', category: 'Architectural Style' },
  { term: 'Ashlar', definition: 'Finely dressed stone blocks laid in regular courses with very thin joints, used for prestigious façades. Distinguished from rubble or random stonework.', category: 'Materials' },
  
  // B
  { term: 'Baluster', definition: 'A vertical member (often turned wood or cast iron) supporting a handrail in a staircase balustrade. Baluster profiles are period-specific and help date properties.', category: 'Joinery' },
  { term: 'Bargeboard', definition: 'The often decorative board fixed to the edge of a gable roof, covering the ends of the roof timbers. Victorian bargeboards are frequently ornately carved.', category: 'Roofing' },
  { term: 'Bay window', definition: 'A window that projects outward from the main wall of a building, forming a bay. Common in Victorian properties, types include canted (angled), curved (bow), and square (oriel).', category: 'Windows' },
  { term: 'Bonding', definition: 'The pattern in which bricks are laid. Common bonds include English bond (alternating courses of headers and stretchers), Flemish bond (headers and stretchers in each course), and stretcher bond.', category: 'Brickwork' },
  { term: 'Breathability', definition: 'The ability of a building material to allow water vapour to pass through, essential in traditional solid-walled construction to prevent moisture trapping and associated decay.', category: 'Building Science' },
  { term: 'Building Regulations', definition: 'The technical standards that building work must meet for safety, accessibility, and energy efficiency. Separate from planning permission and Listed Building Consent.', category: 'Planning' },
  
  // C
  { term: 'Capital', definition: 'The decorative top of a column or pilaster, ranging from simple Doric to elaborate Corinthian designs. Period capitals indicate architectural style and date.', category: 'Ornament' },
  { term: 'Casement window', definition: 'A window hinged at the side to open outward (or inward). Common in Arts and Crafts and Edwardian properties, distinct from sliding sash windows.', category: 'Windows' },
  { term: 'Cavity wall', definition: 'A wall constructed with two leaves (usually brick or block) separated by an air gap. Generally post-1920s; earlier buildings have solid walls.', category: 'Construction' },
  { term: 'Conservation Area', definition: 'An area designated by the local authority as having special architectural or historic interest, where development is controlled to preserve character. Most of NW3 falls within conservation areas.', category: 'Planning' },
  { term: 'Conservation officer', definition: 'A local authority specialist who assesses planning applications affecting heritage assets and advises on appropriate interventions.', category: 'Planning' },
  { term: 'Corbel', definition: 'A projecting stone or brick bracket supporting a beam, cornice, or other feature. Often decoratively carved in Victorian buildings.', category: 'Construction' },
  { term: 'Cornice', definition: 'The projecting horizontal moulding at the top of a wall, building, or room. External cornices are often substantial; internal cornices mark the wall-ceiling junction.', category: 'Ornament' },
  { term: 'Coving', definition: 'A concave moulding forming the transition between wall and ceiling. Simpler than a cornice, common in more modest rooms.', category: 'Ornament' },
  { term: 'Crown moulding', definition: 'American term for cornice or coving—the decorative moulding at the junction of wall and ceiling.', category: 'Ornament' },
  
  // D
  { term: 'Dado', definition: 'The lower part of a wall, typically from floor to about waist height, often finished differently from the upper wall (with panelling, paint, or different wallpaper).', category: 'Interiors' },
  { term: 'Dado rail', definition: 'The horizontal moulding marking the top of the dado, traditionally protecting walls from chair backs. Key period feature often removed in 20th century "modernisation".', category: 'Joinery' },
  { term: 'Dentil', definition: 'A small rectangular block forming one of a series, creating a tooth-like pattern in classical cornices. Common in Georgian architecture.', category: 'Ornament' },
  { term: 'Dormer', definition: 'A window set vertically in a sloping roof, with its own roof structure. Types include gabled, hipped, and eyebrow dormers.', category: 'Roofing' },
  { term: 'Double glazing', definition: 'Windows with two panes of glass separated by an insulating gap. In heritage contexts, slim-profile units or secondary glazing are preferred to preserve character.', category: 'Windows' },
  { term: 'Dressing', definition: 'Stone, brick, or render used to accentuate architectural features like window surrounds, quoins, or string courses.', category: 'Materials' },
  
  // E
  { term: 'Eaves', definition: 'The lower edge of a roof where it overhangs the wall. Eaves details vary by period and style.', category: 'Roofing' },
  { term: 'Edwardian', definition: 'Architectural style from the reign of Edward VII (1901-1910), often extending to 1914. Characterised by lighter, more restrained decoration than Victorian, with Arts and Crafts influences.', category: 'Architectural Style' },
  { term: 'Egg and dart', definition: 'A classical decorative moulding pattern alternating egg-shaped and arrow-like motifs, common on Georgian and Regency cornices and architraves.', category: 'Ornament' },
  { term: 'Encaustic tile', definition: 'A decorative floor tile where the pattern is created by different coloured clays inlaid into the tile body, not a surface glaze. Popular in Victorian hallways.', category: 'Materials' },
  { term: 'English bond', definition: 'A brick bonding pattern with alternating courses of headers (short ends) and stretchers (long sides), creating a strong structural bond.', category: 'Brickwork' },
  
  // F
  { term: 'Fanlight', definition: 'A semicircular or fan-shaped window over a door, typically with decorative glazing bars radiating like fan ribs. Characteristic of Georgian and Regency entrances.', category: 'Windows' },
  { term: 'Fascia', definition: 'The horizontal board fixed to the rafter feet at the eaves, to which guttering is typically attached.', category: 'Roofing' },
  { term: 'Finial', definition: 'A decorative ornament crowning a roof ridge, gable, or pinnacle. Victorian finials are often elaborate terracotta or cast iron.', category: 'Ornament' },
  { term: 'Flashing', definition: 'Weatherproof material (traditionally lead, now often lead or zinc) used at junctions between roof coverings and walls, chimneys, or other features.', category: 'Roofing' },
  { term: 'Flemish bond', definition: 'A brick bonding pattern with headers and stretchers alternating in each course, creating a decorative diagonal pattern.', category: 'Brickwork' },
  { term: 'Fluting', definition: 'Vertical grooves carved into columns or pilasters, a characteristic of classical architecture.', category: 'Ornament' },
  
  // G
  { term: 'Gable', definition: 'The triangular portion of wall between the edges of intersecting roof pitches. Dutch gables have curved tops; crow-stepped gables have stepped edges.', category: 'Roofing' },
  { term: 'Gauged brickwork', definition: 'Bricks cut and rubbed to precise shapes for decorative work, particularly flat arches over windows. Indicates high-quality Georgian craftsmanship.', category: 'Brickwork' },
  { term: 'Georgian', definition: 'Architectural style from the reigns of George I-IV (1714-1830), characterised by classical proportions, symmetry, and restrained decoration.', category: 'Architectural Style' },
  { term: 'Glazing bar', definition: 'The wooden or metal bars dividing a window into individual panes. Georgian glazing bars are typically thin and elegant; Victorian ones more robust.', category: 'Windows' },
  { term: 'Gothic Revival', definition: 'The 19th-century revival of medieval Gothic architecture, featuring pointed arches, tracery, and elaborate ornament. Common in Victorian churches and some houses.', category: 'Architectural Style' },
  { term: 'Grade I Listed', definition: 'The highest level of listing, for buildings of exceptional interest. Only about 2% of listed buildings are Grade I.', category: 'Planning' },
  { term: 'Grade II Listed', definition: 'Buildings of special interest warranting every effort to preserve them. The majority of listed buildings are Grade II.', category: 'Planning' },
  { term: 'Grade II* Listed', definition: 'Buildings of more than special interest—the middle tier between Grade I and II. About 5.5% of listed buildings have this status.', category: 'Planning' },
  
  // H
  { term: 'Header', definition: 'A brick laid with its short end visible, as opposed to a stretcher. Important for understanding bonding patterns.', category: 'Brickwork' },
  { term: 'Heritage Statement', definition: 'A document assessing a building\'s significance and justifying proposed works, required for Listed Building Consent applications.', category: 'Planning' },
  { term: 'Hipped roof', definition: 'A roof with slopes on all four sides, meeting at a ridge. Common on Georgian and some Victorian buildings.', category: 'Roofing' },
  { term: 'Historic England', definition: 'The government body responsible for listing buildings, scheduled monuments, and registered parks and gardens. Formerly English Heritage.', category: 'Planning' },
  { term: 'Hydraulic lime', definition: 'A lime that sets by chemical reaction with water (unlike air lime which sets by carbonation). Used in damp conditions and stronger applications.', category: 'Materials' },
  
  // I-J
  { term: 'Inglenook', definition: 'A recessed space beside a large fireplace, often with built-in seating. A feature of Arts and Crafts interiors.', category: 'Interiors' },
  { term: 'Ironmongery', definition: 'Metal fittings for doors and windows including handles, hinges, locks, and bolts. Period-appropriate ironmongery is important in heritage restoration.', category: 'Joinery' },
  { term: 'Jamb', definition: 'The vertical side of a doorway or window opening.', category: 'Construction' },
  { term: 'Joinery', definition: 'Wooden components such as windows, doors, staircases, and mouldings, and the craft of making them.', category: 'Joinery' },
  
  // K-L
  { term: 'Keystone', definition: 'The central wedge-shaped stone at the crown of an arch, often decoratively carved.', category: 'Construction' },
  { term: 'Lath', definition: 'Thin strips of wood nailed to studs or joists as a base for lime plaster. Traditional lath and plaster was standard until the mid-20th century.', category: 'Materials' },
  { term: 'Lime mortar', definition: 'Mortar made from lime, sand, and water (not cement). Essential for historic buildings as it allows moisture movement and can accommodate slight structural movements.', category: 'Materials' },
  { term: 'Lime plaster', definition: 'Plaster made from lime putty or hydraulic lime, allowing walls to "breathe". Distinct from modern gypsum plasters which trap moisture.', category: 'Materials' },
  { term: 'Lime wash', definition: 'A traditional paint made from slaked lime, used on lime plaster and render. Breathable and naturally antimicrobial.', category: 'Materials' },
  { term: 'Lintel', definition: 'A horizontal structural member spanning an opening such as a door or window, supporting the wall above.', category: 'Construction' },
  { term: 'Listed Building', definition: 'A building included on the Statutory List of Buildings of Special Architectural or Historic Interest, protected by law from unauthorised alteration or demolition.', category: 'Planning' },
  { term: 'Listed Building Consent', definition: 'Permission required for any works affecting a listed building\'s character, including both internal and external alterations.', category: 'Planning' },
  { term: 'Locally Listed', definition: 'Buildings identified by the local authority as having local heritage value but not meeting national listing criteria. Subject to some additional planning scrutiny.', category: 'Planning' },
  
  // M
  { term: 'Mansard roof', definition: 'A roof with two slopes on each side, the lower slope steeper than the upper, allowing more usable space in the roof. Named after French architect François Mansart.', category: 'Roofing' },
  { term: 'Meeting rail', definition: 'The horizontal rails of a sash window where the upper and lower sashes meet when closed.', category: 'Windows' },
  { term: 'Minton tile', definition: 'Decorative ceramic tiles made by Minton & Co., particularly encaustic floor tiles popular in Victorian hallways and churches.', category: 'Materials' },
  { term: 'Modillion', definition: 'A projecting bracket under the corona of a classical cornice, often scroll-shaped.', category: 'Ornament' },
  { term: 'Mortice', definition: 'A cavity cut into timber to receive a matching projection (tenon) from another piece, forming a mortice and tenon joint.', category: 'Joinery' },
  { term: 'Moulding', definition: 'A continuous decorative profile in wood, plaster, or stone, used for cornices, architraves, skirtings, and other features.', category: 'Ornament' },
  { term: 'Mullion', definition: 'A vertical structural member dividing a window into lights or panes.', category: 'Windows' },
  
  // N-O
  { term: 'Newel', definition: 'The main vertical post at the end of a staircase handrail, often decoratively turned or carved.', category: 'Joinery' },
  { term: 'Ogee', definition: 'A moulding profile with an S-shaped curve, combining convex and concave curves. Common in Gothic and classical ornament.', category: 'Ornament' },
  { term: 'Oriel window', definition: 'A projecting window supported by brackets or corbels rather than extending to the ground. Common on upper floors.', category: 'Windows' },
  { term: 'Ovolo', definition: 'A convex moulding profile, roughly quarter-round in section. Common on window glazing bars.', category: 'Ornament' },
  
  // P
  { term: 'Pantile', definition: 'An S-shaped roofing tile that interlocks with adjacent tiles. Common in parts of Eastern England and Scotland.', category: 'Roofing' },
  { term: 'Parapet', definition: 'A low wall along the edge of a roof, balcony, or terrace. Georgian buildings often hide pitched roofs behind parapets.', category: 'Roofing' },
  { term: 'Parquet', definition: 'Wood flooring laid in geometric patterns using small blocks of hardwood. Popular in Victorian and Edwardian interiors.', category: 'Materials' },
  { term: 'Party wall', definition: 'A shared wall between two adjoining properties. Works affecting party walls require notification under the Party Wall Act 1996.', category: 'Planning' },
  { term: 'Pediment', definition: 'A triangular gable above a portico, door, or window, derived from Greek temple architecture.', category: 'Ornament' },
  { term: 'Permitted Development', definition: 'Work that can be carried out without planning permission, subject to certain conditions. Can be removed by Article 4 Directions.', category: 'Planning' },
  { term: 'Pilaster', definition: 'A flat column attached to a wall face, purely decorative rather than structural.', category: 'Ornament' },
  { term: 'Pitched roof', definition: 'A roof with sloping surfaces meeting at a ridge, as opposed to a flat roof.', category: 'Roofing' },
  { term: 'Plasterwork', definition: 'Ornamental plaster features including cornices, ceiling roses, and decorative panels.', category: 'Ornament' },
  { term: 'Pointing', definition: 'The mortar visible between bricks or stones. Historic pointing profiles (flush, weather-struck, ribbon) differ from modern cement pointing.', category: 'Brickwork' },
  { term: 'Portico', definition: 'A covered entrance supported by columns, often with a pediment above. A key feature of Georgian classical architecture.', category: 'Construction' },
  { term: 'Putlog hole', definition: 'A hole in masonry left by scaffolding during original construction, often filled but sometimes left visible.', category: 'Brickwork' },
  
  // Q-R
  { term: 'Queen Anne Revival', definition: 'A late Victorian architectural style (1870s-1900s) combining Dutch gables, terracotta, and red brick. Not to be confused with actual Queen Anne period architecture.', category: 'Architectural Style' },
  { term: 'Quoin', definition: 'Dressed stones at the external corners of a building, often contrasting with the main wall material.', category: 'Brickwork' },
  { term: 'Rafter', definition: 'A sloping structural member forming the main framework of a roof.', category: 'Roofing' },
  { term: 'Rail', definition: 'A horizontal member in a door, window, or panelling framework.', category: 'Joinery' },
  { term: 'Regency', definition: 'Architectural style from the period when George IV was Prince Regent (1811-1820), characterised by elegance and Greek Revival influences.', category: 'Architectural Style' },
  { term: 'Render', definition: 'External wall coating of lime, cement, or modern materials, providing weather protection and often concealing brick or stone.', category: 'Materials' },
  { term: 'Ridge', definition: 'The horizontal line at the apex of a pitched roof where two slopes meet.', category: 'Roofing' },
  { term: 'Rising damp', definition: 'Ground moisture rising through masonry by capillary action. Often misdiagnosed; true rising damp is relatively rare in properly maintained buildings.', category: 'Building Science' },
  { term: 'Rubble', definition: 'Uncoursed stonework using irregularly shaped stones. Contrasts with ashlar.', category: 'Materials' },
  { term: 'Rustication', definition: 'Masonry cut to emphasise joints, creating a textured surface. Common on Georgian ground floors to suggest solidity.', category: 'Materials' },
  
  // S
  { term: 'Sash window', definition: 'A window with one or more movable panels (sashes) that slide vertically. The defining window type for Georgian and Victorian buildings.', category: 'Windows' },
  { term: 'Secondary glazing', definition: 'An additional glazed frame fitted inside an existing window to improve thermal and acoustic performance while preserving original windows.', category: 'Windows' },
  { term: 'Skirting', definition: 'The moulded board at the base of a wall, protecting it from feet and furniture and covering the wall-floor junction.', category: 'Joinery' },
  { term: 'Soffit', definition: 'The underside of an architectural element such as eaves, beams, or arches.', category: 'Construction' },
  { term: 'Solid wall', definition: 'A wall without a cavity, typically of brick or stone. Standard construction before the 1920s; requires different insulation approaches.', category: 'Construction' },
  { term: 'Stile', definition: 'A vertical member in a door, window, or panelling framework.', category: 'Joinery' },
  { term: 'Stock brick', definition: 'The traditional London brick, typically yellow-brown ("London stock"), made from local clay. The predominant brick in Georgian and Victorian London.', category: 'Brickwork' },
  { term: 'Stretcher', definition: 'A brick laid lengthwise, with its long face visible.', category: 'Brickwork' },
  { term: 'String course', definition: 'A horizontal projecting band of masonry running across a façade, often marking floor levels.', category: 'Construction' },
  { term: 'Stucco', definition: 'A fine lime or cement-based render, often scored to imitate ashlar stonework. Characteristic of Regency and early Victorian terraces.', category: 'Materials' },
  
  // T
  { term: 'Terracotta', definition: 'Fired clay used for decorative mouldings, tiles, and architectural ornament. Popular in Victorian architecture for its versatility.', category: 'Materials' },
  { term: 'Tie beam', definition: 'A horizontal beam connecting the feet of rafters, preventing them from spreading.', category: 'Roofing' },
  { term: 'Tongue and groove', definition: 'Timber boards with a projecting tongue on one edge and a matching groove on the other, interlocking to form a continuous surface.', category: 'Joinery' },
  { term: 'Transom', definition: 'A horizontal bar dividing a window into sections, or a fixed window above a door.', category: 'Windows' },
  { term: 'Tuckpointing', definition: 'A decorative pointing technique creating the illusion of fine joints by filling with mortar matching the brick colour, then inserting a thin ribbon of contrasting colour.', category: 'Brickwork' },
  
  // U-V
  { term: 'Underpinning', definition: 'Strengthening or deepening existing foundations, essential for basement excavations and correcting subsidence.', category: 'Construction' },
  { term: 'Valley', definition: 'The internal angle formed where two roof slopes meet. Lined with lead or other flashing materials.', category: 'Roofing' },
  { term: 'Vapour barrier', definition: 'A layer preventing water vapour movement through a construction. Generally inappropriate for traditional buildings which rely on breathability.', category: 'Building Science' },
  { term: 'Venetian window', definition: 'A window with three openings, the central one arched and wider than the flanking ones. Also called a Palladian or Serlian window.', category: 'Windows' },
  { term: 'Veranda', definition: 'A roofed, open gallery or porch attached to the outside of a building.', category: 'Construction' },
  { term: 'Victorian', definition: 'Architectural styles from the reign of Queen Victoria (1837-1901), ranging from Italianate and Gothic Revival to Arts and Crafts.', category: 'Architectural Style' },
  { term: 'Vitrified', definition: 'Clay or ceramic material fired at high temperature until glassy and impervious. Describes certain bricks and tiles.', category: 'Materials' },
  { term: 'Voussoir', definition: 'A wedge-shaped stone or brick forming part of an arch.', category: 'Construction' },
  
  // W-Z
  { term: 'Wainscot', definition: 'Wood panelling on the lower part of interior walls. Similar to dado panelling.', category: 'Interiors' },
  { term: 'Weatherboarding', definition: 'Horizontal overlapping boards forming external wall cladding. Common in rural areas and increasingly on extensions.', category: 'Materials' },
  { term: 'Zinc', definition: 'A metal used for roofing, cladding, and architectural details. Develops a characteristic grey patina over time.', category: 'Materials' }
];

const categories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort();

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      const matchesLetter = selectedLetter === 'all' || term.term[0].toUpperCase() === selectedLetter;
      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  // Glossary schema for SEO
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Heritage Architecture Glossary",
    "description": "A comprehensive glossary of heritage architecture, conservation, and renovation terms for North West London period properties.",
    "url": "https://hampsteaddesignjournal.com/glossary",
    "hasDefinedTerm": glossaryTerms.slice(0, 50).map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-hampstead-black text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-hampstead-black via-hampstead-black/95 to-hampstead-charcoal/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[{ label: 'Glossary' }]} 
            className="mb-8 opacity-60"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-8 h-8 text-white/60" />
              <span className="text-white/60 text-sm uppercase tracking-wider">Reference</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Heritage Architecture Glossary
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              {glossaryTerms.length}+ essential terms covering Georgian, Victorian, and Edwardian 
              architecture, conservation principles, and traditional building techniques
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hampstead-charcoal/40" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-hampstead-black placeholder-hampstead-charcoal/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="bg-hampstead-cream border-b border-hampstead-charcoal/10 sticky top-20 md:top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-4 px-4">
            <button
              onClick={() => setSelectedLetter('all')}
              className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-all ${
                selectedLetter === 'all'
                  ? 'bg-hampstead-black text-white'
                  : 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => {
              const hasTerms = glossaryTerms.some(t => t.term[0].toUpperCase() === letter);
              return (
                <button
                  key={letter}
                  onClick={() => hasTerms && setSelectedLetter(letter)}
                  disabled={!hasTerms}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-all ${
                    selectedLetter === letter
                      ? 'bg-hampstead-black text-white'
                      : hasTerms
                        ? 'bg-white text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                        : 'bg-white/50 text-hampstead-charcoal/30 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-hampstead-charcoal/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <span className="text-sm text-hampstead-charcoal/60 flex-shrink-0">Filter by category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-hampstead-black text-white'
                  : 'bg-hampstead-cream text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-hampstead-black text-white'
                    : 'bg-hampstead-cream text-hampstead-charcoal hover:bg-hampstead-charcoal/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Content */}
      <section className="py-12 md:py-20 bg-hampstead-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-12 h-12 text-hampstead-charcoal/30 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold mb-2">No matching terms</h3>
              <p className="text-hampstead-charcoal/60">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedTerms)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, terms]) => (
                  <div key={letter} id={`letter-${letter}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-12 h-12 bg-hampstead-black text-white rounded-lg flex items-center justify-center font-playfair text-2xl font-bold">
                        {letter}
                      </span>
                      <div className="h-px flex-1 bg-hampstead-charcoal/20" />
                    </div>
                    
                    <dl className="space-y-4">
                      {terms
                        .sort((a, b) => a.term.localeCompare(b.term))
                        .map((term, index) => (
                          <motion.div
                            key={term.term}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.02 }}
                            className="bg-white rounded-xl p-5 shadow-sm"
                          >
                            <dt className="font-playfair text-lg font-bold text-hampstead-black mb-2 flex items-center gap-3">
                              {term.term}
                              <span className="text-xs font-normal px-2 py-0.5 bg-hampstead-cream rounded text-hampstead-charcoal/70">
                                {term.category}
                              </span>
                            </dt>
                            <dd className="text-hampstead-charcoal/80 leading-relaxed">
                              {term.definition}
                            </dd>
                            {term.relatedTerms && (
                              <div className="mt-3 pt-3 border-t border-hampstead-charcoal/10">
                                <span className="text-xs text-hampstead-charcoal/60">Related: </span>
                                {term.relatedTerms.map((related, i) => (
                                  <button
                                    key={related}
                                    onClick={() => {
                                      setSearchQuery(related);
                                      setSelectedCategory('all');
                                      setSelectedLetter('all');
                                    }}
                                    className="text-xs text-hampstead-black hover:underline"
                                  >
                                    {related}{i < (term.relatedTerms?.length ?? 0) - 1 ? ', ' : ''}
                                  </button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </dl>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Summary */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center">
            Browse by Category
          </h2>
          <p className="text-hampstead-charcoal/70 text-lg mb-12 max-w-2xl mx-auto text-center">
            Explore terms organised by topic area
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, index) => {
              const count = glossaryTerms.filter(t => t.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedLetter('all');
                    setSearchQuery('');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="p-4 bg-hampstead-cream rounded-xl text-left hover:shadow-md transition-all group"
                >
                  <h3 className="font-medium mb-1 group-hover:text-hampstead-charcoal/80 transition-colors">
                    {cat}
                  </h3>
                  <p className="text-sm text-hampstead-charcoal/60">
                    {count} terms
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-hampstead-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Have a Heritage Question?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Our team of heritage specialists is happy to discuss your property 
            and answer any questions about period architecture or restoration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/journal/faq"
              className="inline-flex items-center justify-center gap-2 bg-white text-hampstead-black px-8 py-4 rounded-lg font-medium hover:bg-hampstead-cream transition-colors"
            >
              Browse FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/journal/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors border border-white/30"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
