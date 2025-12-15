interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export default function PullQuote({ children, author, role }: PullQuoteProps) {
  return (
    <figure className="my-12 py-8 border-t border-b border-hampstead-grey">
      <blockquote className="font-serif text-2xl md:text-3xl text-center leading-relaxed text-hampstead-charcoal italic">
        &ldquo;{children}&rdquo;
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-6 text-center">
          {author && <span className="font-medium text-hampstead-black">{author}</span>}
          {author && role && <span className="text-hampstead-charcoal/60"> — </span>}
          {role && <span className="text-hampstead-charcoal/60">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
