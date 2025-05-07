import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dutch Return Toolkit
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/comparator" className="hover:text-gray-300">Solution Comparator</Link></li>
          <li><Link href="/roi-simulator" className="hover:text-gray-300">ROI Simulator</Link></li>
          <li><Link href="/best-practices" className="hover:text-gray-300">Best Practices</Link></li>
          <li><Link href="/dutch-context" className="hover:text-gray-300">Dutch Context</Link></li>
          <li><Link href="/case-studies" className="hover:text-gray-300">Case Studies</Link></li>
        </ul>
      </nav>
    </header>
  );
}
