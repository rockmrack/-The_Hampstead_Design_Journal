import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://www.hampsteadrenovations.co.uk/#organization",
    "name": "Hampstead Renovations",
    "alternateName": "The Hampstead Design Journal",
    "description": "Heritage renovation specialists in North West London. Expert restoration of period properties in Hampstead, Belsize Park, and surrounding conservation areas.",
    "url": "https://www.hampsteadrenovations.co.uk",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hampsteadrenovations.co.uk/journal/logo.png",
      "width": 600,
      "height": 60
    },
    "image": [
      "https://www.hampsteadrenovations.co.uk/journal/images/showroom-1x1.jpg",
      "https://www.hampsteadrenovations.co.uk/journal/images/showroom-4x3.jpg",
      "https://www.hampsteadrenovations.co.uk/journal/images/showroom-16x9.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 3, Palace Court, 250 Finchley Road",
      "addressLocality": "London",
      "addressRegion": "Greater London",
      "postalCode": "NW3 6DN",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5468,
      "longitude": -0.1802
    },
    "telephone": "+442074319823",
    "email": "info@hampsteadrenovations.co.uk",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "££££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": [
      {
        "@type": "City",
        "name": "London",
        "@id": "https://www.wikidata.org/wiki/Q84"
      },
      {
        "@type": "Place",
        "name": "Hampstead",
        "address": {
          "@type": "PostalAddress",
          "postalCode": "NW3",
          "addressCountry": "GB"
        }
      },
      {
        "@type": "Place",
        "name": "Belsize Park"
      },
      {
        "@type": "Place",
        "name": "Hampstead Garden Suburb"
      },
      {
        "@type": "Place",
        "name": "Swiss Cottage"
      },
      {
        "@type": "Place",
        "name": "Primrose Hill"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Heritage Renovation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Period Property Renovation",
            "description": "Complete renovation of Georgian, Victorian, and Edwardian properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basement Extension",
            "description": "Basement excavation and conversion in conservation areas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Listed Building Restoration",
            "description": "Sensitive restoration of Grade I, II*, and II listed buildings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Planning Consultancy",
            "description": "Conservation area planning advice and application support"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.instagram.com/hampsteadrenovations",
      "https://www.linkedin.com/company/hampstead-renovations",
      "https://www.houzz.co.uk/professionals/hampstead-renovations"
    ],
    "founder": {
      "@type": "Person",
      "name": "James Thornton",
      "jobTitle": "Managing Director"
    },
    "foundingDate": "2009",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "slogan": "Heritage Expertise for North West London's Finest Homes",
    "knowsAbout": [
      "Heritage Architecture",
      "Conservation Area Planning",
      "Listed Building Restoration",
      "Period Property Renovation",
      "Basement Extensions",
      "Georgian Architecture",
      "Victorian Architecture",
      "Edwardian Architecture",
      "Arts and Crafts Movement",
      "Lime Plaster",
      "Sash Windows",
      "Traditional Joinery"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.hampsteadrenovations.co.uk/journal/#website",
    "name": "The Hampstead Design Journal",
    "url": "https://www.hampsteadrenovations.co.uk/journal",
    "description": "The authoritative voice on architecture, heritage restoration, and interior design in North West London",
    "publisher": {
      "@id": "https://www.hampsteadrenovations.co.uk/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.hampsteadrenovations.co.uk/journal/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-GB"
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.hampsteadrenovations.co.uk/journal/#publisher",
    "name": "The Hampstead Design Journal",
    "url": "https://www.hampsteadrenovations.co.uk/journal",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.hampsteadrenovations.co.uk/journal/logo.png",
      "width": 600,
      "height": 60
    },
    "parentOrganization": {
      "@id": "https://www.hampsteadrenovations.co.uk/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
};

export default LocalBusinessSchema;
