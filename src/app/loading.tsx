export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-hampstead-grey border-t-hampstead-black rounded-full animate-spin mb-6" />
        <p className="text-hampstead-charcoal/60 uppercase tracking-widest text-sm">Loading...</p>
      </div>
    </div>
  );
}
