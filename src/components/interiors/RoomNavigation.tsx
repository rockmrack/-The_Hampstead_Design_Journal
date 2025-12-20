import React from 'react';

const rooms = [
  { name: 'Kitchens', count: 12, color: 'bg-stone-200' },
  { name: 'Living Rooms', count: 18, color: 'bg-stone-300' },
  { name: 'Bathrooms', count: 8, color: 'bg-stone-200' },
  { name: 'Bedrooms', count: 10, color: 'bg-stone-300' },
  { name: 'Home Offices', count: 6, color: 'bg-stone-200' },
  { name: 'Gardens', count: 14, color: 'bg-stone-300' },
];

export default function RoomNavigation() {
  return (
    <section className="py-16 border-b border-hampstead-grey bg-white">
      <div className="editorial-container">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Browse by Room</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rooms.map((room) => (
            <div key={room.name} className="group cursor-pointer text-center">
              <div className={`aspect-square ${room.color} rounded-full mb-4 mx-auto w-full max-w-[120px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                 {/* Placeholder for icon */}
                 <span className="font-serif text-2xl text-hampstead-charcoal/40">{room.name.charAt(0)}</span>
              </div>
              <h3 className="font-medium text-hampstead-black mb-1">{room.name}</h3>
              <span className="text-xs text-hampstead-charcoal/50">{room.count} Articles</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
