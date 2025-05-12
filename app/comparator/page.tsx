import { createClient } from '@/lib/supabaseServer';
import { Metadata } from 'next';
import SolutionComparatorClient from '@/components/SolutionComparatorClient'; // Import the new client component
import { type Solution } from '@/components/SolutionCard'; // Import type

export const metadata: Metadata = {
  title: 'Solution Comparator | Dutch Return Toolkit',
  description: 'Compare different technology solutions for reducing fashion returns.',
};

// Revalidate data periodically or on demand if needed
// export const revalidate = 3600; // Revalidate every hour, for example

export default async function ComparatorPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .order('category') // Order by category initially
    .order('name');    // Then by name

  if (error) {
    console.error('Error fetching solutions:', error);
    // Render a user-friendly error message within the client component perhaps?
    // Or handle it here. For now, showing a simple message.
    return (
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Solution Comparator</h1>
        <p className="text-red-300">Could not load solutions at this time. Please try again later.</p>
      </div>
    );
  }

  // Ensure data is treated as Solution[] type
  const solutions: Solution[] = data || [];

  if (solutions.length === 0) {
     return (
       <div className="text-white">
         <h1 className="text-3xl font-bold mb-6 text-white">Solution Comparator</h1>
         <p className="text-white">No solutions found in the database.</p>
       </div>
     );
  }

  // Pass the fetched solutions to the client component
  return <SolutionComparatorClient initialSolutions={solutions} />;
}
