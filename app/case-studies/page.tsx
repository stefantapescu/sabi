import { createClient } from '@/lib/supabaseServer';
import { Metadata } from 'next';
import Link from 'next/link'; // Import Link for potential source links

export const metadata: Metadata = {
  title: 'Case Studies | Dutch Return Toolkit',
  description: 'Explore case studies of fashion businesses tackling return rates.',
};

// Define a type for the case study data
type CaseStudy = {
  id: string;
  company_name: string;
  is_dutch: boolean | null;
  challenge: string | null;
  solution_implemented: string | null;
  solution_id: string | null; // Assuming UUID is string
  key_results: string;
  source_link: string | null;
  created_at: string;
};

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  // Fetch case studies, potentially joining with solutions if needed later
  // For now, just fetch from case_studies
  const { data: studies, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('company_name', { ascending: true }); // Order alphabetically by company

  if (error) {
    console.error('Error fetching case studies:', error);
    return <p className="text-red-500">Could not load case studies at this time.</p>;
  }

  if (!studies || studies.length === 0) {
    return <p>No case studies found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Case Studies</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study: CaseStudy) => (
          <div key={study.id} className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {study.company_name}
                {study.is_dutch && (
                  <span className="ml-2 text-xs font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                    Dutch
                  </span>
                )}
              </h2>
              {study.challenge && (
                <p className="text-sm text-gray-500 mb-1"><span className="font-semibold">Challenge:</span> {study.challenge}</p>
              )}
              {study.solution_implemented && (
                 <p className="text-sm text-gray-500 mb-1"><span className="font-semibold">Solution:</span> {study.solution_implemented}</p>
                 // Optional: Link to solution page if solution_id exists and comparator page is ready
                 // {study.solution_id && <Link href={`/comparator?solution=${study.solution_id}`}>View Solution</Link>}
              )}
              <p className="text-sm text-gray-700 mt-2 mb-3"><span className="font-semibold">Key Results:</span> {study.key_results}</p>
            </div>
            {study.source_link && (
              <div className="mt-auto pt-3 border-t border-gray-100">
                <Link href={study.source_link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  View Source &rarr;
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
