import { createClient } from '@/lib/supabaseServer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dutch Market Context | Dutch Return Toolkit',
  description: 'Understand the specific context of the Dutch fashion market regarding returns.',
};

// Define a type for the Dutch context data
type DutchContext = {
  id: string;
  topic_title: string;
  content: string;
  created_at: string;
};

export default async function DutchContextPage() {
  const supabase = createClient();
  const { data: contexts, error } = await supabase
    .from('dutch_context')
    .select('*')
    .order('created_at', { ascending: true }); // Optional: order by creation date

  if (error) {
    console.error('Error fetching Dutch context:', error);
    return <p className="text-red-500">Could not load Dutch market context at this time.</p>;
  }

  if (!contexts || contexts.length === 0) {
    return <p>No Dutch market context information found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dutch Market Context</h1>
      <div className="space-y-6">
        {contexts.map((context: DutchContext) => (
          <div key={context.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{context.topic_title}</h2>
            {/* Use whitespace-pre-wrap to respect newlines in the content */}
            <p className="text-gray-600 whitespace-pre-wrap">{context.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
