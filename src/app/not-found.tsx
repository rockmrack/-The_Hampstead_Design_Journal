import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="editorial-container text-center">
        <span className="text-9xl font-serif text-hampstead-grey/50 block mb-4">404</span>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Page Not Found</h1>
        <p className="text-xl text-hampstead-charcoal/70 mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/journal"
            className="px-8 py-4 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors uppercase tracking-widest text-sm"
          >
            Return Home
          </Link>
          <Link
            href="/journal/articles"
            className="px-8 py-4 border border-hampstead-black text-hampstead-black hover:bg-hampstead-black hover:text-hampstead-white transition-colors uppercase tracking-widest text-sm"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
