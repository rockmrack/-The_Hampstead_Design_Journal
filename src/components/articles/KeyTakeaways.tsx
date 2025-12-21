import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface KeyTakeawaysProps {
  points: string[];
  title?: string;
}

export default function KeyTakeaways({ points, title = "Key Takeaways" }: KeyTakeawaysProps) {
  return (
    <div className="bg-hampstead-cream border border-hampstead-grey p-8 my-12 not-prose">
      <h3 className="font-serif text-xl mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-hampstead-black block" />
        {title}
      </h3>
      <ul className="space-y-4">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3 text-hampstead-charcoal">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-hampstead-black/60" />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
