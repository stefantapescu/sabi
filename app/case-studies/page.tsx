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
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                {study.company_name}
                {study.is_dutch && (
                  <span className="ml-2 text-xs align-middle font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                    Dutch
                  </span>
                )}
              </h2>
              <div className="space-y-2 text-sm mb-3">
                {study.challenge && (
                  <div>
                    <span className="font-semibold text-gray-600">Challenge:</span>
                    <p className="text-gray-500 leading-relaxed">{study.challenge}</p>
                  </div>
                )}
                {study.solution_implemented && (
                  <div>
                    <span className="font-semibold text-gray-600">Solution Implemented:</span>
                    <p className="text-gray-500 leading-relaxed">{study.solution_implemented}</p>
                    {study.solution_id && (
                      <Link href={`/comparator?solution=${study.solution_id}`} className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline">
                        Learn more about this type of solution &rarr;
                      </Link>
                    )}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-600">Key Results:</span>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">{study.key_results}</p>
                </div>
              </div>
            </div>
            {study.source_link && (
              <div className="mt-auto pt-3 border-t border-gray-200">
                <Link href={study.source_link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline font-medium">
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
