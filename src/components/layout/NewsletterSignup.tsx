'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Welcome to the journal. Please check your inbox.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-hampstead-cream border-y border-hampstead-grey overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[100px] border-hampstead-charcoal" />
      </div>

      <div className="editorial-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/60 mb-4 block">
              The Dispatch
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Join Our Community
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-hampstead-charcoal/80 mb-10">
              Join 5,000+ local residents receiving our monthly curation of design insights, 
              planning updates, and market analysis.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto relative"
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === 'loading' || status === 'success'}
                className={cn(
                  "w-full px-6 py-4 bg-hampstead-white border text-base focus:outline-none transition-all placeholder:text-hampstead-charcoal/40",
                  status === 'error' 
                    ? "border-red-300 focus:border-red-500" 
                    : "border-hampstead-charcoal/20 focus:border-hampstead-black"
                )}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-2 bottom-2 px-6 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="uppercase tracking-widest text-xs font-medium">Subscribe</span>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-center justify-center text-green-800 bg-green-50 py-2 px-4 rounded-sm border border-green-100"
                >
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-center justify-center text-red-800 bg-red-50 py-2 px-4 rounded-sm border border-red-100"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-xs text-hampstead-charcoal/40 uppercase tracking-wide">
              No spam. Unsubscribe at any time.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
