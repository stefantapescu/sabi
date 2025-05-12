'use client';

import React, { useState, useMemo } from 'react'; // Added useMemo
import SolutionCard, { type Solution } from './SolutionCard';

interface SolutionComparatorClientProps {
  initialSolutions: Solution[];
}

// Hardcoded filter options (can be replaced by dynamic derivation)
// TODO: Ideally, fetch distinct values from the database or derive all dynamically
const staticCategories = ["Size Recommendation", "VTO/AR", "Return Management", "Feedback Analysis"];
const staticComplexities = ["Simple (Plug-and-Play)", "Moderate (Configuration Needed)", "Complex (Backend Development Required)"];
// const staticCosts = ["$", "$$", "$$$", "$$$$"]; // Cost filter hidden for now
// const staticPrivacyLevels = ["Low", "Medium", "High"]; // Privacy filter hidden for now

export default function SolutionComparatorClient({ initialSolutions }: SolutionComparatorClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');
  // const [selectedCost, setSelectedCost] = useState<string>(''); // Cost filter hidden for now
  // const [selectedPrivacy, setSelectedPrivacy] = useState<string>(''); // Privacy filter hidden for now

  // Dynamically derive filter options from initialSolutions
  // This makes filters adapt to the actual data present
  const availableCategories = useMemo(() => {
    if (!initialSolutions) return staticCategories;
    const unique = new Set(initialSolutions.map(s => s.category).filter((value): value is string => typeof value === 'string' && value !== ''));
    return Array.from(unique).sort();
  }, [initialSolutions]);

  const availableComplexities = useMemo(() => {
    if (!initialSolutions) return staticComplexities;
    const unique = new Set(initialSolutions.map(s => s.integration_complexity).filter((value): value is string => typeof value === 'string' && value !== ''));
    return Array.from(unique).sort();
  }, [initialSolutions]);

  // const availableCosts = useMemo(() => { // Cost filter hidden for now
  //   // Assuming indicative_cost directly matches $, $$, etc. or is null/empty
  //   // If indicative_cost has other string values (e.g., "Free", "Custom"), this needs adjustment
  //   if (!initialSolutions) return staticCosts;
  //   const unique = new Set(initialSolutions.map(s => s.indicative_cost).filter((value): value is string => typeof value === 'string' && value !== ''));
  //   // Ensure only defined cost symbols are shown, or use staticCosts if data is messy
  //   const validCostSymbols = staticCosts; // Use the predefined symbols as the valid options
  //   const presentCosts = Array.from(unique).filter(cost => validCostSymbols.includes(cost));
  //   return presentCosts.length > 0 ? presentCosts.sort((a,b) => a.length - b.length) : staticCosts;
  // }, [initialSolutions]);

  // const availablePrivacyLevels = useMemo(() => { // Privacy filter hidden for now
  //   if (!initialSolutions) return staticPrivacyLevels;
  //   const unique = new Set(initialSolutions.map(s => s.privacy_concern_level).filter((value): value is string => typeof value === 'string' && value !== ''));
  //   return Array.from(unique).sort();
  // }, [initialSolutions]);


  const filteredSolutions = initialSolutions.filter(solution => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(solution.category)) {
      return false;
    }
    if (selectedComplexity && solution.integration_complexity !== selectedComplexity) {
      return false;
    }
    // Cost filter hidden for now
    // if (selectedCost && solution.indicative_cost !== selectedCost) {
    //   return false;
    // }
    // Privacy filter hidden for now
    // if (selectedPrivacy && solution.privacy_concern_level !== selectedPrivacy) {
    //   return false;
    // }
    return true;
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategories(prev =>
      event.target.checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedComplexity('');
    // setSelectedCost(''); // Cost filter hidden for now
    // setSelectedPrivacy(''); // Privacy filter hidden for now
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Solution Comparator</h1>
      <p className="mb-6 text-white">
        Explore and compare various technology solutions designed to help reduce return rates in fashion e-commerce. Use the filters below to narrow down options based on your needs.
      </p>

      {/* --- Filter UI --- */}
      <div className="mb-8 p-6 bg-slate-700/90 rounded-lg border border-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Category</label>
            <div className="space-y-2">
              {(availableCategories.length > 0 ? availableCategories : staticCategories).map(category => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category.replace(/\s+/g, '-')}`}
                    name="category"
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-blue-600 border-slate-500 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`category-${category.replace(/\s+/g, '-')}`} className="ml-2 block text-sm text-white">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity Filter */}
          <div>
            <label htmlFor="complexity-filter" className="block text-sm font-medium text-white mb-2">Integration Complexity</label>
            <select
              id="complexity-filter"
              name="complexity"
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-sm bg-slate-600 border-slate-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="">All Complexities</option>
              {(availableComplexities.length > 0 ? availableComplexities : staticComplexities).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Cost Filter - Hidden for now */}
          {/*
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Indicative Cost</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="cost-all" name="cost" type="radio" value="" checked={selectedCost === ''} onChange={(e) => setSelectedCost(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                <label htmlFor="cost-all" className="ml-2 block text-sm text-gray-900">All Costs</label>
              </div>
              {(availableCosts.length > 0 ? availableCosts : staticCosts).map(level => (
                <div key={level} className="flex items-center">
                  <input id={`cost-${level}`} name="cost" type="radio" value={level} checked={selectedCost === level} onChange={(e) => setSelectedCost(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                  <label htmlFor={`cost-${level}`} className="ml-2 block text-sm text-gray-900">{level}</label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Note: Assumes cost data matches symbols (e.g., $, $$). Needs verification if data is different (e.g. Free, €10-€50).</p>
          </div>
          */}

          {/* Privacy Filter - Hidden for now */}
          {/*
          <div>
            <label htmlFor="privacy-filter" className="block text-sm font-medium text-gray-700 mb-2">Privacy Concern Level</label>
            <select
              id="privacy-filter"
              name="privacy"
              value={selectedPrivacy}
              onChange={(e) => setSelectedPrivacy(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Levels</option>
              {(availablePrivacyLevels.length > 0 ? availablePrivacyLevels : staticPrivacyLevels).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          */}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-slate-500 shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear All Filters
          </button>
          <p className="text-sm text-white">
            Showing {filteredSolutions.length} of {initialSolutions.length} solutions
          </p>
        </div>
      </div>
      {/* --- End Filter UI --- */}

      {/* --- Solution Grid --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredSolutions.length > 0 ? (
          filteredSolutions.map((solution: Solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))
        ) : (
          <p className="col-span-full text-center text-white py-10">
            No solutions match the current filters. Try adjusting your criteria or clearing filters.
          </p>
        )}
      </div>
      {/* --- End Solution Grid --- */}
    </div>
  );
}
