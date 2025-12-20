import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Pre-Application',
    description: 'Consult with architects and get initial advice from Camden Council.',
    duration: '2-4 Weeks'
  },
  {
    step: 2,
    title: 'Submission',
    description: 'Submit full plans, Design & Access Statement, and fee.',
    duration: '1 Day'
  },
  {
    step: 3,
    title: 'Validation',
    description: 'Council checks if the application is complete and valid.',
    duration: '1-2 Weeks'
  },
  {
    step: 4,
    title: 'Consultation',
    description: 'Neighbors and statutory bodies are invited to comment.',
    duration: '3 Weeks'
  },
  {
    step: 5,
    title: 'Assessment',
    description: 'Planning officer visits site and writes report.',
    duration: '4-6 Weeks'
  },
  {
    step: 6,
    title: 'Decision',
    description: 'Permission granted (possibly with conditions) or refused.',
    duration: 'Target: 8 Weeks'
  }
];

export default function ProcessTimeline() {
  return (
    <section className="py-16 bg-white border-b border-hampstead-grey">
      <div className="editorial-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
            The Roadmap
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            The Planning Process
          </h2>
          <p className="text-lg text-hampstead-charcoal/70">
            A typical timeline for a householder planning application in Camden.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-hampstead-grey md:-ml-px" />

          <div className="space-y-12">
            {steps.map((item, index) => (
              <div key={item.step} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-[45%] p-6 bg-hampstead-cream border border-hampstead-grey/20 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl">{item.title}</h3>
                    <span className="text-xs font-bold bg-hampstead-black text-white px-2 py-1 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-sm text-hampstead-charcoal/80">
                    {item.description}
                  </p>
                </div>

                {/* Marker */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white border-2 border-hampstead-olive rounded-full flex items-center justify-center z-10 md:-ml-4">
                  <span className="text-xs font-bold text-hampstead-olive">{item.step}</span>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
