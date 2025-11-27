'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  MapPin, 
  Info, 
  Layers, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Building2,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for Leaflet (SSR issues)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polygon),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Conservation Areas with approximate boundaries
const conservationAreas = [
  {
    id: 'hampstead',
    name: 'Hampstead Conservation Area',
    color: '#2563eb',
    article4: true,
    designation: '1967 (extended 1975, 1986)',
    character: 'Historic village centre with Georgian, Victorian, and Edwardian buildings',
    restrictions: [
      'No changes to front elevations without consent',
      'No satellite dishes visible from public highway',
      'No replacement windows without matching design',
      'Tree works require 6-week notice'
    ],
    coordinates: [
      [51.5580, -0.1780],
      [51.5620, -0.1750],
      [51.5650, -0.1700],
      [51.5640, -0.1620],
      [51.5600, -0.1580],
      [51.5560, -0.1620],
      [51.5540, -0.1700],
      [51.5550, -0.1760],
    ],
    streets: ['Church Row', 'Well Walk', 'Flask Walk', 'Heath Street', 'Holly Walk'],
    planningSuccessRate: 72,
  },
  {
    id: 'redington-frognal',
    name: 'Redington Frognal Conservation Area',
    color: '#dc2626',
    article4: true,
    designation: '1973',
    character: 'Large Arts & Crafts and Edwardian houses in spacious grounds',
    restrictions: [
      'Strict controls on extensions and roof alterations',
      'No subdivision of properties without consent',
      'Original windows must be retained',
      'Front garden boundary walls protected'
    ],
    coordinates: [
      [51.5550, -0.1850],
      [51.5590, -0.1820],
      [51.5610, -0.1780],
      [51.5590, -0.1720],
      [51.5550, -0.1740],
      [51.5520, -0.1800],
    ],
    streets: ['Redington Road', 'Frognal', 'Frognal Lane', 'Oak Hill Way', 'Templewood Avenue'],
    planningSuccessRate: 65,
  },
  {
    id: 'belsize',
    name: 'Belsize Conservation Area',
    color: '#16a34a',
    article4: true,
    designation: '1974',
    character: 'Victorian stucco villas and terraces in Italianate style',
    restrictions: [
      'Stucco facades must be maintained in matching lime render',
      'No painting of natural brick or stonework',
      'Original railings and gates protected',
      'Basement extensions require Heritage Impact Assessment'
    ],
    coordinates: [
      [51.5480, -0.1680],
      [51.5520, -0.1650],
      [51.5540, -0.1600],
      [51.5520, -0.1550],
      [51.5480, -0.1560],
      [51.5450, -0.1620],
    ],
    streets: ['Belsize Park', 'Belsize Square', 'Belsize Park Gardens', 'Eton Avenue', 'Adamson Road'],
    planningSuccessRate: 68,
  },
  {
    id: 'hampstead-garden-suburb',
    name: 'Hampstead Garden Suburb',
    color: '#9333ea',
    article4: true,
    designation: '1968 (Article 4 since 1971)',
    character: 'Planned Garden City development with unified architectural character',
    restrictions: [
      'Strictest Article 4 Direction in London',
      'No alterations to external appearance without consent',
      'Paint colours must be approved',
      'Satellite dishes and solar panels require consent',
      'Hedge heights regulated'
    ],
    coordinates: [
      [51.5750, -0.1850],
      [51.5800, -0.1780],
      [51.5820, -0.1680],
      [51.5780, -0.1600],
      [51.5720, -0.1650],
      [51.5700, -0.1780],
    ],
    streets: ['Meadway', 'Hampstead Way', 'Heathgate', 'Wildwood Road'],
    planningSuccessRate: 58,
  },
  {
    id: 'fitzjohns-netherhall',
    name: 'Fitzjohns/Netherhall Conservation Area',
    color: '#ea580c',
    article4: true,
    designation: '1982',
    character: 'High Victorian villas with Gothic and Queen Anne influences',
    restrictions: [
      'Original architectural features must be retained',
      'Extensions must be subordinate to main building',
      'Materials must match existing',
      'Front gardens cannot be paved for parking'
    ],
    coordinates: [
      [51.5480, -0.1780],
      [51.5520, -0.1750],
      [51.5540, -0.1700],
      [51.5520, -0.1650],
      [51.5480, -0.1670],
      [51.5450, -0.1720],
    ],
    streets: ['Fitzjohns Avenue', 'Netherhall Gardens', 'Maresfield Gardens', 'Arkwright Road'],
    planningSuccessRate: 70,
  },
  {
    id: 'south-hill-park',
    name: 'South Hill Park Conservation Area',
    color: '#0891b2',
    article4: false,
    designation: '1980',
    character: 'Mixed character including important Modern Movement buildings',
    restrictions: [
      'Modern Movement buildings have enhanced protection',
      'Setting of listed buildings is key consideration',
      'Extensions assessed for impact on neighbours'
    ],
    coordinates: [
      [51.5520, -0.1620],
      [51.5550, -0.1580],
      [51.5560, -0.1520],
      [51.5530, -0.1480],
      [51.5500, -0.1530],
      [51.5490, -0.1590],
    ],
    streets: ['South Hill Park', 'Willow Road', 'Lawn Road'],
    planningSuccessRate: 75,
  },
  {
    id: 'kenwood',
    name: 'Kenwood Conservation Area',
    color: '#be185d',
    article4: true,
    designation: '1978',
    character: 'Large mansions in parkland setting adjacent to Kenwood House',
    restrictions: [
      'Impact on Kenwood House setting is primary consideration',
      'Large trees have blanket TPO protection',
      'New buildings generally not permitted',
      'Extensions must not be visible from Kenwood'
    ],
    coordinates: [
      [51.5700, -0.1680],
      [51.5750, -0.1620],
      [51.5740, -0.1550],
      [51.5700, -0.1520],
      [51.5660, -0.1580],
      [51.5670, -0.1660],
    ],
    streets: ['The Bishops Avenue', 'Winnington Road'],
    planningSuccessRate: 55,
  },
];

