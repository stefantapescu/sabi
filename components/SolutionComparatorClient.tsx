'use client';

import React, { useState } from 'react';
import SolutionCard, { type Solution } from './SolutionCard';

interface SolutionComparatorClientProps {
  initialSolutions: Solution[]; // Receive initial data from Server Component
}

// Define possible filter values (can be derived from data or hardcoded for simplicity)
// TODO: Ideally, fetch distinct values from the database for dynamic filters
const categories = ["Size Recommendation", "VTO/AR", "Return Management", "Feedback Analysis"];
const complexities = ["Simple (Plug-and-Play)", "Moderate (Configuration Needed)", "Complex (Backend Development Required)"];
// Note: Cost filter might need adjustment based on actual data format in 'indicative_cost'
const costs = ["$", "$$", "$$$", "$$$$"]; // Example values, adjust as needed
const privacyLevels = ["Low", "Medium", "High"];


export default function SolutionComparatorClient({ initialSolutions }: SolutionComparatorClientProps) {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');
  const [selectedCost, setSelectedCost] = useState<string>(''); // Adjust state/UI based on actual cost data format
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>('');

  // --- Filtering logic will be added in the next step (Prompt 12) ---
  // For now, just display all initialSolutions or apply basic filtering
  const filteredSolutions = initialSolutions.filter(solution => {
    // Category check (checkboxes - OR logic within category)
    if (selectedCategories.length > 0 && !selectedCategories.includes(solution.category)) {
      return false;
    }
    // Complexity check (dropdown/select - exact match or empty)
    if (selectedComplexity && solution.integration_complexity !== selectedComplexity) {
      return false;
    }
    // Cost check (example using radio buttons - exact match or empty)
    // TODO: Adjust this logic based on how cost levels ($ symbols) map to 'indicative_cost' strings
    if (selectedCost && solution.indicative_cost !== selectedCost) { // This is a placeholder - needs refinement
        // Example refinement: Check if indicative_cost *contains* the symbol(s)
        // if (selectedCost && !solution.indicative_cost?.includes(selectedCost)) { return false; }
        return false; // Placeholder - needs better logic based on data
    }
    // Privacy check (dropdown/select - exact match or empty)
    if (selectedPrivacy && solution.privacy_concern_level !== selectedPrivacy) {
      return false;
    }
    return true; // Include solution if it passes all active filters
  });
  // --- End Filtering Logic Placeholder ---


  // Handler for category checkboxes
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategories(prev =>
      event.target.checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  return (
    <div>
       <h1 className="text-3xl font-bold mb-6 text-gray-800">Solution Comparator</h1>
       <p className="mb-6 text-gray-600">
         Explore and compare various technology solutions designed to help reduce return rates in fashion e-commerce. Use the filters below to narrow down options based on your needs.
       </p>

      {/* --- Filter UI --- */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category.replace(/\s+/g, '-')}`} // Create unique ID
                  name="category"
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`category-${category.replace(/\s+/g, '-')}`} className="ml-2 block text-sm text-gray-900">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Complexity Filter */}
        <div>
           <label htmlFor="complexity-filter" className="block text-sm font-medium text-gray-700 mb-2">Integration Complexity</label>
           <select
             id="complexity-filter"
             name="complexity"
             value={selectedComplexity}
             onChange={(e) => setSelectedComplexity(e.target.value)}
             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
           >
             <option value="">All Complexities</option>
             {complexities.map(level => (
               <option key={level} value={level}>{level}</option>
             ))}
           </select>
        </div>

         {/* Cost Filter */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Indicative Cost (Example)</label>
           {/* Using Radios for Cost Example - Adjust based on actual data */}
           <div className="space-y-2">
             <div className="flex items-center">
               <input id="cost-all" name="cost" type="radio" value="" checked={selectedCost === ''} onChange={(e) => setSelectedCost(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
               <label htmlFor="cost-all" className="ml-2 block text-sm text-gray-900">All Costs</label>
             </div>
             {costs.map(level => (
               <div key={level} className="flex items-center">
                 <input id={`cost-${level}`} name="cost" type="radio" value={level} checked={selectedCost === level} onChange={(e) => setSelectedCost(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/>
                 <label htmlFor={`cost-${level}`} className="ml-2 block text-sm text-gray-900">{level}</label>
               </div>
             ))}
           </div>
           <p className="text-xs text-gray-500 mt-1">Note: Cost filter logic needs refinement based on data.</p>
         </div>

         {/* Privacy Filter */}
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
             {privacyLevels.map(level => (
               <option key={level} value={level}>{level}</option>
             ))}
           </select>
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
          <p className="col-span-full text-center text-gray-500 py-10">No solutions match the current filters.</p>
        )}
      </div>
       {/* --- End Solution Grid --- */}
    </div>
  );
}
