import type { Metadata } from 'next';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
}

/**
 * Generate metadata object for Next.js 14+ App Router
 * Use this function in page files to set metadata
 */
export function generateMetaTags({
  title,
  description,
  keywords,
  author,
  image = '/images/og-default.jpg'
}: MetaTagsProps): Metadata {
  return {
    title,
    description,
    keywords: keywords?.split(',').map(k => k.trim()),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * MetaTags component for use in page metadata export
 * Note: In Next.js 14+, use generateMetadata function or export metadata object instead
 */
const MetaTags = ({ title, description, keywords, author, image }: MetaTagsProps) => {
  // This component is kept for backwards compatibility
  // In Next.js App Router, metadata should be exported from page files
  return null;
};

export { MetaTags };
export default MetaTags;