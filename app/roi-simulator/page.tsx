'use client';

import React, { useState } from 'react';

// Helper function for currency formatting
const formatCurrency = (value: number | null): string => {
  if (value === null || isNaN(value)) return 'N/A';
  return `€${value.toFixed(2)}`;
};

// Helper function for percentage formatting
const formatPercent = (value: number | null, decimals: number = 1): string => {
  if (value === null || isNaN(value)) return 'N/A';
  return `${value.toFixed(decimals)}%`;
};

// Note: Metadata defined here won't work directly in a 'use client' component.
// It should be defined in a parent layout or page if static generation is needed.
// export const metadata: Metadata = {
//   title: 'ROI Simulator | Dutch Return Toolkit',
//   description: 'Estimate potential ROI from implementing return reduction solutions.',
// };

export default function ROISimulatorPage() {
  // State for inputs - will be implemented in the next step (Prompt 14)
  const [monthlyOrders, setMonthlyOrders] = useState<number | string>('');
  const [avgOrderValue, setAvgOrderValue] = useState<number | string>('');
  const [currentReturnRate, setCurrentReturnRate] = useState<number | string>('');
  const [costPerReturn, setCostPerReturn] = useState<number | string>(12.50); // Default value

  // --- State for results ---
  const [baselineResults, setBaselineResults] = useState<{
    monthlyReturnedOrders: number | null;
    currentMonthlyProcessingCost: number | null;
    currentMonthlyRevenueLost: number | null;
  }>({ monthlyReturnedOrders: null, currentMonthlyProcessingCost: null, currentMonthlyRevenueLost: null });

  type SavingsResult = {
    monthlyLow: number | null;
    monthlyHigh: number | null;
    annualLow: number | null;
    annualHigh: number | null;
    newRateLow: number | null; // New return rate % (low end of reduction)
    newRateHigh: number | null; // New return rate % (high end of reduction)
  };

  const initialSavings: SavingsResult = { monthlyLow: null, monthlyHigh: null, annualLow: null, annualHigh: null, newRateLow: null, newRateHigh: null };

  const [sizeRecSavings, setSizeRecSavings] = useState<SavingsResult>(initialSavings);
  const [vtoArSavings, setVtoArSavings] = useState<SavingsResult>(initialSavings);
  const [returnMgtSavings, setReturnMgtSavings] = useState<SavingsResult>(initialSavings);
  // --- End State for results ---

  // --- Calculation Logic ---
  const calculateROIEstimates = () => {
    // --- Input Validation and Parsing ---
    const numMonthlyOrders = Number(monthlyOrders);
    const numAvgOrderValue = Number(avgOrderValue);
    const numCurrentReturnRatePercent = Number(currentReturnRate);
    const numCostPerReturn = Number(costPerReturn);

    // Basic validation: check if inputs are valid numbers and positive (or zero for rate)
    if (
      isNaN(numMonthlyOrders) || numMonthlyOrders < 0 ||
      isNaN(numAvgOrderValue) || numAvgOrderValue < 0 ||
      isNaN(numCurrentReturnRatePercent) || numCurrentReturnRatePercent < 0 || numCurrentReturnRatePercent > 100 ||
      isNaN(numCostPerReturn) || numCostPerReturn < 0
    ) {
      // Reset results if inputs are invalid
      setBaselineResults({ monthlyReturnedOrders: null, currentMonthlyProcessingCost: null, currentMonthlyRevenueLost: null });
      setSizeRecSavings(initialSavings);
      setVtoArSavings(initialSavings);
      setReturnMgtSavings(initialSavings);
      console.error("Invalid input values provided.");
      // Optionally show an error message to the user
      return;
    }

    // --- Core Calculations (Baseline Situation) ---
    const currentReturnRateDecimal = numCurrentReturnRatePercent / 100;
    const calculatedMonthlyReturnedOrders = numMonthlyOrders * currentReturnRateDecimal;
    const calculatedCurrentMonthlyProcessingCost = calculatedMonthlyReturnedOrders * numCostPerReturn;
    const calculatedCurrentMonthlyRevenueLost = calculatedMonthlyReturnedOrders * numAvgOrderValue;

    setBaselineResults({
      monthlyReturnedOrders: calculatedMonthlyReturnedOrders,
      currentMonthlyProcessingCost: calculatedCurrentMonthlyProcessingCost,
      currentMonthlyRevenueLost: calculatedCurrentMonthlyRevenueLost
    });

    // --- Technology Effectiveness Ranges ---
    const sizeRecReductionMultiplierRange = { low: 0.10, high: 0.25 };
    const vtoArReductionMultiplierRange = { low: 0.05, high: 0.20 };
    const returnMgtReductionMultiplierRange = { low: 0.08, high: 0.20 };

    // --- Simulation Logic Function ---
    const calculateSavings = (
        multiplierRange: { low: number; high: number },
        baselineCost: number,
        baselineRateDecimal: number
    ): SavingsResult => {
        // Calculate New Return Rate Range
        const newRateLow = baselineRateDecimal * (1 - multiplierRange.high);
        const newRateHigh = baselineRateDecimal * (1 - multiplierRange.low);

        // Calculate Potential Monthly Processing Cost Savings Range
        const monthlyLow = baselineCost * multiplierRange.low;
        const monthlyHigh = baselineCost * multiplierRange.high;

        // Calculate Potential Annual Processing Cost Savings Range
        const annualLow = monthlyLow * 12;
        const annualHigh = monthlyHigh * 12;

        return {
            monthlyLow,
            monthlyHigh,
            annualLow,
            annualHigh,
            newRateLow: newRateLow * 100, // Convert back to percentage
            newRateHigh: newRateHigh * 100 // Convert back to percentage
        };
    };

    // --- Calculate for each category ---
    setSizeRecSavings(calculateSavings(sizeRecReductionMultiplierRange, calculatedCurrentMonthlyProcessingCost, currentReturnRateDecimal));
    setVtoArSavings(calculateSavings(vtoArReductionMultiplierRange, calculatedCurrentMonthlyProcessingCost, currentReturnRateDecimal));
    setReturnMgtSavings(calculateSavings(returnMgtReductionMultiplierRange, calculatedCurrentMonthlyProcessingCost, currentReturnRateDecimal));

  };
  // --- End Calculation Logic ---

  // Trigger calculation
  const handleCalculate = () => {
    console.log("Calculating ROI...");
    calculateROIEstimates();
  };


  return (
    <div className="dark:text-gray-100"> {/* Ensure default text is light in dark mode */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">ROI Simulator</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Estimate the potential return on investment (ROI) from implementing different types of return reduction technologies. Enter your current business metrics below.
      </p>

      {/* --- Input Form --- */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Your Business Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Orders */}
          <div>
            <label htmlFor="monthlyOrders" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Average Monthly Orders
            </label>
            <input
              type="number"
              name="monthlyOrders"
              id="monthlyOrders"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="e.g., 1000"
              min="0"
            />
          </div>

          {/* Average Order Value */}
          <div>
            <label htmlFor="avgOrderValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Average Order Value (€)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 dark:text-gray-400 sm:text-sm">€</span>
               </div>
               <input
                 type="number"
                 name="avgOrderValue"
                 id="avgOrderValue"
                 value={avgOrderValue}
                 onChange={(e) => setAvgOrderValue(e.target.value)}
                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-2 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                 placeholder="e.g., 85.00"
                 min="0"
                 step="0.01"
               />
            </div>
          </div>

          {/* Current Return Rate */}
          <div>
            <label htmlFor="currentReturnRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Return Rate (%)
            </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <input
                 type="number"
                 name="currentReturnRate"
                 id="currentReturnRate"
                 value={currentReturnRate}
                 onChange={(e) => setCurrentReturnRate(e.target.value)}
                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                 placeholder="e.g., 30"
                 min="0"
                 max="100"
                 step="0.1"
               />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 dark:text-gray-400 sm:text-sm">%</span>
               </div>
            </div>
          </div>

          {/* Estimated Cost Per Return */}
          <div>
            <label htmlFor="costPerReturn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Estimated Cost per Return (€)
            </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 dark:text-gray-400 sm:text-sm">€</span>
               </div>
              <input
                type="number"
                name="costPerReturn"
                id="costPerReturn"
                value={costPerReturn}
                onChange={(e) => setCostPerReturn(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-2 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="e.g., 12.50"
                min="0"
                step="0.01"
              />
             </div>
          </div>
        </div>
        <div className="mt-6 text-right">
           <button
             type="button"
             onClick={handleCalculate}
             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             Calculate Potential ROI
           </button>
         </div>
      </div>
      {/* --- End Input Form --- */}


      {/* --- Results Sections (Placeholders) --- */}
      <div className="mt-10">
        {/* Baseline Summary Section */}
        <div id="baseline-summary" className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Baseline Summary</h2>
          {baselineResults.monthlyReturnedOrders !== null ? (
            <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <p>Est. Monthly Returned Orders: <span className="font-medium">{baselineResults.monthlyReturnedOrders.toFixed(0)}</span></p>
              <p>Est. Monthly Return Processing Cost: <span className="font-medium">{formatCurrency(baselineResults.currentMonthlyProcessingCost)}</span></p>
              <p>Est. Monthly Revenue Lost on Returns: <span className="font-medium">{formatCurrency(baselineResults.currentMonthlyRevenueLost)}</span></p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">Enter your metrics and click calculate to see baseline costs.</p>
          )}
        </div>

        {/* Simulation Results Section */}
        <div id="simulation-results" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Simulation Results (Potential Savings)</h2>

          {/* Size Rec Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"> {/* Changed background to neutral gray */}
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Size Recommendation Tech</h3> {/* Adjusted dark heading color */}
            {sizeRecSavings.monthlyLow !== null ? (
              <div className="text-sm space-y-1 text-gray-800 dark:text-gray-200"> {/* Changed text color to neutral */}
                <p>Est. New Return Rate: <span className="font-medium">{formatPercent(sizeRecSavings.newRateLow)} - {formatPercent(sizeRecSavings.newRateHigh)}</span></p>
                <p>Est. Monthly Savings: <span className="font-medium">{formatCurrency(sizeRecSavings.monthlyLow)} - {formatCurrency(sizeRecSavings.monthlyHigh)}</span></p>
                <p>Est. Annual Savings: <span className="font-medium">{formatCurrency(sizeRecSavings.annualLow)} - {formatCurrency(sizeRecSavings.annualHigh)}</span></p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-sm">Potential savings will appear here after calculation.</p>
            )}
          </div>

          {/* VTO/AR Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"> {/* Changed background to neutral gray */}
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">VTO / AR Tech</h3> {/* Adjusted dark heading color */}
            {vtoArSavings.monthlyLow !== null ? (
               <div className="text-sm space-y-1 text-gray-800 dark:text-gray-200"> {/* Changed text color to neutral */}
                 <p>Est. New Return Rate: <span className="font-medium">{formatPercent(vtoArSavings.newRateLow)} - {formatPercent(vtoArSavings.newRateHigh)}</span></p>
                 <p>Est. Monthly Savings: <span className="font-medium">{formatCurrency(vtoArSavings.monthlyLow)} - {formatCurrency(vtoArSavings.monthlyHigh)}</span></p>
                 <p>Est. Annual Savings: <span className="font-medium">{formatCurrency(vtoArSavings.annualLow)} - {formatCurrency(vtoArSavings.annualHigh)}</span></p>
               </div>
             ) : (
               <p className="text-gray-500 dark:text-gray-400 italic text-sm">Potential savings will appear here after calculation.</p>
             )}
          </div>

          {/* Return Mgt Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"> {/* Changed background to neutral gray */}
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Return Management Platforms</h3> {/* Adjusted dark heading color */}
             {returnMgtSavings.monthlyLow !== null ? (
               <div className="text-sm space-y-1 text-gray-800 dark:text-gray-200"> {/* Changed text color to neutral */}
                 <p>Est. New Return Rate: <span className="font-medium">{formatPercent(returnMgtSavings.newRateLow)} - {formatPercent(returnMgtSavings.newRateHigh)}</span></p>
                 <p>Est. Monthly Savings: <span className="font-medium">{formatCurrency(returnMgtSavings.monthlyLow)} - {formatCurrency(returnMgtSavings.monthlyHigh)}</span></p>
                 <p>Est. Annual Savings: <span className="font-medium">{formatCurrency(returnMgtSavings.annualLow)} - {formatCurrency(returnMgtSavings.annualHigh)}</span></p>
               </div>
             ) : (
               <p className="text-gray-500 dark:text-gray-400 italic text-sm">Potential savings will appear here after calculation.</p>
             )}
           </div>
        </div>

         {/* Disclaimers Section */}
         <div id="disclaimers" className="mt-8 p-4 bg-yellow-100 dark:bg-gray-700 border border-yellow-300 dark:border-gray-600 rounded-lg text-yellow-900 dark:text-gray-200 text-sm"> {/* Changed background and text */}
            <p className="font-semibold mb-1 text-yellow-800 dark:text-yellow-300">Important Disclaimers:</p> {/* Adjusted heading color */}
            <ul className="list-disc list-inside space-y-1">
                <li>These calculations are estimates based on reported reduction ranges and your inputs. Actual results will vary.</li>
                <li>Savings shown represent potential reduction in return processing costs only and do <span className="font-semibold">not</span> account for the implementation or subscription costs of the technologies themselves.</li>
                <li>This tool provides indicative figures for informational purposes and does not constitute financial advice or a guarantee of savings.</li>
            </ul>
         </div>
      </div>
      {/* --- End Results Sections --- */}

    </div>
  );
}
