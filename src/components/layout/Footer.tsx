import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hampstead-black text-hampstead-white pt-20 pb-10">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h2 className="font-serif text-3xl mb-6 text-hampstead-cream">
              The Hampstead Design Journal
            </h2>
            <p className="text-hampstead-grey/80 leading-relaxed mb-8 max-w-sm">
              The authoritative voice on architecture, heritage restoration, and interior design in North West London.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-hampstead-grey hover:text-hampstead-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-hampstead-grey hover:text-hampstead-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:editor@hampsteadjournal.com" className="text-hampstead-grey hover:text-hampstead-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-lg mb-6 text-hampstead-cream">Sections</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/categories/heritage-architecture" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Heritage
                </Link>
              </li>
              <li>
                <Link href="/categories/planning-regulations" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Planning
                </Link>
              </li>
              <li>
                <Link href="/categories/interiors-materials" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Interiors
                </Link>
              </li>
              <li>
                <Link href="/categories/market-watch" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Market Watch
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-serif text-lg mb-6 text-hampstead-cream">Journal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-hampstead-grey/80 hover:text-hampstead-white transition-colors">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-lg mb-6 text-hampstead-cream">Stay Informed</h3>
            <p className="text-hampstead-grey/80 mb-6 text-sm">
              Subscribe to our weekly dispatch of design insights and market analysis.
            </p>
            <form className="flex border-b border-hampstead-grey/30 pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none focus:ring-0 text-hampstead-white placeholder-hampstead-grey/50 w-full px-0"
              />
              <button type="submit" className="text-hampstead-white hover:text-hampstead-cream">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-hampstead-grey/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-hampstead-grey/60">
          <p>&copy; {new Date().getFullYear()} The Hampstead Design Journal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-hampstead-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-hampstead-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-hampstead-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;