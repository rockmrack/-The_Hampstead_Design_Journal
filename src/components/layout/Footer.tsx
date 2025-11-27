import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hampstead-black text-hampstead-white">
      {/* Main Footer Content */}
      <div className="editorial-container pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          
          {/* Column 1: The Journal Brand */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-hampstead-cream">
              The Hampstead Design Journal
            </h2>
            <p className="text-hampstead-grey/80 leading-relaxed mb-6">
              Celebrating the architecture, history, and lifestyle of North West London.
            </p>
            <nav className="space-y-3">
              <Link 
                href="/archive" 
                className="block text-hampstead-grey/80 hover:text-hampstead-white transition-colors"
              >
                The Archive
              </Link>
              <Link 
                href="/categories/interiors-materials" 
                className="block text-hampstead-grey/80 hover:text-hampstead-white transition-colors"
              >
                Interiors
              </Link>
              <Link 
                href="/archive#map" 
                className="block text-hampstead-grey/80 hover:text-hampstead-white transition-colors"
              >
                Planning Map
              </Link>
            </nav>
            
            {/* Social Links */}
            <div className="flex space-x-5 mt-8">
              <a 
                href="https://instagram.com/hampsteadrenovations" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-hampstead-grey hover:text-hampstead-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@hampsteadrenovations.com" 
                className="text-hampstead-grey hover:text-hampstead-white transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Technical Expertise (The Soft Sell) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-grey/50 mb-3 block">
              Editor&apos;s Desk
            </span>
            <h3 className="font-serif text-xl mb-4 text-hampstead-cream">
              Technical Expertise
            </h3>
            <p className="text-hampstead-grey/80 leading-relaxed mb-6">
              All technical advice, planning guidance, and material specifications in this 
              journal are provided by our parent company.
            </p>
            <a 
              href="https://hampsteadrenovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-hampstead-white hover:text-hampstead-cream transition-colors font-medium"
            >
              Visit Hampstead Renovations
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Column 3: The Physical Anchor (The Hard Sell) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-grey/50 mb-3 block">
              Visit Us
            </span>
            <h3 className="font-serif text-xl mb-4 text-hampstead-cream">
              Visit the Material Library
            </h3>
            <p className="text-hampstead-grey/80 leading-relaxed mb-6">
              See the materials featured in these articles at our HQ.
            </p>
            
            {/* NAP - Name, Address, Phone (Critical for Local SEO) */}
            <address className="not-italic text-hampstead-grey/80 space-y-3">
              <p className="font-medium text-hampstead-white">
                Hampstead Renovations
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-hampstead-grey/60" />
                <span>
                  Unit 3, Palace Court<br />
                  250 Finchley Road<br />
                  London NW3 6DN
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-hampstead-grey/60" />
                <a 
                  href="tel:+442074319823" 
                  className="hover:text-hampstead-white transition-colors"
                >
                  020 7431 9823
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-hampstead-grey/60" />
                <a 
                  href="mailto:info@hampsteadrenovations.com" 
                  className="hover:text-hampstead-white transition-colors"
                >
                  info@hampsteadrenovations.com
                </a>
              </p>
            </address>
            
            <a 
              href="https://maps.google.com/?q=Unit+3+Palace+Court+250+Finchley+Road+London+NW3+6DN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-hampstead-grey/60 hover:text-hampstead-white transition-colors underline underline-offset-4"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-hampstead-grey/20">
        <div className="editorial-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-hampstead-grey/60">
            <p>
              &copy; {new Date().getFullYear()} The Hampstead Design Journal. 
              <span className="hidden sm:inline"> Curated by </span>
              <a 
                href="https://hampsteadrenovations.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hampstead-white transition-colors"
              >
                <span className="sm:hidden"> • </span>
                Hampstead Renovations
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-hampstead-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-hampstead-white transition-colors">
                Terms
              </Link>
              <Link href="/sitemap.xml" className="hover:text-hampstead-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;