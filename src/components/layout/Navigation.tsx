'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/categories/heritage-architecture', label: 'Heritage' },
    { href: '/categories/planning-regulations', label: 'Planning' },
    { href: '/categories/interiors-materials', label: 'Interiors' },
    { href: '/categories/market-watch', label: 'Market Watch' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-hampstead-cream/95 backdrop-blur-sm border-hampstead-grey py-3'
            : 'bg-hampstead-cream border-transparent py-6'
        )}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 -ml-2 text-hampstead-black hover:text-hampstead-charcoal transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="font-serif text-2xl md:text-3xl tracking-tight group-hover:opacity-80 transition-opacity">
              The Hampstead Design Journal
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm uppercase tracking-widest hover:text-hampstead-charcoal transition-colors border-b-2 border-transparent pb-1',
                  pathname === link.href
                    ? 'border-hampstead-black'
                    : 'hover:border-hampstead-grey'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-hampstead-black hover:text-hampstead-charcoal transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/subscribe"
              className="hidden md:inline-block px-5 py-2 bg-hampstead-black text-hampstead-white text-sm uppercase tracking-wide hover:bg-hampstead-charcoal transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-hampstead-cream z-50 lg:hidden border-r border-hampstead-grey shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                  <span className="font-serif text-xl">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 text-hampstead-black hover:text-hampstead-charcoal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6 mb-12">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-serif text-2xl text-hampstead-black hover:text-hampstead-charcoal transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-hampstead-grey my-4" />
                  <Link href="/about" className="text-lg text-hampstead-charcoal">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg text-hampstead-charcoal">
                    Contact
                  </Link>
                </nav>

                <div className="mt-auto">
                  <div className="flex space-x-6 mb-8">
                    <a href="#" className="text-hampstead-charcoal hover:text-hampstead-black">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-hampstead-charcoal hover:text-hampstead-black">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-xs text-hampstead-charcoal/60">
                    &copy; {new Date().getFullYear()} The Hampstead Design Journal
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;