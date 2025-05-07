import { createClient } from '@/lib/supabaseServer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Practices | Dutch Return Toolkit',
  description: 'Explore best practices for reducing fashion returns in the Dutch market.',
};

// Define a type for the best practice data for better type safety
type BestPractice = {
  id: string;
  title: string;
  content: string;
  practice_category: string | null;
  created_at: string;
};

export default async function BestPracticesPage() {
  const supabase = await createClient();
  const { data: practices, error } = await supabase
    .from('best_practices')
    .select('*')
    .order('created_at', { ascending: true }); // Optional: order by creation date

  if (error) {
    console.error('Error fetching best practices:', error);
    // Optionally render an error message to the user
    return <p className="text-red-500">Could not load best practices at this time.</p>;
  }

  if (!practices || practices.length === 0) {
    return <p>No best practices found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Best Practices for Return Reduction</h1>
      <div className="space-y-6">
        {practices.map((practice: BestPractice) => (
          <div key={practice.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
            {practice.practice_category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-2">
                {practice.practice_category}
              </span>
            )}
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{practice.title}</h2>
            {/* Use whitespace-pre-wrap to respect newlines in the content */}
            <p className="text-gray-600 whitespace-pre-wrap">{practice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
