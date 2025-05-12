import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CO2 Calculator | Dutch Return Toolkit',
  description: 'Calculate the environmental impact of your shipping and returns in CO2 emissions.',
};

export default function CO2CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 