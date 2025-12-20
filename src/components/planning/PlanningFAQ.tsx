'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Do I need planning permission for a basement?',
    answer: 'In almost all cases in Camden, yes. You will need to submit a full planning application accompanied by a Basement Impact Assessment (BIA). Camden has very strict policies (CPG4) regarding basement excavation to protect structural stability and hydrology.'
  },
  {
    question: 'What is the "Article 4 Direction"?',
    answer: 'An Article 4 Direction removes permitted development rights. In Hampstead Conservation Areas, this often means you need planning permission for minor changes like replacing windows, painting brickwork, or altering front gates, which would normally be allowed without it.'
  },
  {
    question: 'How long does planning permission last?',
    answer: 'Standard planning permission usually lasts for 3 years. You must begin the work within this timeframe, or the permission will expire and you will need to re-apply.'
  },
  {
    question: 'Can I replace my timber sash windows with double glazing?',
    answer: 'In a Conservation Area, replacements must usually match the original materials and design exactly. Slim-profile double glazing in timber frames is often accepted, but uPVC is almost universally rejected. Listed buildings have even stricter rules.'
  },
  {
    question: 'What happens if I build without permission?',
    answer: 'Camden Council can issue an Enforcement Notice requiring you to demolish the work and restore the property to its original state. It is a criminal offence to disobey an enforcement notice or to alter a Listed Building without consent.'
  }
];

export default function PlanningFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white">
      <div className="editorial-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-hampstead-grey/30 pb-4">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
                >
                  <span className="font-serif text-xl text-hampstead-black group-hover:text-hampstead-olive transition-colors">
                    {faq.question}
                  </span>
                  <span className="ml-4 text-2xl font-light text-hampstead-olive">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-lg text-hampstead-charcoal/80 leading-relaxed pb-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
