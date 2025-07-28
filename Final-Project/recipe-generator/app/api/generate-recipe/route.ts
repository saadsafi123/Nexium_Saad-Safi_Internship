// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   // We'll use the form data later when we connect to n8n
//   const formData = await request.json()
//   console.log('Received on backend:', formData)

//   // --- MOCK RECIPE DATA ---
//   // For now, we ignore the form data and return a hardcoded recipe.
//   const mockRecipe = {
//     recipe_name: 'Mock Garlic Herb Chicken',
//     ingredients_json: [
//       { item: 'Chicken Breast', quantity: '2' },
//       { item: 'Olive Oil', quantity: '2 tbsp' },
//       { item: 'Garlic', quantity: '3 cloves, minced' },
//       { item: 'Dried Herbs (e.g., oregano, thyme)', quantity: '1 tsp' },
//       { item: 'Salt and Pepper', quantity: 'to taste' },
//     ],
//     instructions: [
//       'Preheat oven to 400°F (200°C).',
//       'In a small bowl, mix olive oil, minced garlic, dried herbs, salt, and pepper.',
//       'Place chicken breasts in a baking dish and coat them evenly with the oil mixture.',
//       'Bake for 20-25 minutes, or until the chicken is cooked through.',
//       'Let it rest for a few minutes before serving.',
//     ],
//     prep_time: 10,
//     cook_time: 25,
//     cuisine_type: 'Italian',
//     meal_type: 'Dinner',
//     difficulty: 'Easy',
//   }
//   // --- END OF MOCK DATA ---

//   // Simulate a network delay
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   return NextResponse.json(mockRecipe)
// }

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();

  // IMPORTANT: Replace this with your LOCAL n8n Test URL from Step 1
  const n8nWebhookUrl = 'http://localhost:5678/webhook-test/14aeae78-b01b-4da5-8abf-a74578104d6f';

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // API Key is usually not needed for local n8n instances
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Local n8n workflow failed:', await response.text());
      return new NextResponse('Failed to generate recipe.', { status: 500 });
    }

    const recipe = await response.json();
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error calling local n8n:", error);
    return new NextResponse('Could not connect to the n8n service.', { status: 500 });
  }
}