// Planning application markers (sample data)
const planningApplications = [
  {
    id: 1,
    address: '42 Redington Road, NW3',
    type: 'Basement Extension',
    status: 'approved',
    date: '2024-09',
    reference: '2024/1234/HSE',
    position: [51.5570, -0.1790],
  },
  {
    id: 2,
    address: '15 Church Row, NW3',
    type: 'Listed Building Consent',
    status: 'approved',
    date: '2024-08',
    reference: '2024/1156/LBC',
    position: [51.5590, -0.1720],
  },
  {
    id: 3,
    address: '8 Belsize Square, NW3',
    type: 'Rear Extension',
    status: 'refused',
    date: '2024-10',
    reference: '2024/1456/HSE',
    position: [51.5500, -0.1620],
  },
  {
    id: 4,
    address: '28 Fitzjohns Avenue, NW3',
    type: 'Loft Conversion',
    status: 'approved',
    date: '2024-07',
    reference: '2024/0987/HSE',
    position: [51.5510, -0.1750],
  },
  {
    id: 5,
    address: '5 Meadway, NW11',
    type: 'Window Replacement',
    status: 'refused',
    date: '2024-09',
    reference: '2024/1345/HSE',
    position: [51.5780, -0.1750],
  },
];

type LayerType = 'conservation' | 'applications' | 'article4';

