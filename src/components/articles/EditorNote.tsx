import Link from 'next/link';

export default function EditorNote() {
  return (
    <aside className="my-16 border border-hampstead-grey bg-hampstead-cream p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl mb-4 font-serif">About the Author</h3>
        <div className="editorial-divider" />
        <p className="text-base md:text-lg leading-loose mb-6">
          <em>The Hampstead Design Journal</em> is curated by the team at{' '}
          <strong>Hampstead Renovations</strong>.
        </p>
        <p className="text-base md:text-lg leading-loose mb-8">
          Based at 250 Finchley Road, we have been the custodians of North West London's
          finest homes since 2009.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="https://hampsteadrenovations.co.uk/consultation"
            className="inline-block px-8 py-3 bg-hampstead-black text-hampstead-white no-underline hover:bg-hampstead-charcoal transition-colors"
          >
            Book a Consultation
          </Link>
          <Link
            href="https://hampsteadrenovations.co.uk/app"
            className="inline-block px-8 py-3 border border-hampstead-black text-hampstead-black no-underline hover:bg-hampstead-cream transition-colors"
          >
            Download our App
          </Link>
        </div>
      </div>
    </aside>
  );
}
