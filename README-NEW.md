# The Hampstead Design Journal

The authoritative voice on architecture, interiors, and living in North West London.

## Overview

The Hampstead Design Journal is a high-end editorial publication focused on:

- **Heritage & Architecture**: Restoration techniques for Hampstead's period properties
- **Planning & Regulations**: Navigating Camden Council's planning policies
- **Interiors & Materials**: Material specification and design guidance
- **Market Watch**: Property values, ROI analysis, and market trends in NW3

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom editorial design system
- **Typography**: Playfair Display (serif) for headings, system fonts for body
- **Content**: MDX articles with frontmatter
- **Deployment**: Ready for Vercel, Netlify, or similar platforms

## Design Philosophy

The site embodies editorial excellence through:

- **Serif typography** (Playfair Display) for gravitas and tradition
- **Generous white space** for readability and elegance
- **High-resolution imagery** of Hampstead architecture
- **Long-form content** (1,500+ words per article)
- **Third-person editorial voice** maintaining journalistic authority

## Project Structure

```
the-hampstead-design-journal/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── articles/           # Article listing & individual pages
│   │   └── categories/         # Category pages (4 pillars)
│   ├── components/
│   │   ├── articles/           # Article components & EditorNote
│   │   ├── layout/             # Header, Footer, Navigation, Newsletter
│   │   ├── seo/                # MetaTags, StructuredData
│   │   └── ui/                 # Reusable UI components
│   ├── content/
│   │   └── articles/           # MDX article files
│   └── styles/
│       └── fonts.ts            # Font configuration
├── public/                     # Static assets
├── tailwind.config.ts          # Custom design system
└── contentlayer.config.ts      # Content configuration
```

## Content Pillars

### 1. Heritage & Architecture
Articles on restoration techniques, architectural history, and preservation of Hampstead's Arts & Crafts, Victorian, and Edwardian buildings.

### 2. Planning & Regulations
Guidance on Camden Council planning policies, conservation areas, basement conversions, and building regulations.

### 3. Interiors & Materials
Material specification, finish selection, and interior design appropriate to period properties in NW3.

### 4. Market Watch
Data-driven analysis of property values, renovation ROI, and market trends across Hampstead and Belsize Park.

## Launch Articles

Six comprehensive deep-dive articles (1,500+ words each):

1. **Arts & Crafts Renovation Guide** - Heritage restoration techniques for Redington Road to Frognal homes
2. **Camden Basement Planning Guide** - Navigating planning permission for basement conversions in 2025
3. **Herringbone Oak Flooring Guide** - Material specification for engineered oak flooring
4. **Renovation ROI Analysis** - The "done-up" premium in NW3 property values
5. **Smart Home Integration** - Lutron and Control4 in period properties
6. **Winter Maintenance Checklist** - Seasonal home preparation for Hampstead properties

## Key Features

### Editorial Components

- **EditorNote**: Branded call-to-action appearing at the end of each article
- **NewsletterSignup**: Email capture for "The Monthly Dispatch"
- **Category Pages**: Curated landing pages for each content pillar
- **About Page**: Editorial positioning and team credentials

### SEO Optimization

- Comprehensive metadata for all pages
- Structured data for articles
- Semantic HTML5 markup
- Keyword-rich content targeting local search terms

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view the site.

## Color Palette

```css
--hampstead-black: #1a1a1a    /* Primary text */
--hampstead-white: #FFFFFF     /* Backgrounds */
--hampstead-cream: #F8F7F4     /* Soft backgrounds */
--hampstead-grey: #E5E5E5      /* Borders */
--hampstead-charcoal: #333333  /* Secondary text */
```

## Typography

- **Headings**: Playfair Display (serif), 400 weight
- **Body**: System fonts stack for optimal performance
- **Scale**: Fluid typography using clamp() for responsive sizing

## Editorial Standards

All content follows strict editorial guidelines:

- **Data-Driven**: Property values and statistics verified via Land Registry
- **Technically Accurate**: Restoration techniques validated by chartered professionals
- **Locally Specific**: Street names, planning precedents, and architectural details are precise
- **Practitioner-Focused**: Written for homeowners undertaking actual projects

## Brand Connection

*The Hampstead Design Journal* is curated by **Hampstead Renovations**, based at 250 Finchley Road since 2009. This editorial connection ensures content is informed by real-world project experience.

## Distribution Strategy

- **Newsletter**: Monthly email to 5,000+ local residents
- **LinkedIn**: Articles shared for architect and investor audience  
- **Local Media**: Press releases to Ham & High linking to deep-dive guides
- **SEO**: Targeting "Hampstead + [topic]" search queries

## License

MIT License - See LICENSE file for details

---

**The Hampstead Design Journal**  
Architecture, Interiors, and Living in North West London
