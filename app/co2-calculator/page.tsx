'use client';

import { useState, ChangeEvent } from 'react';
// Removing unused Image import
// import Image from 'next/image';

/* eslint-disable react/no-unescaped-entities */

// Constants for CO2 calculations
const TRANSPORT_EMISSIONS_PER_KM_PER_KG = 0.59; // kg CO2e per km per kg
const CARDBOARD_EMISSIONS_PER_KG = 2.93; // kg CO2e per kg of cardboard
const BUBBLE_WRAP_EMISSIONS_PER_KG = 3.56; // kg CO2e per kg of bubble wrap
const TREE_ABSORPTION_PER_YEAR = 25; // kg CO2e per year (average)

export default function CO2CalculatorPage() {
  // State for form inputs - use strings for input values to allow empty state
  const [initialWeight, setInitialWeight] = useState<string>('6');
  const [returnWeight, setReturnWeight] = useState<string>('4');
  const [distance, setDistance] = useState<string>('125');
  const [cardboardWeight, setCardboardWeight] = useState<string>('0.291');
  const [bubbleWrapWeight, setBubbleWrapWeight] = useState<string>('0.044');
  const [includeReturn, setIncludeReturn] = useState<boolean>(true);
  
  // State for results
  const [results, setResults] = useState<{
    initialTransportEmissions: number;
    returnTransportEmissions: number;
    packagingEmissions: number;
    totalEmissions: number;
    treeAbsorptionDays: number;
  } | null>(null);

  // Handle numeric input changes
  const handleNumericInput = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    
    // Allow empty value, numbers, decimal point
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // Calculate CO2 emissions
  const calculateEmissions = () => {
    // Parse inputs as numbers, defaulting to 0 if empty
    const initialWeightNum = parseFloat(initialWeight) || 0;
    const returnWeightNum = parseFloat(returnWeight) || 0;
    const distanceNum = parseFloat(distance) || 0;
    const cardboardWeightNum = parseFloat(cardboardWeight) || 0;
    const bubbleWrapWeightNum = parseFloat(bubbleWrapWeight) || 0;
    
    // Calculate transport emissions for initial shipment (in kg)
    // The formula should convert to kg (original is in grams CO2e)
    const initialTransportEmissions = 
      (TRANSPORT_EMISSIONS_PER_KM_PER_KG * distanceNum * initialWeightNum) / 1000;
    
    // Calculate transport emissions for return shipment (if applicable) (in kg)
    const returnTransportEmissions = includeReturn ? 
      (TRANSPORT_EMISSIONS_PER_KM_PER_KG * distanceNum * returnWeightNum) / 1000 : 0;
    
    // Calculate packaging emissions (same for both initial and return)
    const cardboardEmissions = cardboardWeightNum * CARDBOARD_EMISSIONS_PER_KG;
    const bubbleWrapEmissions = bubbleWrapWeightNum * BUBBLE_WRAP_EMISSIONS_PER_KG;
    const packagingEmissionsOnce = cardboardEmissions + bubbleWrapEmissions;
    
    // Total packaging emissions (considering both initial and return if applicable)
    const packagingEmissions = includeReturn ? 
      packagingEmissionsOnce * 2 : packagingEmissionsOnce;
    
    // Calculate total emissions
    const totalEmissions = 
      initialTransportEmissions + returnTransportEmissions + packagingEmissions;
    
    // Calculate tree absorption equivalent in days
    const treeAbsorptionDays = (totalEmissions / TREE_ABSORPTION_PER_YEAR) * 365;
    
    // Set results
    setResults({
      initialTransportEmissions,
      returnTransportEmissions,
      packagingEmissions,
      totalEmissions,
      treeAbsorptionDays,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">CO2 Emissions Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Calculate the environmental impact of shipping and returning packages in terms of CO2 emissions.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This calculator helps you understand how package weight, distance, and packaging materials 
          contribute to the carbon footprint of e-commerce operations.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Input Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="initialWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Shipment Weight (kg)
              </label>
              <input
                type="text"
                id="initialWeight"
                value={initialWeight}
                onChange={(e) => handleNumericInput(e, setInitialWeight)}
                min="0.1"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="includeReturn"
                checked={includeReturn}
                onChange={(e) => setIncludeReturn(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="includeReturn" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Include Return Shipment
              </label>
            </div>
            
            {includeReturn && (
              <div>
                <label htmlFor="returnWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Return Shipment Weight (kg)
                </label>
                <input
                  type="text"
                  id="returnWeight"
                  value={returnWeight}
                  onChange={(e) => handleNumericInput(e, setReturnWeight)}
                  min="0.1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                One-way Distance (km)
              </label>
              <input
                type="text"
                id="distance"
                value={distance}
                onChange={(e) => handleNumericInput(e, setDistance)}
                min="1"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="cardboardWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cardboard Box Weight (kg)
              </label>
              <input
                type="text"
                id="cardboardWeight"
                value={cardboardWeight}
                onChange={(e) => handleNumericInput(e, setCardboardWeight)}
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="bubbleWrapWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bubble Wrap Weight (kg)
              </label>
              <input
                type="text"
                id="bubbleWrapWeight"
                value={bubbleWrapWeight}
                onChange={(e) => handleNumericInput(e, setBubbleWrapWeight)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <button
              onClick={calculateEmissions}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate CO2 Emissions
            </button>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">CO2 Emissions Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Initial Transport</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {results.initialTransportEmissions.toFixed(2)} <span className="text-sm">kg CO2e</span>
                  </p>
                </div>
                
                {includeReturn && (
                  <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Return Transport</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {results.returnTransportEmissions.toFixed(2)} <span className="text-sm">kg CO2e</span>
                    </p>
                  </div>
                )}
                
                <div className="bg-amber-50 dark:bg-amber-900 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Packaging</p>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {results.packagingEmissions.toFixed(2)} <span className="text-sm">kg CO2e</span>
                  </p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Emissions</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {results.totalEmissions.toFixed(2)} <span className="text-sm">kg CO2e</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Environmental Context</h3>
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md flex items-center">
                  <div className="mr-4">
                    <svg className="h-12 w-12 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C14.5 3 17 4.5 17 8C19.5 8 22 10 22 13.5C22 17 19.5 19 16 19C15.5 19 13.5 19 12 19C10.5 19 8.5 19 8 19C4.5 19 2 17 2 13.5C2 10 4.5 8 7 8C7 4.5 9.5 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 19V22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 13L12 16L16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 22.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These emissions equal what an average tree absorbs in:
                    </p>
                    <p className="text-xl font-bold text-green-700 dark:text-green-300">
                      {Math.round(results.treeAbsorptionDays)} days 
                      {Math.round(results.treeAbsorptionDays) <= 45 && Math.round(results.treeAbsorptionDays) >= 25 && " (≈ 1 month)"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      A mature tree absorbs 10-40 kg of CO2 per year, varying by size and health.
                      <br />
                      Source: <span className="italic">Hoeveel CO2 Neemt een Boom op – Kuwi.org</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Emission Breakdown</h3>
                <div className="h-8 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {/* Calculate percentages for the stacked bar */}
                  {(() => {
                    const initialTransportPercentage = (results.initialTransportEmissions / results.totalEmissions) * 100;
                    const returnTransportPercentage = (results.returnTransportEmissions / results.totalEmissions) * 100;
                    const packagingPercentage = (results.packagingEmissions / results.totalEmissions) * 100;
                    
                    return (
                      <>
                        <div 
                          className="h-full bg-blue-500 float-left"
                          style={{ width: `${initialTransportPercentage}%` }}
                          title={`Initial Transport: ${initialTransportPercentage.toFixed(1)}%`}
                        ></div>
                        {includeReturn && (
                          <div 
                            className="h-full bg-purple-500 float-left"
                            style={{ width: `${returnTransportPercentage}%` }}
                            title={`Return Transport: ${returnTransportPercentage.toFixed(1)}%`}
                          ></div>
                        )}
                        <div 
                          className="h-full bg-amber-500 float-left"
                          style={{ width: `${packagingPercentage}%` }}
                          title={`Packaging: ${packagingPercentage.toFixed(1)}%`}
                        ></div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                    <span>Initial Transport</span>
                  </div>
                  {includeReturn && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
                      <span>Return Transport</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-sm mr-1"></div>
                    <span>Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v3m0 0v3m0-3h3m-3 0H9" />
              </svg>
              <p className="text-center">Enter your shipping parameters and click "Calculate" to see the CO2 emissions results.</p>
            </div>
          )}
        </section>
      </div>
      
      <section className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">About CO2 Calculations</h2>
        <div className="prose max-w-none text-gray-600 dark:text-gray-300">
          <p>
            Ordering and returning packages significantly impact CO2 emissions. This calculator helps you understand 
            the extent of this impact by analyzing various factors contributing to total emissions, such as transport 
            and packaging.
          </p>
          
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mt-4">Calculation Method</h3>
          <p>The following formulas are used in our calculations:</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-gray-800 dark:text-gray-100">Transport emissions:</strong> 0.59 kg CO2e per km per kg × distance × weight</li>
            <li><strong className="text-gray-800 dark:text-gray-100">Cardboard emissions:</strong> 2.93 kg CO2e per kg × cardboard weight</li>
            <li><strong className="text-gray-800 dark:text-gray-100">Bubble wrap emissions:</strong> 3.56 kg CO2e per kg × bubble wrap weight</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mt-4">Environmental Context</h3>
          <p>
            To understand the impact of these CO2 emissions, we compare them to the amount of CO2 absorbed by a tree. 
            A mature tree absorbs approximately 10 to 40 kg of CO2 per year (we use an average of 25 kg). 
            For typical shipping emissions of a standard e-commerce package, this often corresponds to the amount of CO2 
            that a tree could absorb in approximately 1 month, depending on the tree&apos;s size and health.
            This gives you a tangible sense of the environmental impact of your shipping operations.
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Source: &quot;Carbon Footprint Of Package Shipping And Transport, 2023&quot; and &quot;Hoeveel CO2 Neemt een Boom op – Kuwi.org&quot;
          </p>
        </div>
      </section>
    </div>
  );
} 