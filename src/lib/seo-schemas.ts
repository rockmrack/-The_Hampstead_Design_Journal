/**
 * Advanced SEO System
 * JSON-LD structured data generators for all content types
 */

export interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: OrganizationSchema;
  potentialAction?: SearchActionSchema;
}

export interface OrganizationSchema {
  '@context'?: 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: ContactPointSchema;
  address?: PostalAddressSchema;
}

export interface ContactPointSchema {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  areaServed?: string;
  availableLanguage?: string[];
}

export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface SearchActionSchema {
  '@type': 'SearchAction';
  target: string;
  'query-input': string;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'NewsArticle' | 'BlogPosting';
  headline: string;
  description: string;
  image: string | string[];
  author: PersonSchema | OrganizationSchema;
  publisher: OrganizationSchema;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;
  timeRequired?: string; // ISO 8601 duration
}

export interface PersonSchema {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: OrganizationSchema;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItemSchema[];
}

export interface BreadcrumbItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: FAQItemSchema[];
}

export interface FAQItemSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'HomeAndConstructionBusiness' | 'GeneralContractor';
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  address: PostalAddressSchema;
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: OpeningHoursSchema[];
  priceRange?: string;
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
}

export interface OpeningHoursSchema {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface ReviewSchema {
  '@type': 'Review';
  author: PersonSchema;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating?: number;
  };
}

export interface EventSchema {
  '@context': 'https://schema.org';
  '@type': 'Event';
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    '@type': 'Place';
    name: string;
    address: PostalAddressSchema;
  };
  image?: string;
  organizer: OrganizationSchema | PersonSchema;
  offers?: {
    '@type': 'Offer';
    price: number | string;
    priceCurrency: string;
    availability: string;
    url: string;
    validFrom?: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  image?: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: string;
    value: string;
  };
  totalTime?: string;
  supply?: HowToSupplySchema[];
  tool?: HowToToolSchema[];
  step: HowToStepSchema[];
}

export interface HowToStepSchema {
  '@type': 'HowToStep';
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSupplySchema {
  '@type': 'HowToSupply';
  name: string;
}

export interface HowToToolSchema {
  '@type': 'HowToTool';
  name: string;
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: OrganizationSchema;
  areaServed?: string | string[];
  serviceType?: string;
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
  };
}

// Site configuration
const siteConfig = {
  name: 'The Hampstead Design Journal',
  url: 'https://hampsteaddesignjournal.com',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London.',
  logo: 'https://hampsteaddesignjournal.com/images/logo.png',
  telephone: '+44 20 7433 1234',
  address: {
    streetAddress: '123 Hampstead High Street',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    postalCode: 'NW3 1QE',
    addressCountry: 'GB',
  },
  socialMedia: [
    'https://instagram.com/hampsteaddesignjournal',
    'https://twitter.com/hampsteaddesign',
    'https://linkedin.com/company/hampstead-design-journal',
  ],
};

// Schema generators
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: generateOrganizationSchema(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    sameAs: siteConfig.socialMedia,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.telephone,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  category?: string;
  keywords?: string[];
  wordCount?: number;
  readingTime?: number;
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
      worksFor: generateOrganizationSchema(),
    },
    publisher: generateOrganizationSchema(),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/articles/${article.slug}`,
    },
    articleSection: article.category,
    keywords: article.keywords,
    wordCount: article.wordCount,
    timeRequired: article.readingTime ? `PT${article.readingTime}M` : undefined,
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${siteConfig.url}${item.url}` : undefined,
    })),
  };
}

export function generateFAQSchema(
  questions: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Hampstead Renovations',
    image: siteConfig.logo,
    '@id': `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5558,
      longitude: -0.1778,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '££££',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 127,
    },
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  address: string;
  postcode: string;
  price?: string;
  bookingUrl?: string;
}): EventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
        addressLocality: 'London',
        addressRegion: 'Greater London',
        postalCode: event.postcode,
        addressCountry: 'GB',
      },
    },
    organizer: generateOrganizationSchema(),
    offers: event.price
      ? {
          '@type': 'Offer',
          price: event.price === 'Free' ? 0 : event.price,
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          url: event.bookingUrl || siteConfig.url,
        }
      : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: string;
  supplies?: string[];
  tools?: string[];
  steps: Array<{ name: string; text: string; image?: string }>;
}): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: 'GBP',
          value: howTo.estimatedCost,
        }
      : undefined,
    supply: howTo.supplies?.map((name) => ({
      '@type': 'HowToSupply',
      name,
    })),
    tool: howTo.tools?.map((name) => ({
      '@type': 'HowToTool',
      name,
    })),
    step: howTo.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

// Helper to render schema as script tag content
export function schemaToScript(schema: object): string {
  return JSON.stringify(schema, null, 0);
}

export default {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateEventSchema,
  generateHowToSchema,
  schemaToScript,
};
