export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white p-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Dutch Fashion Return Reduction Toolkit. Based on research by Sabine Claassens / AMFI.
        <p className="mt-1 text-gray-300">Disclaimer: Information provided is for guidance only and does not constitute financial advice.</p>
      </div>
    </footer>
  );
}
