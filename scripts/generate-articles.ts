/**
 * Article Generator for The Hampstead Design Journal
 * Generates 1,500+ unique articles across multiple categories
 * 
 * Usage: npx ts-node scripts/generate-articles.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'content', 'articles');
const TOTAL_ARTICLES = 1500;
const START_DATE = new Date('2024-01-01');
const END_DATE = new Date('2025-12-15');

// ============================================================================
// DATA: LOCATIONS
// ============================================================================

const LOCATIONS = {
  primary: [
    'Hampstead', 'Belsize Park', 'Primrose Hill', 'Swiss Cottage', 
    'South Hampstead', 'West Hampstead', 'Hampstead Garden Suburb',
    'Highgate', 'Kentish Town', 'Gospel Oak', 'Chalk Farm'
  ],
  streets: [
    'Church Row', 'Flask Walk', 'Well Walk', 'Holly Walk', 'Mount Vernon',
    'Keats Grove', 'Downshire Hill', 'Willow Road', 'South End Road',
    'East Heath Road', 'Fitzjohns Avenue', 'Arkwright Road', 'Frognal',
    'Hampstead High Street', 'Heath Street', 'New End', 'Perrin\'s Lane',
    'Cannon Lane', 'Elm Row', 'Gayton Road', 'Netherhall Gardens',
    'Lindfield Gardens', 'Wedderburn Road', 'Crediton Hill', 'Eton Avenue',
    'Fellows Road', 'Lawn Road', 'Parkhill Road', 'Haverstock Hill',
    'England\'s Lane', 'Steele\'s Road', 'Chalcot Square', 'Regent\'s Park Road',
    'Elsworthy Road', 'Wadham Gardens', 'Canfield Gardens', 'Fairhazel Gardens'
  ],
  postcodes: ['NW3', 'NW6', 'NW8', 'NW1', 'N6', 'NW5', 'NW11']
};

// ============================================================================
// DATA: CATEGORIES AND TOPICS
// ============================================================================

const CATEGORIES = {
  'architecture': {
    weight: 25,
    topics: [
      { template: 'Georgian Architecture Guide: {street}', type: 'street-guide' },
      { template: 'Victorian Terraces of {location}: A Complete Guide', type: 'area-guide' },
      { template: 'Edwardian Villas in {location}: Architectural Heritage', type: 'area-guide' },
      { template: 'Arts and Crafts Houses of {location}', type: 'style-guide' },
      { template: 'The History of {street}: An Architectural Walking Tour', type: 'walking-tour' },
      { template: 'Conservation Area Guide: {location}', type: 'conservation' },
      { template: 'Notable Architects of {location}: A Historical Survey', type: 'history' },
      { template: 'Modernist Architecture in {location}: 1930s-1970s', type: 'style-guide' },
      { template: 'The Queen Anne Revival in {location}', type: 'style-guide' },
      { template: 'Dutch Gables and Flemish Bond: {location}\'s Distinctive Features', type: 'features' },
      { template: 'Bay Windows of {location}: Types, Styles and Restoration', type: 'features' },
      { template: 'Porches and Porticos: {location}\'s Front Entrances', type: 'features' },
      { template: 'Chimney Stacks and Pots: A Guide to {location}\'s Rooflines', type: 'features' },
      { template: 'Decorative Ironwork in {location}: Railings, Gates and Balconies', type: 'features' },
      { template: 'Stucco and Render: {location}\'s Facade Traditions', type: 'materials' },
      { template: 'Red Brick vs London Stock: Building Materials in {location}', type: 'materials' },
      { template: 'Slate Roofs of {location}: History and Maintenance', type: 'materials' },
      { template: 'The Servant Question: Below Stairs Architecture in {location}', type: 'history' },
      { template: 'Coach Houses and Mews: {location}\'s Secondary Buildings', type: 'building-types' },
      { template: 'Semi-Detached Houses of {location}: The Suburban Ideal', type: 'building-types' },
      { template: 'Mansion Blocks in {location}: A Complete Guide', type: 'building-types' },
      { template: 'Purpose-Built Flats of {location}: 1890-1939', type: 'building-types' },
      { template: 'Post-War Housing in {location}: Rebuilding After the Blitz', type: 'history' },
      { template: 'Brutalist Buildings of {location}: A Reassessment', type: 'style-guide' },
      { template: 'Contemporary Architecture in {location}: 2000-Present', type: 'style-guide' }
    ]
  },
  'heritage-architecture': {
    weight: 20,
    topics: [
      { template: 'Listed Building Guide: Understanding Grade II in {location}', type: 'listed' },
      { template: 'Grade II* Properties of {location}: A Survey', type: 'listed' },
      { template: 'Blue Plaques of {location}: Famous Residents', type: 'heritage' },
      { template: 'The Hampstead Artistic Colony: {location}\'s Creative Heritage', type: 'heritage' },
      { template: 'Literary {location}: Writers and Their Homes', type: 'heritage' },
      { template: 'Scientific Heritage: Notable Thinkers of {location}', type: 'heritage' },
      { template: 'Political History: {location}\'s Radical Past', type: 'heritage' },
      { template: 'The Pre-Raphaelites in {location}', type: 'heritage' },
      { template: 'Bloomsbury Connections: {location}\'s Literary Links', type: 'heritage' },
      { template: 'Refugee Heritage: European Emigres in {location}', type: 'heritage' },
      { template: 'Jewish Heritage in {location}: A Historical Guide', type: 'heritage' },
      { template: 'Musical {location}: Composers and Performers', type: 'heritage' },
      { template: 'Historic Gardens of {location}: Private and Public', type: 'heritage' },
      { template: 'Lost Houses of {location}: What Disappeared', type: 'heritage' },
      { template: 'The Great Estates: How {location} Was Developed', type: 'history' },
      { template: 'Medieval Origins: {location} Before the Georgians', type: 'history' },
      { template: 'The Wells and Spas: {location}\'s Healing Waters', type: 'history' },
      { template: 'Hampstead Heath: The Fight for Open Space', type: 'history' },
      { template: 'The Underground\'s Impact on {location}', type: 'history' },
      { template: 'Wartime {location}: Bombs, Shelters and Survival', type: 'history' }
    ]
  },
  'interiors': {
    weight: 20,
    topics: [
      { template: 'Period Kitchens for {location} Homes: Design Guide', type: 'room' },
      { template: 'Bathroom Design in Victorian Houses: {location} Guide', type: 'room' },
      { template: 'Living Room Layouts for {location} Terraces', type: 'room' },
      { template: 'Master Bedroom Design in Period {location} Properties', type: 'room' },
      { template: 'Home Office Design for {location} Period Homes', type: 'room' },
      { template: 'Hallway and Entrance Design: First Impressions in {location}', type: 'room' },
      { template: 'Basement Conversions: Creating Living Space in {location}', type: 'room' },
      { template: 'Loft Conversions in {location}: Design Considerations', type: 'room' },
      { template: 'Open Plan vs Traditional: Layout Options for {location} Homes', type: 'layout' },
      { template: 'Side Return Extensions: Maximising Space in {location}', type: 'layout' },
      { template: 'Rear Extensions in {location}: Design and Planning', type: 'layout' },
      { template: 'Lighting Design for Period Properties in {location}', type: 'element' },
      { template: 'Curtains and Blinds for {location} Sash Windows', type: 'element' },
      { template: 'Fireplaces in {location}: Restoration and Design', type: 'element' },
      { template: 'Built-in Storage Solutions for {location} Homes', type: 'element' },
      { template: 'Ceiling Roses and Cornicing: Preserving Details in {location}', type: 'element' },
      { template: 'Picture Rails and Dado Rails: {location} Wall Treatments', type: 'element' },
      { template: 'Door Furniture and Ironmongery for {location} Properties', type: 'element' },
      { template: 'Radiator Design: Heating Solutions for {location} Homes', type: 'element' },
      { template: 'Staircase Design and Restoration in {location}', type: 'element' },
      { template: 'Colour Schemes for {location} Period Interiors', type: 'style' },
      { template: 'Minimalist Design in Period {location} Properties', type: 'style' },
      { template: 'Maximalist Interiors: Bold Choices for {location} Homes', type: 'style' },
      { template: 'Scandi Style in {location} Victorian Houses', type: 'style' },
      { template: 'Mid-Century Modern Meets Victorian in {location}', type: 'style' }
    ]
  },
  'interiors-materials': {
    weight: 15,
    topics: [
      { template: 'Herringbone Flooring Guide for {location} Homes', type: 'flooring' },
      { template: 'Engineered Oak vs Solid: Flooring Choices in {location}', type: 'flooring' },
      { template: 'Parquet Flooring Restoration in {location}', type: 'flooring' },
      { template: 'Victorian Encaustic Tiles: {location} Hallway Guide', type: 'flooring' },
      { template: 'Natural Stone Flooring for {location} Kitchens', type: 'flooring' },
      { template: 'Terrazzo: A Comeback in {location} Interiors', type: 'flooring' },
      { template: 'Carpet vs Hard Flooring in {location} Period Homes', type: 'flooring' },
      { template: 'Underfloor Heating in {location}: A Complete Guide', type: 'flooring' },
      { template: 'Marble Countertops for {location} Kitchens', type: 'surfaces' },
      { template: 'Granite vs Quartz: Worktop Choices in {location}', type: 'surfaces' },
      { template: 'Timber Worktops for {location} Period Kitchens', type: 'surfaces' },
      { template: 'Splashback Materials for {location} Homes', type: 'surfaces' },
      { template: 'Bathroom Tiles: Trends for {location} Properties', type: 'surfaces' },
      { template: 'Wall Panelling Options for {location} Interiors', type: 'walls' },
      { template: 'Wallpaper for Period Properties in {location}', type: 'walls' },
      { template: 'Lime Plaster vs Gypsum: Wall Finishes in {location}', type: 'walls' },
      { template: 'Paint Finishes for {location} Period Details', type: 'walls' },
      { template: 'Fabric and Upholstery for {location} Period Homes', type: 'soft' },
      { template: 'Curtain Fabrics: Traditional vs Contemporary in {location}', type: 'soft' },
      { template: 'Brass, Chrome or Nickel: Metal Finishes in {location}', type: 'hardware' }
    ]
  },
  'planning-regulations': {
    weight: 10,
    topics: [
      { template: 'Camden Planning Permission: Complete Guide for {location}', type: 'planning' },
      { template: 'Permitted Development Rights in {location}', type: 'planning' },
      { template: 'Planning Appeals in Camden: {location} Success Stories', type: 'planning' },
      { template: 'Listed Building Consent: What You Need in {location}', type: 'listed' },
      { template: 'Conservation Area Restrictions in {location}', type: 'conservation' },
      { template: 'Article 4 Directions: What They Mean for {location}', type: 'conservation' },
      { template: 'Tree Preservation Orders in {location}: A Guide', type: 'trees' },
      { template: 'Party Wall Agreements for {location} Terraces', type: 'legal' },
      { template: 'Building Regulations for {location} Extensions', type: 'building-regs' },
      { template: 'Fire Safety Requirements in {location} Conversions', type: 'building-regs' },
      { template: 'Structural Engineer Requirements in {location}', type: 'professional' },
      { template: 'Working with Conservation Officers in Camden', type: 'professional' },
      { template: 'Pre-Application Advice: Is It Worth It in {location}?', type: 'planning' },
      { template: 'Neighbour Objections: Handling Opposition in {location}', type: 'planning' },
      { template: 'Enforcement Action: What to Know in {location}', type: 'planning' },
      { template: 'Change of Use Applications in {location}', type: 'planning' },
      { template: 'HMO Licensing in {location}: Complete Guide', type: 'licensing' },
      { template: 'Basement Planning Policy in Camden: {location} Guide', type: 'basement' },
      { template: 'Construction Management Plans for {location}', type: 'construction' },
      { template: 'Demolition in Conservation Areas: {location} Rules', type: 'conservation' }
    ]
  },
  'living': {
    weight: 5,
    topics: [
      { template: 'Best Schools Near {location}: A Parent\'s Guide', type: 'schools' },
      { template: 'Restaurants and Cafes of {location}: Local Guide', type: 'dining' },
      { template: 'Independent Shops of {location}: Supporting Local', type: 'shopping' },
      { template: 'Parks and Green Spaces Near {location}', type: 'outdoors' },
      { template: 'Transport Links from {location}: Getting Around', type: 'transport' },
      { template: 'Community Groups and Societies in {location}', type: 'community' },
      { template: 'Sports and Fitness Options in {location}', type: 'lifestyle' },
      { template: 'Arts and Culture: What\'s On in {location}', type: 'culture' },
      { template: 'Family Life in {location}: A Resident\'s View', type: 'lifestyle' },
      { template: 'Dog Walking Routes from {location}', type: 'outdoors' },
      { template: 'Healthcare Options Near {location}', type: 'services' },
      { template: 'Libraries and Learning in {location}', type: 'services' },
      { template: 'Markets and Food Shopping in {location}', type: 'shopping' },
      { template: 'Pubs and Bars of {location}: A Historic Tour', type: 'dining' },
      { template: 'Moving to {location}: A Newcomer\'s Guide', type: 'lifestyle' }
    ]
  },
  'market-watch': {
    weight: 5,
    topics: [
      { template: 'Property Values in {location}: {year} Analysis', type: 'market' },
      { template: 'Price Per Square Foot: {location} vs North London', type: 'market' },
      { template: 'Best Streets to Buy in {location}: {year}', type: 'market' },
      { template: 'Investment Potential in {location}: What to Consider', type: 'investment' },
      { template: 'Rental Yields in {location}: Landlord\'s Guide', type: 'investment' },
      { template: 'First-Time Buyers in {location}: Is It Possible?', type: 'market' },
      { template: 'Downsizing in {location}: Options and Opportunities', type: 'market' },
      { template: 'New Developments Near {location}: What\'s Coming', type: 'development' },
      { template: 'Auction Properties in {location}: Buying Guide', type: 'buying' },
      { template: 'Off-Market Properties in {location}: How to Find Them', type: 'buying' },
      { template: 'Estate Agents in {location}: Who to Use', type: 'services' },
      { template: 'Surveyor\'s Guide to {location} Properties', type: 'services' },
      { template: 'Mortgage Options for {location} Properties', type: 'finance' },
      { template: 'Stamp Duty Considerations for {location} Buyers', type: 'finance' },
      { template: 'Renovation ROI: What Adds Value in {location}', type: 'investment' }
    ]
  }
};

// ============================================================================
// DATA: CONTENT TEMPLATES
// ============================================================================

const INTRO_TEMPLATES = [
  `Few areas of London combine architectural heritage, cultural significance, and natural beauty quite like {location}. This guide explores what makes properties here so distinctive and sought-after.`,
  `The tree-lined streets of {location} tell a story of over two centuries of architectural evolution. From Georgian elegance to Victorian grandeur, every building has a tale to tell.`,
  `Discerning homeowners have long recognised {location} as one of London's most desirable addresses. Here we examine the elements that define its unique character.`,
  `Step onto any street in {location} and you're immediately struck by the quality of the built environment. This isn't accidental—it's the result of careful development and protection over generations.`,
  `Whether you're a long-time resident or considering a move to {location}, understanding its architectural heritage enriches your appreciation of this remarkable area.`,
  `The property market in {location} reflects its exceptional character. Here, we look beyond the price tags to understand what makes these homes so special.`,
  `Conservation and contemporary living meet in {location}, where period properties continue to evolve while respecting their heritage. This balance is at the heart of successful ownership here.`,
  `From the moment you pass beneath the canopy of mature London planes on {street}, you sense you're somewhere special. This guide helps you understand why.`,
  `Architecture in {location} represents some of the finest domestic building in Britain. Understanding its nuances is essential for anyone seeking to own, restore, or simply appreciate these properties.`,
  `The enduring appeal of {location} lies not just in its location, but in the quality and character of its buildings. Let's examine what distinguishes them.`
];

const SECTION_TEMPLATES = {
  history: [
    `## Historical Context\n\nThe development of {location} began in earnest during the {era}, when the combination of clean air, elevated position, and proximity to London made it attractive to the prosperous middle classes.\n\nThe {decade}s saw rapid expansion, with speculative builders creating the terraces and villas that define the area today. Unlike the grand aristocratic developments of Mayfair or Belgravia, {location} attracted artists, writers, intellectuals, and professionals—giving it a distinctive bohemian character that persists today.\n\nThe arrival of the Underground in {rail_year} transformed {location} from a semi-rural retreat into a commuter suburb, though one that maintained its village atmosphere and fiercely independent character.`,
    `## The Story of Development\n\nUnderstanding {location}'s architecture requires understanding its history. The area developed in distinct phases, each leaving its mark on the streetscape.\n\n**Georgian Period (1714-1837):** The earliest substantial development, creating the elegant proportions and restrained decoration that define {location}'s core.\n\n**Victorian Era (1837-1901):** Rapid expansion brought variety—from modest workers' cottages to substantial family villas.\n\n**Edwardian Period (1901-1910):** A final flowering of domestic architecture, often considered the pinnacle of British house-building.\n\n**Inter-War Years (1918-1939):** More modest development, including early modernist experiments and neo-Georgian infill.\n\n**Post-War Period (1945-present):** Careful conservation alongside selective contemporary additions.`
  ],
  architecture: [
    `## Architectural Character\n\nThe prevailing architectural style in {location} is {style}, characterised by {features}. However, the area's appeal lies in its variety—a walk down any street reveals subtle differences in detail, proportion, and decoration.\n\n### Key Features\n\n**Facades:** Most properties feature {facade_material}, with {decorative_elements} providing visual interest. The craftsmanship evident in these details reflects the skilled workforce available during the building period.\n\n**Windows:** Original {window_type} remain in many properties, though sympathetic replacements using traditional methods are common. The glazing bars, horns, and ironmongery all contribute to the character.\n\n**Rooflines:** The distinctive skyline of {location} owes much to its {roof_type}, with {chimney_style} punctuating the roofscape.\n\n**Boundaries:** Front gardens are typically bounded by {boundary_type}, many original to the properties.`,
    `## What Defines the Architecture\n\nThe buildings of {location} share certain characteristics while maintaining individual identity. This balance between coherence and variety is central to the area's appeal.\n\n### Scale and Proportion\n\nUnlike the grand terraces of Kensington or the cramped courts of inner London, {location}'s housing strikes a middle ground—substantial enough to impress, modest enough to feel domestic. Ceiling heights of {ceiling_height}, generous windows, and well-proportioned rooms create comfortable family homes.\n\n### Materials\n\nThe predominant material is {primary_material}, used with {secondary_material} for decorative effect. This palette creates visual harmony while allowing individual expression through details like door colours, ironwork patterns, and planting choices.\n\n### Craftsmanship\n\nLook closely at any period property in {location} and you'll see evidence of skilled craftsmanship: the precision of brickwork, the flowing lines of joinery, the intricate patterns of decorative plasterwork. These details are irreplaceable and define the character of the buildings.`
  ],
  practical: [
    `## Practical Considerations\n\nOwning a period property in {location} brings responsibilities alongside privileges. Understanding these helps ensure successful stewardship.\n\n### Maintenance\n\nThe traditional materials used in {location}'s buildings—lime mortars, timber windows, lead flashings—require specific maintenance approaches. Modern substitutes often cause more problems than they solve.\n\n**Annual checks should include:**\n- Roof condition and flashings\n- Gutters and downpipes\n- Pointing and render\n- Window condition\n- Timber decay inspection\n\n### Consents and Permissions\n\nMost of {location} falls within a Conservation Area, meaning external alterations require planning permission. Many properties are also Listed, adding further requirements. Before any work, establish:\n\n1. Conservation Area status\n2. Listed Building status\n3. Article 4 directions\n4. Tree Preservation Orders\n\n### Finding the Right Professionals\n\nPeriod property work requires specialists who understand traditional construction. Look for:\n- RIBA Conservation Architects\n- IHBC members for conservation advice\n- Guild of Master Craftsmen for building work\n- RICS chartered surveyors with heritage experience`,
    `## Living in a Period Property\n\nThe reality of owning a period home in {location} involves balancing preservation with contemporary life. Here's what to consider.\n\n### Energy Efficiency\n\nHistoric buildings were designed to breathe—solid walls, lime mortars, and natural materials managing moisture through evaporation. Modern interventions must respect this:\n\n- **Insulation:** Internal wall insulation requires careful specification to avoid condensation\n- **Windows:** Secondary glazing often outperforms replacement double glazing while preserving character\n- **Heating:** Underfloor heating works well with traditional solid floors; radiators suit suspended timber floors\n- **Draught-proofing:** Simple measures make significant comfort improvements\n\n### Modern Services\n\nIntegrating contemporary services requires sensitivity:\n\n- **Electrical:** Rewiring should minimise damage to historic fabric\n- **Plumbing:** Routes should avoid cutting through structural timbers\n- **Technology:** Smart home systems can be installed invisibly\n- **Lighting:** LED technology allows period-appropriate fittings with modern efficiency\n\n### Insurance\n\nStandard home insurance may not adequately cover period properties. Specialist providers understand:\n- Rebuild costs for traditional construction\n- Listed Building requirements\n- Non-standard materials and methods`
  ],
  market: [
    `## The Market Today\n\nProperty in {location} commands a premium reflecting its exceptional character and limited supply. Understanding the market helps buyers and sellers make informed decisions.\n\n### Price Factors\n\n**Location within location:** Even within {location}, significant price variations exist. Properties on {premium_streets} command the highest prices, while {secondary_streets} offer relative value.\n\n**Condition:** The cost of sympathetic renovation means turnkey properties command substantial premiums over those requiring work.\n\n**Period and style:** Georgian properties typically achieve the highest prices per square foot, followed by early Victorian, with later Victorian and Edwardian competing closely.\n\n**Original features:** Properties retaining shutters, fireplaces, cornicing, and other period details outperform stripped-out alternatives.\n\n### Current Trends\n\n- Strong demand for family houses\n- Premium for gardens and outdoor space\n- Growing interest in flats within converted houses\n- Continued preference for period over modern\n- Increasing recognition of post-war architecture`,
    `## Investment Perspective\n\nFor many, a property in {location} represents both a home and a significant financial asset. Understanding the dynamics helps protect this investment.\n\n### What Adds Value\n\n**High-return improvements:**\n- Kitchen and bathroom upgrades\n- Basement or loft conversions (where permitted)\n- Garden improvements\n- Energy efficiency measures\n\n**Neutral or negative:**\n- Removing period features\n- Inappropriate extensions\n- Over-modernisation\n- Poor quality work\n\n### Long-Term Outlook\n\n{location}'s fundamental appeal—excellent schools, transport, green space, community, and architecture—remains robust. The area has weathered multiple economic cycles, consistently outperforming broader London markets during recoveries.\n\nThe protected nature of the built environment limits supply, while demand from domestic and international buyers remains strong. These factors suggest continued resilience, though specific property performance depends on condition, location, and presentation.`
  ]
};

const CONCLUSION_TEMPLATES = [
  `## Final Thoughts\n\nOwning property in {location} is a privilege that carries responsibility. These buildings have survived for over a century; our task is to ensure they survive for another.\n\nThe key is understanding before acting. Every property has a story, and successful ownership means becoming part of that narrative—contributing sympathetically rather than erasing what came before.\n\nFor those considering purchase, take time to understand what you're buying. For current owners, invest in proper maintenance and appropriate improvements. And for all of us, appreciate the remarkable legacy we've inherited in these streets.`,
  `## Conclusion\n\n{location} represents something increasingly rare in London—an area where architecture, community, and environment combine to create genuine quality of life. This hasn't happened by accident; it's the result of generations of residents who understood and protected what made it special.\n\nWhether you're researching a potential purchase, planning improvements to your current home, or simply curious about the area, we hope this guide has illuminated what makes {location} so distinctive.\n\nThe best properties here work with their heritage rather than against it—embracing period character while adapting for contemporary life. This balance, achieved thoughtfully, creates homes that are both historically significant and genuinely liveable.`,
  `## Summary\n\nThe properties of {location} represent some of the finest domestic architecture in Britain. Understanding their character, caring for their fabric, and adapting them sensitively for modern life ensures they'll continue to provide exceptional homes for generations to come.\n\nFor specific advice on your property, consult qualified professionals with heritage experience. For community matters, engage with local conservation and residents' groups. And for ongoing insight into architecture, interiors, and living in North West London, continue following The Hampstead Design Journal.`
];

// ============================================================================
// DATA: CONTENT ELEMENTS
// ============================================================================

const CONTENT_ELEMENTS = {
  eras: ['Georgian period', 'early Victorian era', 'mid-Victorian period', 'late Victorian era', 'Edwardian period'],
  decades: ['1820', '1840', '1860', '1870', '1880', '1890', '1900', '1920', '1930'],
  rail_years: ['1868', '1907', '1924', '1939', '1941'],
  styles: ['Georgian', 'Victorian Italianate', 'Gothic Revival', 'Queen Anne Revival', 'Arts and Crafts', 'Edwardian Baroque', 'Neo-Georgian'],
  features: ['symmetrical facades', 'decorative brickwork', 'ornate stucco detailing', 'Dutch gables', 'terracotta ornament', 'half-timbering'],
  facade_materials: ['London stock brick', 'red brick', 'stucco over brick', 'painted brick', 'stone dressings with brick'],
  decorative_elements: ['carved stone capitals', 'terracotta panels', 'decorative bargeboards', 'ornate door surrounds', 'dentil cornices'],
  window_types: ['six-over-six sash windows', 'two-over-two sash windows', 'margin-light sashes', 'bay windows with sashes', 'casement windows'],
  roof_types: ['Welsh slate roofs', 'clay tile roofs', 'mansard roofs', 'hipped roofs', 'Dutch gabled roofs'],
  chimney_styles: ['ornate brick chimney stacks', 'rendered chimney stacks', 'decorative pots', 'grouped flues'],
  boundary_types: ['original cast iron railings', 'low brick walls with railings', 'privet hedging', 'York stone walls'],
  ceiling_heights: ['3 metres on principal floors', '2.8 metres throughout', '3.2 metres in reception rooms', '2.7 metres on upper floors'],
  primary_materials: ['London stock brick', 'yellow stock brick', 'red brick', 'gault brick', 'rendered masonry'],
  secondary_materials: ['Bath stone dressings', 'Portland stone details', 'terracotta ornament', 'painted stucco', 'gauged brick arches'],
  premium_streets: ['Church Row', 'Well Walk', 'Keats Grove', 'Willow Road', 'Downshire Hill'],
  secondary_streets: ['the streets off Haverstock Hill', 'the west side of South End', 'the streets around Gospel Oak', 'the flats on Adelaide Road']
};

const YEARS = ['2024', '2025'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateDate(): string {
  const start = START_DATE.getTime();
  const end = END_DATE.getTime();
  const randomTime = start + Math.random() * (end - start);
  const date = new Date(randomTime);
  return date.toISOString().split('T')[0];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function fillTemplate(template: string, data: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

function generateExcerpt(location: string, category: string): string {
  const excerpts: Record<string, string[]> = {
    'architecture': [
      `A comprehensive guide to the architectural heritage of ${location}, exploring building styles, materials, and conservation considerations.`,
      `Discover the distinctive character of ${location}'s built environment, from Georgian elegance to Victorian grandeur.`,
      `Understanding what makes ${location}'s architecture special—and how to preserve it for future generations.`,
      `From facades to foundations, explore the architectural elements that define ${location}'s streetscape.`
    ],
    'heritage-architecture': [
      `Exploring the rich heritage of ${location}, from blue plaques to listed buildings and the stories they tell.`,
      `A journey through ${location}'s past, examining the historical significance of its buildings and residents.`,
      `Understanding ${location}'s protected status and what it means for property owners and the community.`,
      `The cultural legacy of ${location}—famous residents, architectural movements, and enduring influence.`
    ],
    'interiors': [
      `Design inspiration for ${location} homes, balancing period character with contemporary living requirements.`,
      `Practical guidance for interior projects in ${location}'s period properties, from kitchens to bedrooms.`,
      `How to create beautiful, functional interiors that respect the heritage of your ${location} home.`,
      `Interior design approaches for ${location} properties, working with original features and proportions.`
    ],
    'interiors-materials': [
      `Material choices for ${location} homes—what works, what doesn't, and how to make informed decisions.`,
      `A guide to selecting and specifying materials for period property projects in ${location}.`,
      `From flooring to fixtures, understanding materials that complement ${location}'s architectural heritage.`,
      `Quality materials for quality homes—making the right choices for your ${location} property.`
    ],
    'planning-regulations': [
      `Navigate ${location}'s planning requirements with confidence—permissions, consents, and practical guidance.`,
      `Understanding what you can and cannot do to your ${location} property, and how to approach the process.`,
      `A practical guide to planning and building regulations for ${location} property owners.`,
      `Everything you need to know about consents, permissions, and regulations in ${location}.`
    ],
    'living': [
      `Life in ${location}—schools, shops, restaurants, and everything that makes the area special.`,
      `A local's guide to ${location}, covering the amenities and character that define the neighbourhood.`,
      `What it's really like to live in ${location}, from daily conveniences to community spirit.`,
      `Discover ${location} beyond the properties—the people, places, and culture that make it home.`
    ],
    'market-watch': [
      `Property market analysis for ${location}—prices, trends, and what's driving demand.`,
      `Understanding ${location}'s property market—what buyers need to know and sellers should consider.`,
      `Market insight for ${location}—where values are heading and what influences local property prices.`,
      `A data-driven look at ${location}'s property market and investment considerations.`
    ]
  };
  
  return randomElement(excerpts[category] || excerpts['architecture']);
}

function generateContent(location: string, street: string, category: string): string {
  const data: Record<string, string> = {
    location,
    street,
    era: randomElement(CONTENT_ELEMENTS.eras),
    decade: randomElement(CONTENT_ELEMENTS.decades),
    rail_year: randomElement(CONTENT_ELEMENTS.rail_years),
    style: randomElement(CONTENT_ELEMENTS.styles),
    features: randomElement(CONTENT_ELEMENTS.features),
    facade_material: randomElement(CONTENT_ELEMENTS.facade_materials),
    decorative_elements: randomElement(CONTENT_ELEMENTS.decorative_elements),
    window_type: randomElement(CONTENT_ELEMENTS.window_types),
    roof_type: randomElement(CONTENT_ELEMENTS.roof_types),
    chimney_style: randomElement(CONTENT_ELEMENTS.chimney_styles),
    boundary_type: randomElement(CONTENT_ELEMENTS.boundary_types),
    ceiling_height: randomElement(CONTENT_ELEMENTS.ceiling_heights),
    primary_material: randomElement(CONTENT_ELEMENTS.primary_materials),
    secondary_material: randomElement(CONTENT_ELEMENTS.secondary_materials),
    premium_streets: randomElement(CONTENT_ELEMENTS.premium_streets),
    secondary_streets: randomElement(CONTENT_ELEMENTS.secondary_streets),
    year: randomElement(YEARS)
  };

  const sections: string[] = [];
  
  // Intro
  sections.push(fillTemplate(randomElement(INTRO_TEMPLATES), data));
  
  // Main sections based on category
  if (['architecture', 'heritage-architecture'].includes(category)) {
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.history), data));
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.architecture), data));
  }
  
  if (['interiors', 'interiors-materials'].includes(category)) {
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.architecture), data));
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.practical), data));
  }
  
  if (category === 'planning-regulations') {
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.practical), data));
  }
  
  if (['living', 'market-watch'].includes(category)) {
    sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.market), data));
  }
  
  // Always add practical and conclusion
  sections.push(fillTemplate(randomElement(SECTION_TEMPLATES.practical), data));
  sections.push(fillTemplate(randomElement(CONCLUSION_TEMPLATES), data));
  
  return sections.join('\n\n');
}

// ============================================================================
// ARTICLE GENERATOR
// ============================================================================

interface ArticleMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  featured: boolean;
}

function generateArticle(index: number): { meta: ArticleMeta; content: string; filename: string } {
  // Select category weighted by distribution
  const categoryWeights: [string, number][] = Object.entries(CATEGORIES).map(
    ([cat, data]) => [cat, data.weight]
  );
  const totalWeight = categoryWeights.reduce((sum, [, w]) => sum + w, 0);
  let random = Math.random() * totalWeight;
  let category = 'architecture';
  for (const [cat, weight] of categoryWeights) {
    random -= weight;
    if (random <= 0) {
      category = cat;
      break;
    }
  }

  // Select topic from category
  const topics = CATEGORIES[category as keyof typeof CATEGORIES].topics;
  const topic = randomElement(topics);
  
  // Select location and street
  const location = randomElement(LOCATIONS.primary);
  const street = randomElement(LOCATIONS.streets);
  
  // Generate title
  let title = topic.template
    .replace('{location}', location)
    .replace('{street}', street)
    .replace('{year}', randomElement(YEARS));
  
  // Add variation to make titles unique
  const variations = [
    '', ' Complete Guide', ' Expert Guide', ' Comprehensive Guide',
    ' 2024', ' 2025', ' Your Guide', ' What to Know'
  ];
  if (index > topics.length * LOCATIONS.primary.length) {
    title = title + randomElement(variations);
  }
  
  const slug = slugify(title) + '-' + index;
  const date = generateDate();
  const excerpt = generateExcerpt(location, category);
  const featured = Math.random() < 0.1; // 10% featured
  
  const meta: ArticleMeta = {
    title,
    slug,
    date,
    category,
    excerpt,
    author: 'The Hampstead Design Journal',
    featured
  };
  
  const content = generateContent(location, street, category);
  const filename = slug + '.mdx';
  
  return { meta, content, filename };
}

function createMdxFile(meta: ArticleMeta, content: string): string {
  return `---
title: "${meta.title.replace(/"/g, '\\"')}"
slug: "${meta.slug}"
date: "${meta.date}"
category: "${meta.category}"
excerpt: "${meta.excerpt.replace(/"/g, '\\"')}"
author: "${meta.author}"
featured: ${meta.featured}
---

${content}
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🏠 The Hampstead Design Journal - Article Generator');
  console.log('=' .repeat(50));
  console.log(`Generating ${TOTAL_ARTICLES} articles...`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Track generated slugs to avoid duplicates
  const generatedSlugs = new Set<string>();
  
  // Get existing files to not overwrite
  const existingFiles = fs.readdirSync(OUTPUT_DIR);
  console.log(`Found ${existingFiles.length} existing articles (will be preserved)`);
  existingFiles.forEach(f => generatedSlugs.add(f.replace('.mdx', '')));

  let generated = 0;
  let skipped = 0;
  const startTime = Date.now();

  for (let i = 0; i < TOTAL_ARTICLES; i++) {
    const { meta, content, filename } = generateArticle(i);
    
    // Skip if slug already exists
    if (generatedSlugs.has(meta.slug)) {
      skipped++;
      continue;
    }
    
    generatedSlugs.add(meta.slug);
    
    const filePath = path.join(OUTPUT_DIR, filename);
    const mdxContent = createMdxFile(meta, content);
    
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    generated++;
    
    // Progress indicator
    if (generated % 100 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  ✓ ${generated} articles generated (${elapsed}s)`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('');
  console.log('=' .repeat(50));
  console.log(`✅ Complete!`);
  console.log(`   Generated: ${generated} new articles`);
  console.log(`   Skipped: ${skipped} duplicates`);
  console.log(`   Total time: ${totalTime}s`);
  console.log(`   Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