export default function PlanningMapPage() {
  const [selectedArea, setSelectedArea] = useState<typeof conservationAreas[0] | null>(null);
  const [activeLayers, setActiveLayers] = useState<LayerType[]>(['conservation', 'article4']);
  const [showPanel, setShowPanel] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const toggleLayer = useCallback((layer: LayerType) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  }, []);

  const handleAreaClick = useCallback((area: typeof conservationAreas[0]) => {
    setSelectedArea(area);
    setShowPanel(true);
  }, []);

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/archive" className="hover:text-hampstead-black transition-colors">Archive</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Planning Map</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Interactive NW3 Planning Map
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Explore conservation areas, Article 4 directions, and planning application 
              patterns across North West London. Click any area to view restrictions and guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative">
        <div className="h-[70vh] md:h-[80vh] relative">
          {/* Layer Controls */}
          <div className="absolute top-4 left-4 z-[1000] bg-white border border-hampstead-grey shadow-lg p-4">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Map Layers
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.includes('conservation')}
                  onChange={() => toggleLayer('conservation')}
                  className="w-4 h-4 rounded border-hampstead-grey"
                />
                <span className="text-sm">Conservation Areas</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.includes('article4')}
                  onChange={() => toggleLayer('article4')}
                  className="w-4 h-4 rounded border-hampstead-grey"
                />
                <span className="text-sm">Article 4 Zones</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.includes('applications')}
                  onChange={() => toggleLayer('applications')}
                  className="w-4 h-4 rounded border-hampstead-grey"
                />
                <span className="text-sm">Recent Applications</span>
              </label>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white border border-hampstead-grey shadow-lg p-4 max-w-xs">
            <h3 className="font-medium text-sm mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {conservationAreas.map(area => (
                <div key={area.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: area.color, opacity: 0.6 }}
                  />
                  <span className="truncate">{area.name.replace(' Conservation Area', '')}</span>
                </div>
              ))}
            </div>
            {activeLayers.includes('applications') && (
              <div className="mt-3 pt-3 border-t border-hampstead-grey">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <X className="w-3 h-3 text-red-600" />
                    <span>Refused</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-full w-full" id="map-container">
            {typeof window !== 'undefined' && (
              <MapContainer
                center={[51.5580, -0.1700]}
                zoom={14}
                className="h-full w-full"
                whenReady={() => setMapReady(true)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Conservation Areas */}
                {activeLayers.includes('conservation') && conservationAreas.map(area => (
                  <Polygon
                    key={area.id}
                    positions={area.coordinates as [number, number][]}
                    pathOptions={{
                      color: area.color,
                      fillColor: area.color,
                      fillOpacity: 0.3,
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => handleAreaClick(area),
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <strong>{area.name}</strong>
                        <br />
                        Click for details
                      </div>
                    </Popup>
                  </Polygon>
                ))}

                {/* Article 4 Overlay */}
                {activeLayers.includes('article4') && conservationAreas
                  .filter(area => area.article4)
                  .map(area => (
                    <Polygon
                      key={`article4-${area.id}`}
                      positions={area.coordinates as [number, number][]}
                      pathOptions={{
                        color: '#000',
                        fillColor: 'transparent',
                        fillOpacity: 0,
                        weight: 3,
                        dashArray: '5, 5',
                      }}
                    />
                  ))}

                {/* Planning Applications */}
                {activeLayers.includes('applications') && mapReady && planningApplications.map(app => (
                  <Marker
                    key={app.id}
                    position={app.position as [number, number]}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          {app.status === 'approved' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                          <span className={app.status === 'approved' ? 'text-green-700' : 'text-red-700'}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                        <strong>{app.address}</strong>
                        <br />
                        {app.type}
                        <br />
                        <span className="text-xs text-gray-500">Ref: {app.reference}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {selectedArea && showPanel && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-full md:w-[400px] bg-white border-l border-hampstead-grey shadow-2xl z-[1000] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div 
                        className="w-4 h-4 rounded-sm mb-2"
                        style={{ backgroundColor: selectedArea.color }}
                      />
                      <h2 className="font-serif text-2xl">{selectedArea.name}</h2>
                    </div>
                    <button
                      onClick={() => setShowPanel(false)}
                      className="p-2 hover:bg-hampstead-grey/20 rounded transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Designation */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2">
                        Designation
                      </h3>
                      <p className="text-sm">{selectedArea.designation}</p>
                    </div>

                    {/* Character */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2">
                        Character
                      </h3>
                      <p className="text-sm text-hampstead-charcoal/80">{selectedArea.character}</p>
                    </div>

                    {/* Article 4 Status */}
                    <div className={`p-4 rounded ${selectedArea.article4 ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {selectedArea.article4 ? (
                          <AlertTriangle className="w-5 h-5 text-amber-700" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-700" />
                        )}
                        <h3 className={`font-medium ${selectedArea.article4 ? 'text-amber-900' : 'text-green-900'}`}>
                          Article 4 Direction
                        </h3>
                      </div>
                      <p className={`text-sm ${selectedArea.article4 ? 'text-amber-800' : 'text-green-800'}`}>
                        {selectedArea.article4 
                          ? 'This area has an Article 4 Direction removing permitted development rights. Most external alterations require planning permission.'
                          : 'No Article 4 Direction. Standard permitted development rights apply, subject to conservation area constraints.'}
                      </p>
                    </div>

                    {/* Planning Success Rate */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-2">
                        Planning Success Rate (2024)
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-hampstead-grey/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-hampstead-black rounded-full transition-all"
                            style={{ width: `${selectedArea.planningSuccessRate}%` }}
                          />
                        </div>
                        <span className="font-medium text-lg">{selectedArea.planningSuccessRate}%</span>
                      </div>
                      <p className="text-xs text-hampstead-charcoal/50 mt-1">
                        Based on householder applications in this area
                      </p>
                    </div>

                    {/* Restrictions */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                        Key Restrictions
                      </h3>
                      <ul className="space-y-2">
                        {selectedArea.restrictions.map((restriction, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{restriction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notable Streets */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50 mb-3">
                        Notable Streets
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedArea.streets.map((street) => (
                          <Link
                            key={street}
                            href={`/archive/${street.toLowerCase().replace(/\s+/g, '-')}`}
                            className="px-3 py-1 bg-hampstead-cream text-sm hover:bg-hampstead-grey/30 transition-colors"
                          >
                            {street}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-hampstead-grey">
                      <Link
                        href="/contact?subject=planning-advice"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Get Planning Advice
                      </Link>
                      <a
                        href="https://www.camden.gov.uk/planning"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full mt-3 px-6 py-3 border border-hampstead-grey text-hampstead-charcoal hover:bg-hampstead-cream transition-colors"
                      >
                        Camden Planning Portal
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-spacing">
        <div className="editorial-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
              <Building2 className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-3">Conservation Areas</h3>
              <p className="text-sm text-hampstead-charcoal/70 mb-4">
                NW3 contains 7 distinct conservation areas, each with unique character 
                and planning considerations. Development must preserve or enhance this character.
              </p>
              <Link href="/archive#conservation" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Learn more <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
              <AlertTriangle className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-3">Article 4 Directions</h3>
              <p className="text-sm text-hampstead-charcoal/70 mb-4">
                Article 4 Directions remove permitted development rights. In these areas, 
                even minor changes to windows, doors, and boundaries require planning consent.
              </p>
              <Link href="/articles/article-4-directions-hampstead" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Understand Article 4 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
              <FileText className="w-8 h-8 text-hampstead-charcoal/30 mb-4" />
              <h3 className="font-serif text-xl mb-3">Pre-Application Advice</h3>
              <p className="text-sm text-hampstead-charcoal/70 mb-4">
                Before submitting a planning application in a conservation area, 
                pre-application advice from Camden is strongly recommended.
              </p>
              <Link href="/contact?subject=planning" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Book consultation <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
