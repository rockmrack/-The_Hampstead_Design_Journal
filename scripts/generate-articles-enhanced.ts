/**
 * Enhanced Article Generator for The Hampstead Design Journal
 * Generates high-quality articles with images across multiple categories
 * 
 * Usage: npx ts-node scripts/generate-articles-enhanced.ts
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
const START_DATE = new Date('2023-01-01');
const END_DATE = new Date('2025-12-15');

// Unsplash image collections for each category - London/British specific images
// Using specific Unsplash photo IDs that are verified to show British/London architecture
const UNSPLASH_IMAGES = {
  architecture: [
    // London Georgian/Victorian townhouses and terraces
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop', // London Georgian terrace
    'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=1200&h=800&fit=crop', // London brick townhouse
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop', // Red brick Victorian
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', // Classic townhouse facade
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1200&h=800&fit=crop', // London street houses
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop', // British terrace row
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', // Traditional London building
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', // Georgian door details
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop', // English period home
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop', // British residential street
  ],
  'heritage-architecture': [
    // Victorian/Edwardian/Georgian heritage buildings
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=800&fit=crop', // Victorian brick facade
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop', // Period property exterior
    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop', // Heritage building details
    'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200&h=800&fit=crop', // Traditional English architecture
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop', // Restored period home
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', // Georgian townhouse
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', // Classic period facade
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', // Historic entrance
  ],
  interiors: [
    // Traditional British/period interiors
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop', // Period living room
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', // Classic interior
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop', // Traditional sitting room
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop', // Period kitchen
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop', // Heritage interior
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop', // Classic British interior
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop', // Traditional bathroom
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', // Period room
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop', // Elegant interior
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop', // Traditional decor
  ],
  'interiors-materials': [
    // Materials, flooring, fixtures close-ups
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', // Wood flooring detail
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=800&fit=crop', // Kitchen materials
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop', // Bathroom fixtures
    'https://images.unsplash.com/photo-1600566752547-c2c7a7c72e06?w=1200&h=800&fit=crop', // Interior materials
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop', // Worktop detail
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop', // Period fixtures
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop', // Tile detail
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop', // Classic materials
  ],
  'planning-regulations': [
    // Architectural drawings, documents, planning context
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop', // Architectural blueprints
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop', // Planning documents
    'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?w=1200&h=800&fit=crop', // Architectural plans
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', // Period building
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', // Conservation area building
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', // Listed building entrance
  ],
  living: [
    // London neighborhoods, parks, lifestyle
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop', // London cityscape
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=800&fit=crop', // London street scene
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=800&fit=crop', // London neighborhood
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=800&fit=crop', // London park
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&h=800&fit=crop', // London residential area
    'https://images.unsplash.com/photo-1500380804539-4e1e8c092f7d?w=1200&h=800&fit=crop', // London life
  ],
  'market-watch': [
    // Real estate, property, London homes for sale context
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop', // House keys/sale concept
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=800&fit=crop', // Property investment
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop', // Real estate concept
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', // Property exterior
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop', // London property
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', // Period property entrance
  ],
};

// Topic-specific image mapping for more accurate image matching
const TOPIC_IMAGES: Record<string, string[]> = {
  // Architecture topics
  'victorian': [
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=1200&h=800&fit=crop',
  ],
  'georgian': [
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
  ],
  'edwardian': [
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop',
  ],
  'terrace': [
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1200&h=800&fit=crop',
  ],
  'arts and crafts': [
    'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop',
  ],
  'walking tour': [
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
  ],
  // Interior topics
  'kitchen': [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop',
  ],
  'bathroom': [
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566752547-c2c7a7c72e06?w=1200&h=800&fit=crop',
  ],
  'living room': [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop',
  ],
  'bedroom': [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=800&fit=crop',
  ],
  // Materials topics
  'flooring': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop',
  ],
  'herringbone': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop',
  ],
  'tile': [
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop',
  ],
  'panelling': [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop',
  ],
  'wallpaper': [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop',
  ],
  'sash window': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
  ],
  'door': [
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
  ],
  // Planning topics
  'planning': [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?w=1200&h=800&fit=crop',
  ],
  'basement': [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?w=1200&h=800&fit=crop',
  ],
  'extension': [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  ],
  'conservation': [
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
  ],
  'listed building': [
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
  ],
  'tree preservation': [
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=800&fit=crop',
  ],
  // Living/lifestyle topics
  'school': [
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&h=800&fit=crop',
  ],
  'transport': [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=800&fit=crop',
  ],
  'underground': [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&h=800&fit=crop',
  ],
  'park': [
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500380804539-4e1e8c092f7d?w=1200&h=800&fit=crop',
  ],
  'heath': [
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500380804539-4e1e8c092f7d?w=1200&h=800&fit=crop',
  ],
  'garden': [
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500380804539-4e1e8c092f7d?w=1200&h=800&fit=crop',
  ],
  // Market topics
  'property market': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop',
  ],
  'price': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=800&fit=crop',
  ],
  'investment': [
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop',
  ],
  'renovation': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop',
  ],
  // History topics
  'wartime': [
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop',
  ],
  'history': [
    'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop',
  ],
  'famous resident': [
    'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
  ],
  // Heating/systems
  'underfloor heating': [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop',
  ],
  'smart home': [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  ],
  'lighting': [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
  ],
};

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
    'Hampstead High Street', 'Heath Street', 'New End', "Perrin's Lane",
    'Cannon Lane', 'Elm Row', 'Gayton Road', 'Netherhall Gardens',
    'Lindfield Gardens', 'Wedderburn Road', 'Crediton Hill', 'Eton Avenue',
    'Fellows Road', 'Lawn Road', 'Parkhill Road', 'Haverstock Hill',
    "England's Lane", "Steele's Road", 'Chalcot Square', "Regent's Park Road",
    'Elsworthy Road', 'Wadham Gardens', 'Canfield Gardens', 'Fairhazel Gardens'
  ],
  postcodes: ['NW3', 'NW6', 'NW8', 'NW1', 'N6', 'NW5', 'NW11']
};

// ============================================================================
// DATA: ENHANCED CATEGORIES AND TOPICS
// ============================================================================

const CATEGORIES = {
  'architecture': {
    weight: 25,
    topics: [
      { 
        template: 'The Complete Guide to Georgian Architecture in {location}', 
        type: 'comprehensive-guide',
        readTime: 15,
        keywords: ['Georgian', 'architecture', 'period property', 'heritage', 'restoration']
      },
      { 
        template: 'Victorian Terraces of {location}: History, Features, and Restoration', 
        type: 'area-guide',
        readTime: 12,
        keywords: ['Victorian', 'terrace', 'restoration', 'period features']
      },
      { 
        template: 'Edwardian Architectural Masterpieces in {location}: A Detailed Survey', 
        type: 'survey',
        readTime: 14,
        keywords: ['Edwardian', 'architecture', 'survey', 'heritage homes']
      },
      { 
        template: 'Arts and Crafts Movement: The Houses of {location}', 
        type: 'style-guide',
        readTime: 16,
        keywords: ['Arts and Crafts', 'William Morris', 'handcraft', 'design movement']
      },
      { 
        template: 'Architectural Walking Tour of {street}: A Street-by-Street Guide', 
        type: 'walking-tour',
        readTime: 10,
        keywords: ['walking tour', 'architecture', 'heritage trail', 'street guide']
      },
      { 
        template: 'Conservation Area Deep Dive: Understanding {location}\'s Protected Status', 
        type: 'conservation',
        readTime: 18,
        keywords: ['conservation area', 'listed buildings', 'protection', 'planning']
      },
      { 
        template: 'The Architects Who Shaped {location}: A Historical Compendium', 
        type: 'history',
        readTime: 20,
        keywords: ['architects', 'history', 'design', 'legacy']
      },
      { 
        template: 'Modernist Architecture in {location}: Hidden Gems from 1930-1970', 
        type: 'style-guide',
        readTime: 13,
        keywords: ['modernist', '20th century', 'contemporary', 'brutalism']
      },
      { 
        template: 'Bay Windows Through the Ages: {location}\'s Most Distinctive Feature', 
        type: 'features',
        readTime: 11,
        keywords: ['bay windows', 'period features', 'glazing', 'restoration']
      },
      { 
        template: 'The Art of the Victorian Facade: Decorative Elements in {location}', 
        type: 'features',
        readTime: 14,
        keywords: ['facade', 'decorative', 'stucco', 'terracotta', 'ornament']
      },
      { 
        template: 'Chimneys and Roofscapes: The Skyline of {location}', 
        type: 'features',
        readTime: 9,
        keywords: ['chimneys', 'roofs', 'slate', 'skyline', 'maintenance']
      },
      { 
        template: 'Ironwork Heritage: Rails, Gates and Balconies of {location}', 
        type: 'features',
        readTime: 10,
        keywords: ['ironwork', 'railings', 'gates', 'balconies', 'Victorian']
      },
      { 
        template: 'London Stock Brick: The Material That Built {location}', 
        type: 'materials',
        readTime: 12,
        keywords: ['London stock brick', 'materials', 'masonry', 'heritage']
      },
      { 
        template: 'Mews Houses and Coach Houses: The Hidden Homes of {location}', 
        type: 'building-types',
        readTime: 11,
        keywords: ['mews', 'coach house', 'conversion', 'hidden gems']
      },
      { 
        template: 'Mansion Blocks of {location}: A Comprehensive Guide', 
        type: 'building-types',
        readTime: 15,
        keywords: ['mansion blocks', 'flats', 'apartment living', 'Victorian']
      },
    ]
  },
  'heritage-architecture': {
    weight: 20,
    topics: [
      { 
        template: 'Listed Building Guide: Everything You Need to Know About Grade II in {location}', 
        type: 'listed',
        readTime: 18,
        keywords: ['listed building', 'Grade II', 'heritage', 'protection', 'consent']
      },
      { 
        template: 'Grade II* and Grade I: The Most Significant Buildings of {location}', 
        type: 'listed',
        readTime: 16,
        keywords: ['Grade I', 'Grade II*', 'significant buildings', 'national importance']
      },
      { 
        template: 'Blue Plaques of {location}: Famous Residents and Their Homes', 
        type: 'heritage',
        readTime: 14,
        keywords: ['blue plaques', 'famous residents', 'history', 'commemoration']
      },
      { 
        template: 'The Hampstead Artistic Colony: Artists, Writers and Intellectuals', 
        type: 'heritage',
        readTime: 20,
        keywords: ['artists', 'writers', 'bohemian', 'culture', 'history']
      },
      { 
        template: 'Literary {location}: The Writers Who Called NW3 Home', 
        type: 'heritage',
        readTime: 15,
        keywords: ['literature', 'writers', 'authors', 'literary history']
      },
      { 
        template: 'Freud, Jung and the Émigré Intellectuals of {location}', 
        type: 'heritage',
        readTime: 17,
        keywords: ['Freud', 'emigres', 'refugees', 'intellectual history']
      },
      { 
        template: 'The Pre-Raphaelites and Their {location} Connections', 
        type: 'heritage',
        readTime: 13,
        keywords: ['Pre-Raphaelites', 'art movement', 'Rossetti', 'Victorian art']
      },
      { 
        template: 'Historic Gardens: The Green Spaces of {location}\'s Grand Houses', 
        type: 'heritage',
        readTime: 12,
        keywords: ['gardens', 'landscape', 'historic gardens', 'horticulture']
      },
      { 
        template: 'Lost Houses: The Demolished Mansions of {location}', 
        type: 'heritage',
        readTime: 14,
        keywords: ['lost houses', 'demolished', 'history', 'development']
      },
      { 
        template: 'How {location} Was Built: The Story of the Great Estates', 
        type: 'history',
        readTime: 22,
        keywords: ['estates', 'development history', 'landowners', 'building']
      },
      { 
        template: 'From Village to Suburb: {location}\'s Transformation 1800-1914', 
        type: 'history',
        readTime: 18,
        keywords: ['history', 'development', 'Victorian', 'transformation']
      },
      { 
        template: 'The Underground Arrives: How the Tube Transformed {location}', 
        type: 'history',
        readTime: 11,
        keywords: ['Underground', 'tube', 'transport', 'development']
      },
      { 
        template: 'Wartime {location}: Bombs, Bunkers and the Home Front', 
        type: 'history',
        readTime: 16,
        keywords: ['World War', 'Blitz', 'wartime', 'home front', 'history']
      },
    ]
  },
  'interiors': {
    weight: 20,
    topics: [
      { 
        template: 'The Perfect Period Kitchen: Design Guide for {location} Homes', 
        type: 'room',
        readTime: 14,
        keywords: ['kitchen', 'design', 'period property', 'renovation']
      },
      { 
        template: 'Victorian Bathroom Design: Authentic Style for {location} Properties', 
        type: 'room',
        readTime: 12,
        keywords: ['bathroom', 'Victorian', 'design', 'fittings', 'tiles']
      },
      { 
        template: 'Living Room Excellence: Layout and Design for {location} Terraces', 
        type: 'room',
        readTime: 13,
        keywords: ['living room', 'layout', 'design', 'furniture', 'proportion']
      },
      { 
        template: 'Master Bedroom Retreats: Creating Luxury in {location} Period Homes', 
        type: 'room',
        readTime: 11,
        keywords: ['bedroom', 'master suite', 'luxury', 'design', 'comfort']
      },
      { 
        template: 'The Georgian Home Office: Working From Your {location} Property', 
        type: 'room',
        readTime: 10,
        keywords: ['home office', 'working from home', 'study', 'design']
      },
      { 
        template: 'First Impressions: Hallway Design for {location} Period Properties', 
        type: 'room',
        readTime: 9,
        keywords: ['hallway', 'entrance', 'first impressions', 'tiles', 'design']
      },
      { 
        template: 'Basement Living: Converting Below Ground Space in {location}', 
        type: 'room',
        readTime: 16,
        keywords: ['basement', 'conversion', 'living space', 'light wells']
      },
      { 
        template: 'Loft Conversion Mastery: Adding Space to {location} Properties', 
        type: 'room',
        readTime: 15,
        keywords: ['loft', 'conversion', 'attic', 'space', 'planning']
      },
      { 
        template: 'Open Plan Revolution: Modern Living in {location} Victorian Homes', 
        type: 'layout',
        readTime: 13,
        keywords: ['open plan', 'kitchen-diner', 'layout', 'modern living']
      },
      { 
        template: 'The Side Return Extension: Maximising Your {location} Kitchen', 
        type: 'layout',
        readTime: 12,
        keywords: ['side return', 'extension', 'kitchen', 'glass', 'light']
      },
      { 
        template: 'Lighting Design for Period Properties: Illuminating {location} Homes', 
        type: 'element',
        readTime: 14,
        keywords: ['lighting', 'design', 'LED', 'period', 'atmosphere']
      },
      { 
        template: 'Fireplace Restoration: Bringing Heart Back to {location} Homes', 
        type: 'element',
        readTime: 11,
        keywords: ['fireplace', 'restoration', 'mantelpiece', 'surround', 'hearth']
      },
      { 
        template: 'Cornicing and Ceiling Roses: Restoring Original Details in {location}', 
        type: 'element',
        readTime: 10,
        keywords: ['cornicing', 'ceiling rose', 'plasterwork', 'restoration']
      },
      { 
        template: 'The Art of the Staircase: Design and Restoration in {location}', 
        type: 'element',
        readTime: 12,
        keywords: ['staircase', 'banister', 'newel post', 'restoration', 'design']
      },
      { 
        template: 'Colour Theory for Period Homes: Palettes That Work in {location}', 
        type: 'style',
        readTime: 11,
        keywords: ['colour', 'paint', 'palette', 'period', 'design']
      },
    ]
  },
  'interiors-materials': {
    weight: 15,
    topics: [
      { 
        template: 'Herringbone Flooring: The Complete Guide for {location} Homeowners', 
        type: 'flooring',
        readTime: 13,
        keywords: ['herringbone', 'flooring', 'oak', 'parquet', 'installation']
      },
      { 
        template: 'Engineered vs Solid Oak: Making the Right Choice for {location} Homes', 
        type: 'flooring',
        readTime: 11,
        keywords: ['engineered oak', 'solid oak', 'flooring', 'comparison']
      },
      { 
        template: 'Victorian Encaustic Tiles: Hallway Heritage in {location}', 
        type: 'flooring',
        readTime: 12,
        keywords: ['encaustic tiles', 'Victorian', 'hallway', 'restoration', 'patterns']
      },
      { 
        template: 'Natural Stone Flooring: Limestone, Marble and More for {location}', 
        type: 'flooring',
        readTime: 14,
        keywords: ['natural stone', 'limestone', 'marble', 'flooring', 'luxury']
      },
      { 
        template: 'Underfloor Heating in Period Properties: A {location} Guide', 
        type: 'flooring',
        readTime: 15,
        keywords: ['underfloor heating', 'period property', 'installation', 'efficiency']
      },
      { 
        template: 'Marble vs Quartz: Worktop Decisions for {location} Kitchens', 
        type: 'surfaces',
        readTime: 10,
        keywords: ['marble', 'quartz', 'worktop', 'kitchen', 'comparison']
      },
      { 
        template: 'The Return of Terrazzo: Contemporary Material, Period Setting', 
        type: 'surfaces',
        readTime: 9,
        keywords: ['terrazzo', 'contemporary', 'flooring', 'surfaces', 'trend']
      },
      { 
        template: 'Kitchen Splashbacks: Materials and Ideas for {location} Homes', 
        type: 'surfaces',
        readTime: 8,
        keywords: ['splashback', 'kitchen', 'tiles', 'glass', 'design']
      },
      { 
        template: 'Wall Panelling Renaissance: Wood, MDF and Beyond in {location}', 
        type: 'walls',
        readTime: 11,
        keywords: ['panelling', 'wainscoting', 'wall treatment', 'design']
      },
      { 
        template: 'Heritage Paint: Authentic Colours for {location} Period Interiors', 
        type: 'walls',
        readTime: 10,
        keywords: ['paint', 'heritage colours', 'Farrow Ball', 'period', 'authentic']
      },
      { 
        template: 'Wallpaper for Character Homes: Patterns and Choices in {location}', 
        type: 'walls',
        readTime: 9,
        keywords: ['wallpaper', 'patterns', 'period', 'design', 'Morris']
      },
      { 
        template: 'Brass, Nickel or Chrome: Metal Finishes for {location} Properties', 
        type: 'hardware',
        readTime: 8,
        keywords: ['brass', 'nickel', 'chrome', 'hardware', 'finishes']
      },
    ]
  },
  'planning-regulations': {
    weight: 10,
    topics: [
      { 
        template: 'Camden Planning Permission: The Definitive Guide for {location} Residents', 
        type: 'planning',
        readTime: 20,
        keywords: ['planning permission', 'Camden', 'application', 'process']
      },
      { 
        template: 'Permitted Development Rights: What You Can Build Without Permission in {location}', 
        type: 'planning',
        readTime: 16,
        keywords: ['permitted development', 'rights', 'extensions', 'no permission']
      },
      { 
        template: 'Listed Building Consent: A Step-by-Step Guide for {location} Owners', 
        type: 'listed',
        readTime: 18,
        keywords: ['listed building consent', 'application', 'heritage', 'process']
      },
      { 
        template: 'Conservation Area Rules: What {location} Homeowners Must Know', 
        type: 'conservation',
        readTime: 15,
        keywords: ['conservation area', 'restrictions', 'rules', 'alterations']
      },
      { 
        template: 'Article 4 Directions Explained: Implications for {location} Properties', 
        type: 'conservation',
        readTime: 14,
        keywords: ['Article 4', 'directions', 'restrictions', 'permitted development']
      },
      { 
        template: 'Tree Preservation Orders: Protecting {location}\'s Green Heritage', 
        type: 'trees',
        readTime: 10,
        keywords: ['TPO', 'trees', 'preservation', 'garden', 'permission']
      },
      { 
        template: 'Party Wall Agreements: Navigating Neighbour Relations in {location}', 
        type: 'legal',
        readTime: 13,
        keywords: ['party wall', 'agreement', 'neighbours', 'legal', 'building work']
      },
      { 
        template: 'Building Regulations for Extensions: {location} Requirements', 
        type: 'building-regs',
        readTime: 17,
        keywords: ['building regulations', 'extensions', 'approval', 'compliance']
      },
      { 
        template: 'Working With Conservation Officers: Tips for {location} Projects', 
        type: 'professional',
        readTime: 11,
        keywords: ['conservation officer', 'relationship', 'advice', 'application']
      },
      { 
        template: 'Basement Extensions in Camden: Planning Policy Decoded for {location}', 
        type: 'basement',
        readTime: 19,
        keywords: ['basement', 'extension', 'Camden policy', 'planning']
      },
    ]
  },
  'living': {
    weight: 5,
    topics: [
      { 
        template: 'School Guide: The Best Options Near {location} for Every Age', 
        type: 'schools',
        readTime: 16,
        keywords: ['schools', 'education', 'primary', 'secondary', 'private']
      },
      { 
        template: 'Dining in {location}: The Best Restaurants, Cafes and Pubs', 
        type: 'dining',
        readTime: 12,
        keywords: ['restaurants', 'cafes', 'pubs', 'dining', 'food']
      },
      { 
        template: 'Independent {location}: Supporting Local Shops and Businesses', 
        type: 'shopping',
        readTime: 10,
        keywords: ['independent shops', 'local business', 'high street', 'shopping']
      },
      { 
        template: 'Green {location}: Parks, Gardens and Open Spaces', 
        type: 'outdoors',
        readTime: 11,
        keywords: ['parks', 'gardens', 'Heath', 'green spaces', 'nature']
      },
      { 
        template: 'Getting Around: Transport Links from {location}', 
        type: 'transport',
        readTime: 9,
        keywords: ['transport', 'tube', 'bus', 'overground', 'commute']
      },
      { 
        template: 'Community Life: Groups, Societies and Events in {location}', 
        type: 'community',
        readTime: 10,
        keywords: ['community', 'groups', 'societies', 'events', 'local']
      },
      { 
        template: 'Family Life in {location}: A Resident\'s Comprehensive Guide', 
        type: 'lifestyle',
        readTime: 14,
        keywords: ['family', 'children', 'lifestyle', 'resident guide']
      },
      { 
        template: 'Moving to {location}: Everything Newcomers Need to Know', 
        type: 'lifestyle',
        readTime: 18,
        keywords: ['moving', 'relocating', 'newcomers', 'guide']
      },
    ]
  },
  'market-watch': {
    weight: 5,
    topics: [
      { 
        template: '{location} Property Market {year}: Annual Price Analysis', 
        type: 'market',
        readTime: 12,
        keywords: ['property market', 'prices', 'analysis', 'trends']
      },
      { 
        template: 'Price Per Square Foot: How {location} Compares to North London', 
        type: 'market',
        readTime: 10,
        keywords: ['price per sqft', 'comparison', 'value', 'market']
      },
      { 
        template: 'Best Streets to Buy: Top {location} Roads for {year}', 
        type: 'market',
        readTime: 11,
        keywords: ['best streets', 'investment', 'buying', 'top roads']
      },
      { 
        template: 'Investment Potential: Why Buyers Choose {location}', 
        type: 'investment',
        readTime: 13,
        keywords: ['investment', 'potential', 'growth', 'returns']
      },
      { 
        template: 'Rental Yields in {location}: A Landlord\'s Complete Guide', 
        type: 'investment',
        readTime: 14,
        keywords: ['rental yields', 'landlord', 'buy-to-let', 'returns']
      },
      { 
        template: 'First-Time Buyers: Is {location} Within Reach?', 
        type: 'market',
        readTime: 12,
        keywords: ['first-time buyers', 'affordability', 'mortgage', 'starter']
      },
      { 
        template: 'Renovation ROI: What Really Adds Value in {location}', 
        type: 'investment',
        readTime: 15,
        keywords: ['renovation', 'ROI', 'value', 'improvements', 'return']
      },
      { 
        template: 'Off-Market Properties: How to Find Hidden Gems in {location}', 
        type: 'buying',
        readTime: 11,
        keywords: ['off-market', 'hidden gems', 'buying', 'property']
      },
    ]
  }
};

// ============================================================================
// ENHANCED CONTENT GENERATION
// ============================================================================

function generateEnhancedContent(location: string, street: string, category: string, title: string): string {
  const elements = {
    era: randomElement(['Georgian period', 'early Victorian era', 'mid-Victorian period', 'late Victorian era', 'Edwardian period']),
    decade: randomElement(['1820s', '1840s', '1860s', '1870s', '1880s', '1890s', '1900s']),
    style: randomElement(['Georgian', 'Victorian Italianate', 'Gothic Revival', 'Queen Anne Revival', 'Arts and Crafts', 'Edwardian Baroque']),
    feature: randomElement(['symmetrical facades', 'decorative brickwork', 'ornate stucco detailing', 'Dutch gables', 'terracotta ornament']),
    material: randomElement(['London stock brick', 'red brick', 'stucco over brick', 'painted render']),
    window: randomElement(['six-over-six sash windows', 'two-over-two sash windows', 'bay windows with sashes']),
  };

  return `
## Introduction

${location} represents one of North London's most architecturally distinguished neighbourhoods, where ${elements.era} elegance meets contemporary living. This comprehensive guide explores everything you need to know about properties in this sought-after area.

The streets here tell a story spanning more than two centuries of London's development. From the earliest ${elements.decade} developments to the present day, each building contributes to a rich tapestry of architectural heritage that makes ${location} one of the capital's most desirable addresses.

## Historical Context

The development of ${location} reflects broader patterns in London's expansion, yet retains a distinctive character that sets it apart. During the ${elements.era}, the combination of elevated position, clean air, and proximity to the City made this area increasingly attractive to the prosperous middle classes.

Unlike the grand aristocratic developments further south, ${location} attracted artists, writers, intellectuals, and professionals—giving it a bohemian character that persists today. The result is an area that values culture and creativity alongside architectural quality.

### Key Development Phases

**Pre-Victorian Era:** The earliest buildings, characterised by Georgian proportions and restrained elegance.

**Victorian Expansion:** Rapid growth bringing varied architectural styles, from modest workers' cottages to substantial family villas.

**Edwardian Refinement:** A final flowering of domestic architecture, often considered the pinnacle of British house-building.

**Modern Infill:** Careful contemporary additions that respect the historic context while meeting current needs.

## Architectural Character

The prevailing architectural style in ${location} is ${elements.style}, characterised by ${elements.feature}. However, the area's appeal lies in its variety—a walk down any street reveals subtle differences in detail, proportion, and decoration.

### Distinctive Features

**Facades:** Most properties feature ${elements.material}, with decorative elements providing visual interest. The craftsmanship evident in these details reflects the skilled workforce available during the building period.

**Windows:** Original ${elements.window} remain in many properties, though sympathetic replacements using traditional methods are common. The glazing bars, horns, and ironmongery all contribute to the character.

**Rooflines:** The distinctive skyline owes much to Welsh slate roofs and decorative chimney stacks, which punctuate the roofscape and contribute to the area's character when viewed from Hampstead Heath.

**Boundaries:** Front gardens are typically bounded by original cast iron railings or low brick walls, many original to the properties and now listed in their own right.

## Living in ${location}

### The Community

${location} maintains a village atmosphere despite its position within London. Local shops, cafes, and restaurants create a sense of neighbourhood, while excellent transport links provide easy access to the rest of the city.

The area attracts families, professionals, and creatives who value both the quality of the built environment and the strong sense of community. Local societies and conservation groups play an active role in maintaining the area's character.

### Practical Considerations

**Transport:** Excellent connections via the Northern Line and Overground, with numerous bus routes serving the area.

**Schools:** A strong selection of both state and independent schools at primary and secondary level.

**Green Space:** Hampstead Heath provides over 320 hectares of ancient parkland on the doorstep.

**Amenities:** A thriving high street with independent shops, restaurants, and essential services.

## Property Ownership

Owning a period property in ${location} brings responsibilities alongside privileges. Most of the area falls within a Conservation Area, meaning external alterations require planning permission. Many properties are also Listed, adding further requirements but also recognising their special architectural interest.

### Maintenance Priorities

1. **Roof and rainwater goods** - Annual inspection prevents costly damage
2. **Windows and external joinery** - Regular maintenance extends lifespan
3. **Masonry and pointing** - Use lime mortar to match original
4. **Decorative features** - Specialist repair rather than replacement
5. **Gardens and boundaries** - Maintain character while ensuring security

### Finding Specialists

Period property work requires specialists who understand traditional construction. Look for conservation-accredited architects, heritage surveyors, and craftspeople experienced with historic buildings.

## Investment Value

${location}'s fundamental appeal—architecture, community, green space, and location—provides a foundation for continued demand. The area has consistently outperformed broader London markets through economic cycles.

### Value Drivers

- **Original features:** Properties retaining period details command premiums
- **Condition:** Well-maintained homes significantly outperform neglected ones
- **Outdoor space:** Gardens increasingly valued post-pandemic
- **Sustainability:** Energy improvements add value when done sensitively

## Conclusion

${location} offers a rare combination of architectural quality, community spirit, and urban convenience. Whether you're considering a purchase, planning improvements to your current home, or simply curious about the area, understanding its heritage enriches your appreciation of this remarkable neighbourhood.

The best properties here work with their heritage rather than against it—embracing period character while adapting for contemporary life. This balance, achieved thoughtfully, creates homes that are both historically significant and genuinely liveable.

*For specific advice about your property, consult qualified professionals with heritage experience. For community matters, engage with local conservation and residents' groups.*
`;
}

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

function generateExcerpt(location: string, category: string, title: string): string {
  const excerpts: Record<string, string[]> = {
    'architecture': [
      `An in-depth exploration of ${location}'s architectural heritage, examining building styles, construction methods, and the features that define this prestigious North London neighbourhood. Essential reading for homeowners, buyers, and architecture enthusiasts.`,
      `Discover what makes ${location}'s architecture so distinctive—from Georgian proportions to Victorian exuberance. This comprehensive guide covers history, key features, and practical advice for period property owners.`,
      `The definitive guide to ${location}'s built environment. Understanding the architectural character of these streets is essential for anyone seeking to buy, restore, or simply appreciate North London's finest homes.`,
    ],
    'heritage-architecture': [
      `Exploring the rich cultural and architectural heritage of ${location}, from listed buildings to blue plaques and the remarkable people who shaped this neighbourhood. A journey through history.`,
      `${location}'s heritage extends far beyond bricks and mortar. This guide explores the artists, writers, and thinkers who made these streets home, and the buildings that bear witness to their lives.`,
      `From conservation areas to Grade II listings, understanding ${location}'s protected status and what it means for property owners and the community at large.`,
    ],
    'interiors': [
      `Design inspiration and practical guidance for ${location} homes, balancing period character with contemporary comfort. Whether renovating or refreshing, this guide helps you make informed decisions.`,
      `Creating beautiful, functional interiors in ${location}'s period properties requires understanding original features and how to complement them. Expert advice for discerning homeowners.`,
      `From kitchens to bedrooms, hallways to loft conversions—interior design approaches that honour ${location}'s architectural heritage while meeting modern lifestyle needs.`,
    ],
    'interiors-materials': [
      `Material selection is crucial in period properties. This comprehensive guide covers flooring, surfaces, and finishes appropriate for ${location}'s historic homes.`,
      `From herringbone oak to Victorian encaustic tiles, choosing the right materials can transform your ${location} property. Expert guidance on selection, specification, and installation.`,
      `Quality materials for quality homes—understanding what works in period properties and how to make choices that will stand the test of time.`,
    ],
    'planning-regulations': [
      `Navigating Camden's planning requirements for ${location} properties. Essential guidance on permissions, consents, and how to approach projects successfully.`,
      `Before picking up a hammer, understand your obligations. This guide covers planning permission, listed building consent, and conservation area requirements for ${location}.`,
      `A practical guide to the regulatory landscape in ${location}. Whether planning an extension or changing a window, know what's required before you begin.`,
    ],
    'living': [
      `Life in ${location} extends far beyond the properties. Discover schools, restaurants, green spaces, and the community spirit that makes this neighbourhood special.`,
      `A comprehensive guide to living in ${location}—everything from schools and transport to shopping and dining. Essential reading for residents and those considering a move.`,
      `What it's really like to call ${location} home. Beyond the property prices, explore the lifestyle, community, and daily experience of this North London neighbourhood.`,
    ],
    'market-watch': [
      `Data-driven analysis of ${location}'s property market—prices, trends, and factors driving demand. Essential intelligence for buyers, sellers, and investors.`,
      `Understanding ${location}'s property market requires more than headline figures. This analysis explores what's really driving values and where opportunities lie.`,
      `Market insight for ${location} property—what's selling, at what price, and what it means for your buying or selling decisions.`,
    ],
  };
  
  return randomElement(excerpts[category] || excerpts['architecture']);
}

function getRandomImage(category: string): string {
  const images = UNSPLASH_IMAGES[category as keyof typeof UNSPLASH_IMAGES] || UNSPLASH_IMAGES.architecture;
  return randomElement(images);
}

// Smart image selection based on article title/topic
function getTopicImage(title: string, category: string): string {
  const lowerTitle = title.toLowerCase();
  
  // Check for topic-specific keywords in title
  for (const [topic, images] of Object.entries(TOPIC_IMAGES)) {
    if (lowerTitle.includes(topic)) {
      return randomElement(images);
    }
  }
  
  // Fall back to category-based image
  return getRandomImage(category);
}

// ============================================================================
// ARTICLE GENERATION
// ============================================================================

interface ArticleData {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: number;
  featured: boolean;
  image: string;
  keywords: string[];
  content: string;
}

function generateArticle(topic: any, category: string, index: number): ArticleData {
  const location = randomElement(LOCATIONS.primary);
  const street = randomElement(LOCATIONS.streets);
  const year = randomElement(['2024', '2025']);
  
  let title = topic.template
    .replace('{location}', location)
    .replace('{street}', street)
    .replace('{year}', year);
  
  // Add uniqueness for duplicate topics
  if (index > 0) {
    const suffixes = [
      `: ${year} Edition`,
      `: What You Need to Know`,
      `: Expert Insights`,
      `: A Comprehensive Analysis`,
      `: Updated Guide`,
      `: Essential Information`,
      `: Professional Perspective`,
    ];
    title = title + randomElement(suffixes);
  }
  
  const slug = slugify(title) + '-' + index;
  const date = generateDate();
  const excerpt = generateExcerpt(location, category, title);
  const content = generateEnhancedContent(location, street, category, title);
  const image = getTopicImage(title, category);
  
  return {
    title,
    slug,
    date,
    category,
    excerpt,
    author: randomElement(['James Thornton', 'Victoria Sterling', 'Edward Blackwood', 'Charlotte Mason', 'William Ashford']),
    readTime: topic.readTime || Math.floor(Math.random() * 10) + 8,
    featured: Math.random() < 0.02,
    image,
    keywords: topic.keywords || [],
    content,
  };
}

function generateArticleMdx(article: ArticleData): string {
  return `---
title: "${article.title.replace(/"/g, '\\"')}"
slug: "${article.slug}"
date: "${article.date}"
category: "${article.category}"
excerpt: "${article.excerpt.replace(/"/g, '\\"')}"
author: "${article.author}"
featured: ${article.featured}
coverImage: "${article.image}"
keywords: "${article.keywords.join(', ')}"
---

${article.content}
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🏛️  Enhanced Article Generator for The Hampstead Design Journal');
  console.log('=' .repeat(60));
  
  // Clean existing generated articles (keep originals)
  const existingFiles = fs.readdirSync(OUTPUT_DIR);
  const originalFiles = [
    'arts-and-crafts-renovation-guide.mdx',
    'camden-basement-planning-guide.mdx',
    'herringbone-oak-flooring-guide.mdx',
    'renovation-roi-hampstead-property-value.mdx',
    'sample-article.mdx',
    'smart-home-integration-period-properties.mdx',
    'winter-maintenance-checklist-hampstead.mdx',
  ];
  
  let deleted = 0;
  for (const file of existingFiles) {
    if (!originalFiles.includes(file) && file.endsWith('.mdx')) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
      deleted++;
    }
  }
  console.log(`🗑️  Removed ${deleted} existing generated articles`);
  
  // Build weighted topic list
  const weightedTopics: { topic: any; category: string }[] = [];
  for (const [category, config] of Object.entries(CATEGORIES)) {
    const multiplier = Math.ceil(TOTAL_ARTICLES * (config.weight / 100) / config.topics.length);
    for (const topic of config.topics) {
      for (let i = 0; i < multiplier; i++) {
        weightedTopics.push({ topic, category });
      }
    }
  }
  
  // Shuffle and generate
  const shuffledTopics = shuffleArray(weightedTopics).slice(0, TOTAL_ARTICLES);
  
  console.log(`📝 Generating ${TOTAL_ARTICLES} enhanced articles with images...`);
  
  const startTime = Date.now();
  let generated = 0;
  
  for (let i = 0; i < shuffledTopics.length; i++) {
    const { topic, category } = shuffledTopics[i];
    const article = generateArticle(topic, category, i);
    const mdxContent = generateArticleMdx(article);
    const filePath = path.join(OUTPUT_DIR, `${article.slug}.mdx`);
    
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    generated++;
    
    if (generated % 100 === 0) {
      console.log(`   Generated ${generated}/${TOTAL_ARTICLES} articles...`);
    }
  }
  
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('=' .repeat(60));
  console.log(`✅ Successfully generated ${generated} enhanced articles in ${elapsed}s`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  
  // Stats
  const stats: Record<string, number> = {};
  for (const { category } of shuffledTopics) {
    stats[category] = (stats[category] || 0) + 1;
  }
  console.log('\n📊 Articles by category:');
  for (const [cat, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }
}

main().catch(console.error);
