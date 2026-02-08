'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Home, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  Minus,
  Plus,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Renovation cost data (per sqm for NW3 area)
const renovationCosts = {
  basement: {
    name: 'Basement Extension',
    description: 'Full basement dig with waterproofing and finishing',
    basicCost: 3500,
    premiumCost: 5500,
    units: 'per sqm',
    notes: 'Includes structural work, waterproofing, M&E, and basic fit-out',
    planningRequired: true,
    typicalDuration: '9-14 months',
  },
  rearExtension: {
    name: 'Rear Extension',
    description: 'Single or double storey rear extension',
    basicCost: 2800,
    premiumCost: 4200,
    units: 'per sqm',
    notes: 'Ground floor with bi-fold doors and kitchen fit-out',
    planningRequired: 'often',
    typicalDuration: '4-6 months',
  },
  sideReturn: {
    name: 'Side Return Infill',
    description: 'Infill of side passage to extend kitchen',
    basicCost: 2500,
    premiumCost: 3800,
    units: 'per sqm',
    notes: 'Popular in Victorian terraces',
    planningRequired: 'usually not',
    typicalDuration: '3-4 months',
  },
  loftConversion: {
    name: 'Loft Conversion',
    description: 'Dormer or mansard loft conversion',
    basicCost: 2200,
    premiumCost: 3500,
    units: 'per sqm',
    notes: 'Includes bathroom and wardrobes',
    planningRequired: 'often',
    typicalDuration: '8-12 weeks',
  },
  kitchen: {
    name: 'Kitchen Renovation',
    description: 'Full kitchen remodel with new units and appliances',
    basicCost: 25000,
    premiumCost: 75000,
    units: 'per kitchen',
    notes: 'Price varies significantly with specification',
    planningRequired: false,
    typicalDuration: '4-8 weeks',
  },
  bathroom: {
    name: 'Bathroom Renovation',
    description: 'Full bathroom refit with new sanitaryware',
    basicCost: 12000,
    premiumCost: 35000,
    units: 'per bathroom',
    notes: 'Heritage properties may require specialist work',
    planningRequired: false,
    typicalDuration: '2-4 weeks',
  },
  rewire: {
    name: 'Full Rewire',
    description: 'Complete electrical rewire with consumer unit',
    basicCost: 80,
    premiumCost: 120,
    units: 'per sqm',
    notes: 'Listed building consent may be needed',
    planningRequired: 'for listed',
    typicalDuration: '1-2 weeks',
  },
  replumb: {
    name: 'Full Replumb',
    description: 'Complete plumbing replacement',
    basicCost: 60,
    premiumCost: 90,
    units: 'per sqm',
    notes: 'Including heating system where applicable',
    planningRequired: false,
    typicalDuration: '1-2 weeks',
  },
  windowReplacement: {
    name: 'Window Replacement',
    description: 'Timber sash window replacement',
    basicCost: 1800,
    premiumCost: 3500,
    units: 'per window',
    notes: 'Conservation area may require like-for-like',
    planningRequired: true,
    typicalDuration: '1 day per window',
  },
  periodRestoration: {
    name: 'Period Feature Restoration',
    description: 'Restore original cornices, architraves, fireplaces',
    basicCost: 15000,
    premiumCost: 45000,
    units: 'per room',
    notes: 'Can significantly add value in conservation areas',
    planningRequired: false,
    typicalDuration: '2-6 weeks',
  },
};

// ROI multipliers for NW3
const roiMultipliers = {
  basement: { min: 0.7, max: 1.1 },
  rearExtension: { min: 0.85, max: 1.2 },
  sideReturn: { min: 0.9, max: 1.15 },
  loftConversion: { min: 0.9, max: 1.3 },
  kitchen: { min: 0.7, max: 1.0 },
  bathroom: { min: 0.5, max: 0.8 },
  rewire: { min: 0.3, max: 0.5 },
  replumb: { min: 0.3, max: 0.5 },
  windowReplacement: { min: 0.6, max: 0.9 },
  periodRestoration: { min: 0.8, max: 1.4 },
};

