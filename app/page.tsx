// Keep if you want the Vercel logo or similar later

export default function HomePage() {
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Tackling Fashion Returns in the Netherlands
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          The Dutch fashion industry faces a significant challenge: high return rates. Typically ranging between <span className="font-semibold">25% and 50%</span>, these returns are predominantly driven by issues with size and fit, accounting for approximately <span className="font-semibold">70%</span> of cases.
        </p>
        <p className="text-lg text-gray-600">
          This isn't just an operational hurdle; it carries substantial financial and environmental costs.
        </p>
      </section>

      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <div className="bg-orange-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-3 text-orange-800">The Cost of Returns</h2>
          <p className="text-gray-700">
            Each return incurs significant costs, estimated between <span className="font-semibold">€12.50 and €19.50</span>. This includes logistics, processing, inspection, repackaging, and potential depreciation or disposal of the item. For SMEs, these costs can severely impact profitability.
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-3 text-green-800">Environmental Impact</h2>
          <p className="text-gray-700">
            Beyond the financial burden, returns contribute to increased transportation emissions, packaging waste, and often lead to items being discarded rather than resold, adding to landfill problems. Reducing returns is a crucial step towards a more sustainable fashion industry.
          </p>
        </div>
      </section>

      <section className="bg-blue-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Introducing the Toolkit</h2>
        <p className="text-gray-700 mb-2">
          This toolkit is designed specifically for Small and Medium-sized Enterprises (SMEs) in the Dutch fashion sector. It provides insights, practical solutions, and data-driven tools to help you understand, manage, and ultimately reduce costly returns.
        </p>
        <p className="text-gray-700">
          Explore best practices, compare technology solutions, simulate potential ROI, and understand the unique Dutch market context to make informed decisions for your business.
        </p>
      </section>

      {/* Optional: You might want to add links or calls to action here later */}
      {/* Example:
      <div className="mt-8 text-center">
        <Link href="/comparator" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Explore Solutions
        </Link>
      </div>
      */}
    </div>
  );
}
