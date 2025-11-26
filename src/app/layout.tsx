import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Hampstead Design Journal | Architecture, Interiors, and Living in NW3',
  description: 'The authoritative voice on architecture, heritage restoration, and interior design in North West London. Expert insights on Hampstead\'s finest homes.',
  keywords: 'Hampstead architecture, NW3 interiors, heritage restoration London, Arts and Crafts homes, Camden planning, Belsize Park design',
  authors: [{ name: 'The Hampstead Design Journal' }],
  openGraph: {
    title: 'The Hampstead Design Journal',
    description: 'Architecture, Interiors, and Living in North West London',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}