type ProjectType = keyof typeof renovationCosts;

interface ProjectSelection {
  type: ProjectType;
  quantity: number;
  quality: 'basic' | 'premium';
}

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'cost' | 'roi' | 'planning'>('cost');
  const [selectedProjects, setSelectedProjects] = useState<ProjectSelection[]>([]);
  const [propertySize, setPropertySize] = useState(150);
  const [propertyValue, setPropertyValue] = useState(2500000);

  const addProject = (type: ProjectType) => {
    const existing = selectedProjects.find(p => p.type === type);
    if (!existing) {
      setSelectedProjects([...selectedProjects, { type, quantity: 20, quality: 'basic' }]);
    }
  };

  const removeProject = (type: ProjectType) => {
    setSelectedProjects(selectedProjects.filter(p => p.type !== type));
  };

  const updateProject = (type: ProjectType, updates: Partial<ProjectSelection>) => {
    setSelectedProjects(selectedProjects.map(p => 
      p.type === type ? { ...p, ...updates } : p
    ));
  };

  const calculateProjectCost = (project: ProjectSelection) => {
    const costs = renovationCosts[project.type];
    const baseCost = project.quality === 'basic' ? costs.basicCost : costs.premiumCost;
    
    if (costs.units === 'per sqm') {
      return baseCost * project.quantity;
    } else if (costs.units === 'per kitchen' || costs.units === 'per bathroom' || costs.units === 'per room') {
      return baseCost * project.quantity;
    } else if (costs.units === 'per window') {
      return baseCost * project.quantity;
    }
    return baseCost;
  };

  const totalCost = selectedProjects.reduce((sum, project) => sum + calculateProjectCost(project), 0);

  const calculateROI = (project: ProjectSelection) => {
    const cost = calculateProjectCost(project);
    const multiplier = roiMultipliers[project.type];
    const avgMultiplier = (multiplier.min + multiplier.max) / 2;
    return cost * avgMultiplier;
  };

  const totalAddedValue = selectedProjects.reduce((sum, project) => sum + calculateROI(project), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <main className="min-h-screen bg-hampstead-white">
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey">
        <div className="editorial-container py-12 md:py-16">
          <nav className="flex items-center text-sm text-hampstead-charcoal/60 mb-6">
            <Link href="/journal" className="hover:text-hampstead-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-hampstead-black">Calculators</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Renovation Calculators
            </h1>
            <p className="text-xl text-hampstead-charcoal/80 leading-relaxed">
              Estimate costs, calculate ROI, and plan your Hampstead renovation project 
              with our interactive tools based on current NW3 market data.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Tabs */}
      <section className="border-b border-hampstead-grey sticky top-0 bg-hampstead-white z-50">
        <div className="editorial-container">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('cost')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'cost' 
                  ? 'border-hampstead-black text-hampstead-black' 
                  : 'border-transparent text-hampstead-charcoal/60 hover:text-hampstead-black'
              }`}
            >
              <Calculator className="w-5 h-5" />
              Cost Estimator
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'roi' 
                  ? 'border-hampstead-black text-hampstead-black' 
                  : 'border-transparent text-hampstead-charcoal/60 hover:text-hampstead-black'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              ROI Calculator
            </button>
            <button
              onClick={() => setActiveTab('planning')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'planning' 
                  ? 'border-hampstead-black text-hampstead-black' 
                  : 'border-transparent text-hampstead-charcoal/60 hover:text-hampstead-black'
              }`}
            >
              <FileText className="w-5 h-5" />
              Planning Costs
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="section-spacing">
        <div className="editorial-container">
          <AnimatePresence mode="wait">
            {activeTab === 'cost' && (
              <motion.div
                key="cost"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Project Selection */}
                <div className="lg:col-span-2">
                  <h2 className="font-serif text-2xl mb-6">Select Your Projects</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(renovationCosts).map(([key, project]) => {
                      const isSelected = selectedProjects.some(p => p.type === key);
                      return (
                        <button
                          key={key}
                          onClick={() => isSelected ? removeProject(key as ProjectType) : addProject(key as ProjectType)}
                          className={`p-4 text-left border transition-all ${
                            isSelected 
                              ? 'border-hampstead-black bg-hampstead-cream' 
                              : 'border-hampstead-grey hover:border-hampstead-charcoal'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium mb-1">{project.name}</h3>
                              <p className="text-sm text-hampstead-charcoal/60">{project.description}</p>
                              <p className="text-sm font-medium mt-2">
                                {formatCurrency(project.basicCost)} - {formatCurrency(project.premiumCost)} {project.units}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Projects Config */}
                  {selectedProjects.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-serif text-xl mb-4">Configure Your Projects</h3>
                      <div className="space-y-4">
                        {selectedProjects.map(project => {
                          const projectData = renovationCosts[project.type];
                          const showQuantity = projectData.units !== 'per kitchen' && projectData.units !== 'per bathroom';
                          
                          return (
                            <div key={project.type} className="p-4 bg-hampstead-cream border border-hampstead-grey">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="font-medium">{projectData.name}</h4>
                                  <p className="text-xs text-hampstead-charcoal/50">{projectData.notes}</p>
                                </div>
                                <button
                                  onClick={() => removeProject(project.type)}
                                  className="text-hampstead-charcoal/40 hover:text-red-600 transition-colors"
                                >
                                  <Minus className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Quantity */}
                                {showQuantity && (
                                  <div>
                                    <label className="text-xs font-medium text-hampstead-charcoal/70 block mb-2">
                                      {projectData.units === 'per sqm' ? 'Size (sqm)' : 'Quantity'}
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => updateProject(project.type, { quantity: Math.max(1, project.quantity - 5) })}
                                        className="p-2 border border-hampstead-grey hover:bg-hampstead-grey/30 transition-colors"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <input
                                        type="number"
                                        value={project.quantity}
                                        onChange={(e) => updateProject(project.type, { quantity: parseInt(e.target.value) || 1 })}
                                        className="w-20 text-center border border-hampstead-grey px-3 py-2"
                                      />
                                      <button
                                        onClick={() => updateProject(project.type, { quantity: project.quantity + 5 })}
                                        className="p-2 border border-hampstead-grey hover:bg-hampstead-grey/30 transition-colors"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Quality */}
                                <div>
                                  <label className="text-xs font-medium text-hampstead-charcoal/70 block mb-2">
                                    Specification
                                  </label>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateProject(project.type, { quality: 'basic' })}
                                      className={`flex-1 px-4 py-2 text-sm border transition-colors ${
                                        project.quality === 'basic'
                                          ? 'border-hampstead-black bg-hampstead-black text-white'
                                          : 'border-hampstead-grey hover:border-hampstead-charcoal'
                                      }`}
                                    >
                                      Standard
                                    </button>
                                    <button
                                      onClick={() => updateProject(project.type, { quality: 'premium' })}
                                      className={`flex-1 px-4 py-2 text-sm border transition-colors ${
                                        project.quality === 'premium'
                                          ? 'border-hampstead-black bg-hampstead-black text-white'
                                          : 'border-hampstead-grey hover:border-hampstead-charcoal'
                                      }`}
                                    >
                                      Premium
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Project Cost */}
                              <div className="mt-4 pt-4 border-t border-hampstead-grey flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-hampstead-charcoal/60">
                                  {projectData.planningRequired === true && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800">
                                      <AlertTriangle className="w-3 h-3" />
                                      Planning required
                                    </span>
                                  )}
                                  {projectData.planningRequired === 'often' && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700">
                                      <Info className="w-3 h-3" />
                                      Planning often required
                                    </span>
                                  )}
                                  <span>{projectData.typicalDuration}</span>
                                </div>
                                <span className="font-medium text-lg">
                                  {formatCurrency(calculateProjectCost(project))}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 p-6 bg-hampstead-cream border border-hampstead-grey">
                    <h3 className="font-serif text-xl mb-6">Cost Summary</h3>

                    {selectedProjects.length === 0 ? (
                      <p className="text-sm text-hampstead-charcoal/60">
                        Select projects from the list to begin your estimate.
                      </p>
                    ) : (
                      <>
                        <div className="space-y-3 mb-6">
                          {selectedProjects.map(project => (
                            <div key={project.type} className="flex justify-between text-sm">
                              <span>{renovationCosts[project.type].name}</span>
                              <span className="font-medium">{formatCurrency(calculateProjectCost(project))}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-hampstead-grey">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-hampstead-charcoal/60">Subtotal</span>
                            <span className="font-medium">{formatCurrency(totalCost)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-hampstead-charcoal/60">Contingency (15%)</span>
                            <span className="font-medium">{formatCurrency(totalCost * 0.15)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-hampstead-charcoal/60">Professional fees (12%)</span>
                            <span className="font-medium">{formatCurrency(totalCost * 0.12)}</span>
                          </div>
                          <div className="flex justify-between pt-4 border-t border-hampstead-grey">
                            <span className="font-medium">Estimated Total</span>
                            <span className="font-serif text-2xl">{formatCurrency(totalCost * 1.27)}</span>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-white border border-hampstead-grey text-xs text-hampstead-charcoal/70">
                          <p className="flex items-start gap-2">
                            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            Estimates based on current NW3 market rates (Q4 2024). Actual costs may vary based on property condition, access, and specification.
                          </p>
                        </div>

                        <Link
                          href="/journal/contact?subject=renovation-quote"
                          className="block text-center w-full mt-6 px-6 py-3 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
                        >
                          Get Detailed Quote
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'roi' && (
              <motion.div
                key="roi"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl"
              >
                <h2 className="font-serif text-2xl mb-6">Return on Investment Calculator</h2>
                
                <p className="text-hampstead-charcoal/70 mb-8">
                  Calculate how different renovation projects could impact your property value 
                  in the Hampstead market. ROI estimates are based on recent comparable sales data.
                </p>

                {/* Property Value Input */}
                <div className="p-6 bg-hampstead-cream border border-hampstead-grey mb-8">
                  <label className="text-sm font-medium block mb-4">
                    Current Property Value
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="100000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="font-serif text-2xl w-40 text-right">
                      {formatCurrency(propertyValue)}
                    </span>
                  </div>
                </div>

                {/* ROI Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hampstead-grey">
                        <th className="text-left py-3 text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50">
                          Project
                        </th>
                        <th className="text-right py-3 text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50">
                          Typical Cost
                        </th>
                        <th className="text-right py-3 text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50">
                          Value Added
                        </th>
                        <th className="text-right py-3 text-xs font-bold uppercase tracking-widest text-hampstead-charcoal/50">
                          ROI Range
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(renovationCosts).map(([key, project]) => {
                        const roi = roiMultipliers[key as ProjectType];
                        const avgCost = (project.basicCost + project.premiumCost) / 2;
                        const multiplier = project.units === 'per sqm' ? 30 : project.units === 'per window' ? 8 : 1;
                        const typicalCost = avgCost * multiplier;
                        
                        return (
                          <tr key={key} className="border-b border-hampstead-grey/50">
                            <td className="py-4">
                              <span className="font-medium">{project.name}</span>
                              <span className="block text-xs text-hampstead-charcoal/50">{project.typicalDuration}</span>
                            </td>
                            <td className="py-4 text-right">
                              {formatCurrency(typicalCost)}
                            </td>
                            <td className="py-4 text-right">
                              {formatCurrency(typicalCost * (roi.min + roi.max) / 2)}
                            </td>
                            <td className="py-4 text-right">
                              <span className={`px-2 py-1 text-sm ${
                                roi.max >= 1 
                                  ? 'bg-green-100 text-green-800' 
                                  : roi.max >= 0.7 
                                    ? 'bg-amber-100 text-amber-800' 
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                {Math.round(roi.min * 100)}% - {Math.round(roi.max * 100)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">Maximising ROI in Hampstead</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      Period feature restoration consistently delivers the highest ROI in conservation areas
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      Loft conversions offer excellent value when they add a bedroom with ensuite
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      Basements can exceed 100% ROI when they add significant usable space
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'planning' && (
              <motion.div
                key="planning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl"
              >
                <h2 className="font-serif text-2xl mb-6">Planning Application Costs</h2>
                
                <p className="text-hampstead-charcoal/70 mb-8">
                  Understand the full cost of planning applications in Camden, including 
                  fees, professional services, and typical timescales.
                </p>

                <div className="space-y-6">
                  {/* Camden Fees */}
                  <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
                    <h3 className="font-medium mb-4">Camden Council Fees (2024)</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Householder application (extension, alteration)</span>
                        <span className="font-medium">£258</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Listed Building Consent (no charge but requires supporting docs)</span>
                        <span className="font-medium">£0</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Conservation Area Consent</span>
                        <span className="font-medium">£258</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Full Planning (new dwelling)</span>
                        <span className="font-medium">£578</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Certificate of Lawful Development</span>
                        <span className="font-medium">£129</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Pre-application advice (householder)</span>
                        <span className="font-medium">£350 - £700</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Fees */}
                  <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
                    <h3 className="font-medium mb-4">Professional Fees (Typical)</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Architect drawings (householder)</span>
                        <span className="font-medium">£2,000 - £5,000</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Planning consultant</span>
                        <span className="font-medium">£1,500 - £3,500</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Heritage statement</span>
                        <span className="font-medium">£800 - £2,000</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Design & Access statement</span>
                        <span className="font-medium">£500 - £1,500</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Structural engineer report</span>
                        <span className="font-medium">£500 - £1,200</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Party Wall surveyor (per wall)</span>
                        <span className="font-medium">£1,200 - £2,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Timescales */}
                  <div className="p-6 bg-hampstead-cream border border-hampstead-grey">
                    <h3 className="font-medium mb-4">Typical Timescales</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Householder application</span>
                        <span className="font-medium">8 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Listed Building Consent</span>
                        <span className="font-medium">8-13 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Full planning application</span>
                        <span className="font-medium">8-13 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-hampstead-grey/50">
                        <span>Pre-application advice response</span>
                        <span className="font-medium">4-6 weeks</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Certificate of Lawful Development</span>
                        <span className="font-medium">8 weeks</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-sm text-amber-900">
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Note:</strong> Properties in Article 4 areas (most of Hampstead) 
                        require planning permission for many works that would normally be permitted development. 
                        Always check before starting work.
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-hampstead-cream border-t border-hampstead-grey">
        <div className="editorial-container text-center">
          <h2 className="font-serif text-3xl mb-4">Need a Professional Assessment?</h2>
          <p className="text-hampstead-charcoal/70 mb-8 max-w-2xl mx-auto">
            Our estimates provide a starting point, but every property is unique. 
            Book a consultation for a detailed quote tailored to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/journal/contact?subject=renovation-consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-hampstead-black text-white hover:bg-hampstead-charcoal transition-colors"
            >
              <Home className="w-5 h-5" />
              Book Site Visit
            </Link>
            <Link
              href="/journal/planning-map"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-hampstead-grey bg-white text-hampstead-charcoal hover:bg-hampstead-cream transition-colors"
            >
              View Planning Map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
