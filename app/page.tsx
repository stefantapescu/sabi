import Link from 'next/link'; // Added Link import
import Image from 'next/image'; // Added Image import for icons

export default function HomePage() {
  return (
    <div>
      <section className="mb-12 text-center"> {/* Centered the hero section */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Tackling Fashion Returns in the Netherlands
        </h1>
        <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto"> {/* Constrained width for readability */}
          The Dutch fashion industry faces a significant challenge: high return rates. Typically ranging between <span className="font-semibold text-indigo-600">25% and 50%</span>, these returns are predominantly driven by issues with size and fit, accounting for approximately <span className="font-semibold text-indigo-600">70%</span> of cases.
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"> {/* Constrained width */}
          This isn&#39;t just an operational hurdle; it carries substantial financial and environmental costs.
        </p>
        <Link href="/comparator" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md hover:shadow-lg">
          Explore Solutions Now
        </Link>
      </section>

      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <div className="bg-orange-50 p-6 rounded-lg shadow-lg border border-orange-200"> {/* Enhanced styling */}
          <div className="flex items-center mb-3">
            {/* Placeholder for cost icon - using 'file.svg' as an example */}
            <Image src="/file.svg" alt="Cost Icon" width={28} height={28} className="mr-3 text-orange-600" />
            <h2 className="text-2xl font-semibold text-orange-700">The Cost of Returns</h2>
          </div>
          <p className="text-gray-700">
            Each return incurs significant costs, estimated between <span className="font-semibold text-orange-800">€12.50 and €19.50</span>. This includes logistics, processing, inspection, repackaging, and potential depreciation or disposal of the item. For SMEs, these costs can severely impact profitability.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200"> {/* Enhanced styling */}
          <div className="flex items-center mb-3">
            <Image src="/globe.svg" alt="Environmental Impact Icon" width={28} height={28} className="mr-3 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-700">Environmental Impact</h2>
          </div>
          <p className="text-gray-700">
            Beyond the financial burden, returns contribute to increased transportation emissions, packaging waste, and often lead to items being discarded rather than resold, adding to landfill problems. Reducing returns is a crucial step towards a more sustainable fashion industry.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg shadow-lg border border-blue-200 text-center"> {/* Enhanced styling & centered */}
        <div className="flex justify-center items-center mb-4">
           {/* Placeholder for toolkit icon - using 'window.svg' as an example */}
          <Image src="/window.svg" alt="Toolkit Icon" width={32} height={32} className="mr-3 text-blue-600" />
          <h2 className="text-3xl font-semibold text-blue-700">Introducing the Toolkit</h2>
        </div>
        <p className="text-gray-700 mb-3 max-w-2xl mx-auto"> {/* Constrained width */}
          This toolkit is designed specifically for Small and Medium-sized Enterprises (SMEs) in the Dutch fashion sector. It provides insights, practical solutions, and data-driven tools to help you understand, manage, and ultimately reduce costly returns.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6"> {/* Constrained width */}
          Explore best practices, compare technology solutions, simulate potential ROI, and understand the unique Dutch market context to make informed decisions for your business.
        </p>
        <div className="mt-6 space-x-4">
            <Link href="/best-practices" className="inline-block bg-sky-500 text-white px-6 py-2 rounded-md font-medium hover:bg-sky-600 transition duration-150 ease-in-out shadow hover:shadow-md">
                View Best Practices
            </Link>
            <Link href="/roi-simulator" className="inline-block bg-teal-500 text-white px-6 py-2 rounded-md font-medium hover:bg-teal-600 transition duration-150 ease-in-out shadow hover:shadow-md">
                Try ROI Simulator
            </Link>
        </div>
      </section>
    </div>
  );
}
