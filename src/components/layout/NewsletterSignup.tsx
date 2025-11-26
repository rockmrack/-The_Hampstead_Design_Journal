'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
    // For now, this is a placeholder
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-hampstead-cream border-y border-hampstead-grey">
      <div className="editorial-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            The Monthly Dispatch
          </h2>
          <div className="editorial-divider" />
          <p className="text-lg md:text-xl leading-loose text-hampstead-charcoal mb-8">
            Join 5,000 local residents receiving our monthly design insights, 
            planning updates, and market analysis direct to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-3 border border-hampstead-charcoal text-base focus:outline-none focus:border-hampstead-black disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'success' && (
              <p className="mt-4 text-sm text-green-700">{message}</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-700">{message}</p>
            )}

            <p className="mt-4 text-xs text-hampstead-charcoal">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
