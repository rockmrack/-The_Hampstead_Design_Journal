'use client';

import React, { useState } from 'react';

const checklistItems = [
  { id: 'plans', label: 'Existing & Proposed Floor Plans (1:50 or 1:100)', required: true },
  { id: 'elevations', label: 'Existing & Proposed Elevations (1:50 or 1:100)', required: true },
  { id: 'sections', label: 'Sections (if relevant, e.g., for basements)', required: false },
  { id: 'site-plan', label: 'Site Location Plan (1:1250) with red line boundary', required: true },
  { id: 'block-plan', label: 'Block Plan (1:500)', required: true },
  { id: 'das', label: 'Design & Access Statement', required: true },
  { id: 'heritage', label: 'Heritage Statement (for Conservation Areas/Listed Buildings)', required: true },
  { id: 'basement', label: 'Basement Impact Assessment (for excavations)', required: false },
  { id: 'trees', label: 'Arboricultural Impact Assessment (if trees affected)', required: false },
  { id: 'cil', label: 'CIL (Community Infrastructure Levy) Form', required: true },
];

export default function DocumentChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progress = Math.round((Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100);

  return (
    <section className="py-16 bg-hampstead-cream">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-4 block">
              Preparation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Application Checklist
            </h2>
            <p className="text-lg text-hampstead-charcoal/70 leading-relaxed mb-8">
              Ensure your application is valid from day one. Missing documents are the most common cause of delays.
            </p>
            
            <div className="bg-white p-6 border border-hampstead-grey/20">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium">Readiness</span>
                <span className="text-2xl font-serif text-hampstead-olive">{progress}%</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-hampstead-olive h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 border border-hampstead-grey/20 shadow-sm">
            <ul className="space-y-4">
              {checklistItems.map((item) => (
                <li key={item.id} className="flex items-start">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      checkedItems[item.id] 
                        ? 'bg-hampstead-olive border-hampstead-olive text-white' 
                        : 'border-hampstead-charcoal/30 hover:border-hampstead-olive'
                    }`}
                  >
                    {checkedItems[item.id] && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="ml-4">
                    <span className={`block text-lg ${checkedItems[item.id] ? 'text-hampstead-charcoal/50 line-through' : 'text-hampstead-black'}`}>
                      {item.label}
                    </span>
                    {item.required && (
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wider mt-1 block">
                        Required
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
