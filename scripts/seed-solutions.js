// Script to seed the solutions table with sample data
// Run with:
// node scripts/seed-solutions.js --url=https://your-project-id.supabase.co --key=your-service-role-key

const { createClient } = require('@supabase/supabase-js');

// Parse command line arguments
const args = process.argv.slice(2).reduce((result, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    result[key] = value;
  }
  return result;
}, {});

// Try to load from environment variables first, then command line args
require('dotenv').config();
const supabaseUrl = args.url || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = args.key || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error("Missing Supabase URL. Provide with --url or NEXT_PUBLIC_SUPABASE_URL env var");
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error("Missing Supabase key. Provide with --key or SUPABASE_SERVICE_ROLE_KEY env var");
  process.exit(1);
}

console.log(`Using Supabase URL: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample solution data based on companies with logos in the public/logos directory
const solutionData = [
  {
    name: "Mopinion",
    category: "Feedback Analysis",
    description: "Customer feedback platform that helps companies collect and analyze feedback to improve customer experience and reduce returns.",
    reduction_rate_low: 10,
    reduction_rate_high: 20,
    reduction_rate_basis: "Based on improved product descriptions and customer experience",
    other_benefits: ["Improved customer satisfaction", "Better product insights"],
    integration_complexity: "Simple (Plug-and-Play)",
    indicative_cost: "$$",
    privacy_concern_level: "Low",
    product_suitability_notes: "Works best for medium to large retailers with high traffic",
    example_vendors: ["Mopinion"]
  },
  {
    name: "Returnista",
    category: "Return Management",
    description: "Specialized return management system that streamlines the return process while gathering data to prevent future returns.",
    reduction_rate_low: 15,
    reduction_rate_high: 30,
    reduction_rate_basis: "Based on improved return policies and customer education",
    other_benefits: ["Streamlined return process", "Enhanced customer loyalty"],
    integration_complexity: "Moderate (Configuration Needed)",
    indicative_cost: "$$",
    privacy_concern_level: "Low",
    product_suitability_notes: "Ideal for all types of fashion retailers",
    example_vendors: ["Returnista"]
  },
  {
    name: "Returnless",
    category: "Return Management",
    description: "AI-powered platform that helps prevent returns through predictive analysis and customer behavior patterns.",
    reduction_rate_low: 18,
    reduction_rate_high: 35,
    reduction_rate_basis: "Based on AI predictive analytics",
    other_benefits: ["Reduced operational costs", "Environmental impact reduction"],
    integration_complexity: "Moderate (Configuration Needed)",
    indicative_cost: "$$$",
    privacy_concern_level: "Medium",
    product_suitability_notes: "Best for retailers with large product catalogs",
    example_vendors: ["Returnless"]
  },
  {
    name: "EasySize",
    category: "Size Recommendation",
    description: "Size recommendation platform that helps customers find the right size based on their body measurements and previous purchases.",
    reduction_rate_low: 20,
    reduction_rate_high: 40,
    reduction_rate_basis: "Based on accurate size recommendations",
    other_benefits: ["Increased conversion rates", "Higher customer satisfaction"],
    integration_complexity: "Simple (Plug-and-Play)",
    indicative_cost: "$$",
    privacy_concern_level: "Low",
    product_suitability_notes: "Works for all clothing retailers",
    example_vendors: ["EasySize"]
  },
  {
    name: "Faslet",
    category: "Size Recommendation",
    description: "Advanced sizing tool that combines AI with detailed garment measurements to recommend the perfect fit.",
    reduction_rate_low: 25,
    reduction_rate_high: 45,
    reduction_rate_basis: "Based on precise fit technology",
    other_benefits: ["Reduced cart abandonment", "Higher customer confidence"],
    integration_complexity: "Simple (Plug-and-Play)",
    indicative_cost: "$$",
    privacy_concern_level: "Low",
    product_suitability_notes: "Especially effective for complex sizing items like jeans and bras",
    example_vendors: ["Faslet"]
  },
  {
    name: "True Fit",
    category: "Size Recommendation",
    description: "Personalized fit recommendation platform using a data-driven approach to match customers with correctly sized products.",
    reduction_rate_low: 22,
    reduction_rate_high: 38,
    reduction_rate_basis: "Based on data-driven fit technology",
    other_benefits: ["Enhanced shopping experience", "Customer profile insights"],
    integration_complexity: "Moderate (Configuration Needed)",
    indicative_cost: "$$$",
    privacy_concern_level: "Medium",
    product_suitability_notes: "Best for multi-brand retailers with diverse catalog",
    example_vendors: ["True Fit"]
  },
  {
    name: "3DLook",
    category: "VTO/AR",
    description: "Body scanning technology that creates accurate 3D models of customers for virtual try-on and precise sizing.",
    reduction_rate_low: 30,
    reduction_rate_high: 50,
    reduction_rate_basis: "Based on virtual try-on accuracy",
    other_benefits: ["Immersive shopping experience", "Detailed body measurement data"],
    integration_complexity: "Complex (Backend Development Required)",
    indicative_cost: "$$$$",
    privacy_concern_level: "High",
    product_suitability_notes: "Suitable for premium fashion brands",
    example_vendors: ["3DLook"]
  },
  {
    name: "Reactive Reality",
    category: "VTO/AR",
    description: "AR-based virtual try-on solution that lets customers visualize how clothing items will look on them.",
    reduction_rate_low: 25,
    reduction_rate_high: 45,
    reduction_rate_basis: "Based on realistic visualization",
    other_benefits: ["Increased engagement", "Reduced decision anxiety"],
    integration_complexity: "Complex (Backend Development Required)",
    indicative_cost: "$$$",
    privacy_concern_level: "Medium",
    product_suitability_notes: "Works well for visual-heavy fashion items",
    example_vendors: ["Reactive Reality"]
  },
  {
    name: "Style.me",
    category: "VTO/AR",
    description: "Virtual fitting room technology that creates personalized avatars for trying on clothes online.",
    reduction_rate_low: 28,
    reduction_rate_high: 47,
    reduction_rate_basis: "Based on accurate virtual fitting",
    other_benefits: ["Higher conversion rates", "Increased time on site"],
    integration_complexity: "Complex (Backend Development Required)",
    indicative_cost: "$$$",
    privacy_concern_level: "Medium",
    product_suitability_notes: "Great for full-outfit visualization",
    example_vendors: ["Style.me"]
  },
  {
    name: "Pictofit",
    category: "VTO/AR",
    description: "3D virtual try-on solution with realistic cloth physics and personalized avatar creation.",
    reduction_rate_low: 27,
    reduction_rate_high: 46,
    reduction_rate_basis: "Based on realistic fabric simulation",
    other_benefits: ["Reduced uncertainty", "Enhanced brand perception"],
    integration_complexity: "Complex (Backend Development Required)",
    indicative_cost: "$$$",
    privacy_concern_level: "Medium",
    product_suitability_notes: "Excellent for premium apparel with complex fabrics",
    example_vendors: ["Pictofit"]
  }
];

async function seedSolutions() {
  console.log('Seeding solutions table...');
  
  try {
    // First, clear existing data to avoid duplicates
    const { error: deleteError } = await supabase
      .from('solutions')
      .delete()
      .neq('id', 'none'); // Delete all rows
    
    if (deleteError) {
      console.error('Error clearing existing solutions:', deleteError);
      return;
    }
    
    // Insert new solution data
    const { data, error } = await supabase
      .from('solutions')
      .insert(solutionData);
    
    if (error) {
      console.error('Error inserting solutions:', error);
      return;
    }
    
    console.log('Successfully seeded solutions table with', solutionData.length, 'records');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the seed function
seedSolutions()
  .catch(console.error)
  .finally(() => process.exit(0)); 