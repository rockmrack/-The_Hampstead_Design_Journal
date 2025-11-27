import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';
import 'leaflet/dist/leaflet.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hampsteaddesignjournal.com'),
  title: {
    default: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
    template: '%s | The Hampstead Design Journal',
  },
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
  keywords: 'Hampstead architecture, NW3 interiors, heritage restoration London, Arts and Crafts homes, Camden planning, Belsize Park design',
  authors: [{ name: 'The Hampstead Design Journal' }],
  creator: 'The Hampstead Design Journal',
  publisher: 'Hampstead Renovations',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'The Hampstead Design Journal',
    description: 'Architecture, Interiors, and Living in North West London',
    type: 'website',
    locale: 'en_GB',
    siteName: 'The Hampstead Design Journal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hampstead Design Journal',
    description: 'Architecture, Interiors, and Living in North West London',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}