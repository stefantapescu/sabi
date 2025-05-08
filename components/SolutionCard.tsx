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
    if (low === high) return `${(low * 100).toFixed(0)}%`; // No decimal for whole numbers
    return `${(low * 100).toFixed(0)}% - ${(high * 100).toFixed(0)}%`; // No decimal for whole numbers
  }
  // If one is null, show the other as "Up to X%" or just "X%"
  const rate = low !== null ? low : high;
  if (rate !== null) return `${(rate * 100).toFixed(0)}%`; // No decimal for whole numbers
  return 'N/A';
};

const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  const reductionText = formatReductionRate(solution.reduction_rate_low, solution.reduction_rate_high);

  // Define a base height and add more if certain fields are present
  // This is a simple approach; more complex grid/flex layouts might be better for perfect alignment
  let cardMinHeight = "min-h-[280px]"; // Base height
  if (solution.description && solution.description.length > 100) cardMinHeight = "min-h-[320px]";
  if (solution.example_vendors && solution.example_vendors.length > 0) cardMinHeight = "min-h-[340px]";


  return (
    <div className={`bg-white p-5 rounded-lg shadow border border-gray-200 flex flex-col transition duration-200 ease-in-out hover:shadow-lg hover:border-indigo-300 ${cardMinHeight}`}>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{solution.name}</h3>
      <div className="mb-3">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded self-start">
          {solution.category}
        </span>
      </div>

      {solution.description && (
         <p className="text-sm text-gray-600 mb-4 flex-grow">{solution.description}</p>
      )}
      {!solution.description && <div className="flex-grow"></div>} {/* Ensure space is taken if no description */}

      <div className="mt-auto pt-4 border-t border-gray-100 text-sm space-y-2">
        <p><span className="font-semibold">Reported Reduction:</span> {reductionText} {solution.reduction_rate_basis ? <span className="text-xs text-gray-500">({solution.reduction_rate_basis})</span> : ''}</p>
        <p><span className="font-semibold">Complexity:</span> {solution.integration_complexity || 'N/A'}</p>
        <p><span className="font-semibold">Indicative Cost:</span> {solution.indicative_cost || 'N/A'}</p>
        <p><span className="font-semibold">Privacy Level:</span> {solution.privacy_concern_level || 'N/A'}</p>
        {solution.example_vendors && solution.example_vendors.length > 0 && (
          <div>
            <span className="font-semibold">Example Vendors:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {solution.example_vendors.map(vendor => (
                <span key={vendor} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                  {vendor}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionCard;
