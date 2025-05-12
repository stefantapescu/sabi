import React from 'react';
import { render, screen } from '@testing-library/react';
import CompanyLogo from '../components/CompanyLogo';

// Mock the Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} data-testid="next-image" />;
  }
}));

describe('CompanyLogo Component', () => {
  const companyNames = [
    'Mopinion',
    'Returnista',
    'Returnless',
    'EasySize',
    'Faslet',
    'True Fit',
    '3DLook',
    'Reactive Reality',
    'Style.me',
    'Pictofit'
  ];

  test('renders image for companies with logos', () => {
    companyNames.forEach(name => {
      const { container, getByTestId, unmount } = render(<CompanyLogo company={name} />);
      
      try {
        // Check if image is rendered (expect Image component to be used)
        const image = getByTestId('next-image');
        expect(image).toBeInTheDocument();
        
        // Verify the src attribute contains the expected company name
        const normalizedName = name.toLowerCase().trim();
        expect(image.getAttribute('src')).toContain(normalizedName.replace(/\s+/g, '').replace('.', ''));
      } catch (error) {
        console.error(`Test failed for company: ${name}`);
        throw error;
      } finally {
        unmount();
      }
    });
  });

  test('renders fallback for companies without logos', () => {
    const { container } = render(<CompanyLogo company="Unknown Company" />);
    
    // Should not find an image for unknown company
    expect(container.querySelector('img')).toBeNull();
    
    // Should render a div with the initial letter
    const fallbackDiv = container.querySelector('div > span');
    expect(fallbackDiv).toBeInTheDocument();
    expect(fallbackDiv?.textContent).toBe('U'); // Initial of "Unknown"
  });

  test('applies custom className if provided', () => {
    const customClass = 'custom-test-class';
    const { container } = render(<CompanyLogo company="Mopinion" className={customClass} />);
    
    // The root div should have the custom class
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).toContain(customClass);
  });
}); 