import React from 'react';

const StructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Hampstead Design Journal",
        "url": "https://www.hampsteaddesignjournal.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.hampsteaddesignjournal.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default StructuredData;