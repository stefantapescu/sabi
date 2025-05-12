import Image from 'next/image';
import { FC } from 'react';

interface CompanyLogoProps {
  company: string;
  className?: string;
}

const CompanyLogo: FC<CompanyLogoProps> = ({ company, className = '' }) => {
  // Extract just the company name from possible formats like "Company - Product Name"
  const extractCompanyName = (fullName: string): string => {
    // First, normalize to lowercase and trim
    const normalized = fullName.toLowerCase().trim();
    
    // Split by hyphen and take the first part (usually the company name)
    if (normalized.includes('-')) {
      return normalized.split('-')[0].trim();
    }
    
    // If no hyphen, return the full name or check for other patterns
    return normalized;
  };
  
  const normalizedName = extractCompanyName(company);
  
  // Map company names to their logo files
  const getLogoPath = (name: string): string => {
    const logoMap: Record<string, string> = {
      'mopinion': '/logos/mopinion-logo.svg',
      'returnista': '/logos/returnista-logo.png',
      'returnless': '/logos/returnless-logo.png',
      'easysize': '/logos/Easysize Logo.png',
      'faslet': '/logos/Faslet Green 3000.png.webp',
      'true fit': '/logos/truefit-logo.jpg',
      '3dlook': '/logos/3dlook-logo.jpeg',
      'reactive reality': '/logos/reactivereality-logo.png',
      'style.me': '/logos/styleme-logo.png',
      'pictofit': '/logos/Pictofit Logo.webp'
    };

    // Return the logo path if found, or an empty string if not
    return logoMap[name] || '';
  };

  const logoPath = getLogoPath(normalizedName);

  // If we have a logo path, render the image
  if (logoPath) {
    // Special case for Mopinion - 50% larger logo
    if (normalizedName === 'mopinion') {
      return (
        <div className={`w-48 h-48 flex-shrink-0 overflow-hidden rounded-md ${className}`}>
          <Image 
            src={logoPath}
            alt={`${company} logo`}
            width={192}
            height={192}
            className="object-contain"
          />
        </div>
      );
    }
    
    return (
      <div className={`w-24 h-24 flex-shrink-0 overflow-hidden rounded-md ${className}`}>
        <Image 
          src={logoPath}
          alt={`${company} logo`}
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
    );
  }

  // Fallback to a colored letter logo
  const getInitial = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  const getColor = (name: string): string => {
    const colors = [
      '#007bff', '#28a745', '#6f42c1', '#fd7e14', 
      '#20c997', '#0d6efd', '#dc3545', '#0dcaf0', '#d63384'
    ];
    
    // Create a simple hash of the company name to get a consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initial = getInitial(normalizedName);
  const bgColor = getColor(normalizedName);

  return (
    <div 
      className={`w-24 h-24 flex-shrink-0 flex items-center justify-center rounded-md ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-white font-bold text-2xl">{initial}</span>
    </div>
  );
};

export default CompanyLogo; 