import React from 'react';

// Define a type for the Solution data based on the schema
// Ensure this matches the structure fetched from Supabase
export type Solution = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  reduction_rate_low: number | null;
  reduction_rate_high: number | null;
  reduction_rate_basis: string | null;
  other_benefits: string[] | null;
  integration_complexity: string | null;
  indicative_cost: string | null;
  privacy_concern_level: string | null;
  product_suitability_notes: string | null;
  example_vendors: string[] | null;
  created_at: string;
};

interface SolutionCardProps {
  solution: Solution;
}

// Helper function to format reduction rate
const formatReductionRate = (low: number | null, high: number | null): string => {
  if (low === null && high === null) return 'N/A';
  if (low !== null && high !== null) {
    if (low === high) return `${(low * 100).toFixed(0)}%`;
    return `${(low * 100).toFixed(0)}% - ${(high * 100).toFixed(0)}%`;
  }
  if (low !== null) return `Up to ${(low * 100).toFixed(0)}%`;
  if (high !== null) return `Up to ${(high * 100).toFixed(0)}%`; // Or adjust logic as needed
  return 'N/A';
};


const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  const reductionText = formatReductionRate(solution.reduction_rate_low, solution.reduction_rate_high);

  return (
    <div className="bg-white p-5 rounded-lg shadow border border-gray-200 flex flex-col transition duration-200 ease-in-out hover:shadow-md">
      {/* Added transition and hover effect */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{solution.name}</h3>
      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-4 self-start">
        {solution.category}
      </span>
      {solution.description && (
         <p className="text-sm text-gray-600 mb-4">{solution.description}</p>
      )}
      {/* Added min-height to ensure cards align better if descriptions vary a lot */}
      <div className="mt-auto pt-4 border-t border-gray-100 text-sm space-y-2 min-h-[50px]">
         <p><span className="font-semibold">Reported Reduction:</span> {reductionText} {solution.reduction_rate_basis ? `(${solution.reduction_rate_basis})` : ''}</p>
         {/* Example: Add Complexity display */}
         <p><span className="font-semibold">Complexity:</span> {solution.integration_complexity || 'N/A'}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
