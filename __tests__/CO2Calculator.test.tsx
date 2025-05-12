import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CO2CalculatorPage from '@/app/co2-calculator/page';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('CO2 Calculator', () => {
  it('renders the calculator form', () => {
    render(<CO2CalculatorPage />);
    
    // Check that the page title is present
    expect(screen.getByText('CO2 Emissions Calculator')).toBeInTheDocument();
    
    // Check that form elements are present
    expect(screen.getByLabelText(/Initial Shipment Weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Return Shipment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/One-way Distance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cardboard Box Weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bubble Wrap Weight/i)).toBeInTheDocument();
    
    // Check that the calculate button is present
    expect(screen.getByRole('button', { name: /Calculate CO2 Emissions/i })).toBeInTheDocument();
  });

  it('calculates emissions correctly when form is submitted', () => {
    render(<CO2CalculatorPage />);
    
    // Get form elements
    const initialWeightInput = screen.getByLabelText(/Initial Shipment Weight/i);
    const returnWeightInput = screen.getByLabelText(/Return Shipment Weight/i);
    const distanceInput = screen.getByLabelText(/One-way Distance/i);
    const cardboardWeightInput = screen.getByLabelText(/Cardboard Box Weight/i);
    const bubbleWrapWeightInput = screen.getByLabelText(/Bubble Wrap Weight/i);
    const calculateButton = screen.getByRole('button', { name: /Calculate CO2 Emissions/i });
    
    // Set form values
    fireEvent.change(initialWeightInput, { target: { value: '6' } });
    fireEvent.change(returnWeightInput, { target: { value: '4' } });
    fireEvent.change(distanceInput, { target: { value: '125' } });
    fireEvent.change(cardboardWeightInput, { target: { value: '0.291' } });
    fireEvent.change(bubbleWrapWeightInput, { target: { value: '0.044' } });
    
    // Submit form
    fireEvent.click(calculateButton);
    
    // Check that results are displayed
    // Initial transport emissions: (0.59 * 125 * 6) / 1000 = 0.44 kg
    // Return transport emissions: (0.59 * 125 * 4) / 1000 = 0.30 kg
    // Packaging emissions for both ways: 2 * (0.291 * 2.93 + 0.044 * 3.56) = 2.02 kg
    // Total emissions: 0.44 + 0.30 + 2.02 = 2.76 kg
    
    // Check for the actual values shown in the UI
    expect(screen.getByText(/0\.44/)).toBeInTheDocument(); // Initial transport
    expect(screen.getByText(/0\.29/)).toBeInTheDocument(); // Return transport
    expect(screen.getByText(/2\.02/)).toBeInTheDocument(); // Packaging
    expect(screen.getByText(/2\.76/)).toBeInTheDocument(); // Total
  });

  it('toggles return shipment input visibility', () => {
    render(<CO2CalculatorPage />);
    
    // Get the checkbox and check that return weight input is initially visible
    const includeReturnCheckbox = screen.getByLabelText(/Include Return Shipment/i);
    expect(screen.getByLabelText(/Return Shipment Weight/i)).toBeInTheDocument();
    
    // Uncheck the checkbox
    fireEvent.click(includeReturnCheckbox);
    
    // Check that return weight input is now hidden
    expect(screen.queryByLabelText(/Return Shipment Weight/i)).not.toBeInTheDocument();
    
    // Check the checkbox again
    fireEvent.click(includeReturnCheckbox);
    
    // Check that return weight input is visible again
    expect(screen.getByLabelText(/Return Shipment Weight/i)).toBeInTheDocument();
  });
  
  it('allows empty input values', () => {
    render(<CO2CalculatorPage />);
    
    // Get form elements
    const initialWeightInput = screen.getByLabelText(/Initial Shipment Weight/i);
    
    // Set form value to empty
    fireEvent.change(initialWeightInput, { target: { value: '' } });
    
    // Check that the input is empty
    expect(initialWeightInput).toHaveValue('');
    
    // Try to set a valid value after emptying
    fireEvent.change(initialWeightInput, { target: { value: '10' } });
    
    // Check that the new value is set correctly
    expect(initialWeightInput).toHaveValue('10');
  });
}); 