import { NextResponse } from 'next/server'
import { connectToMongoDB } from '@/lib/mongodb'
import { GoogleGenerativeAI } from '@google/generative-ai'

// 1. Define a specific type for the form data to remove 'any'.
type FormData = {
  ingredients: string;
  ingredientStrictness: 'strict' | 'flexible';
  generationMode: 'n8n' | 'gemini';
  cuisine?: string;
  mealType?: string;
  difficulty?: string;
  dietary?: string[];
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use the new FormData type here
async function runGemini(formData: FormData) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

  const strictnessInstruction = formData.ingredientStrictness === 'strict'
    ? 'You MUST ONLY use the ingredients from the list. Do not add any other food items, not even common staples like oil, salt, or water unless they are listed.'
    : 'You can add small amounts of common pantry staples like oil, salt, pepper, and water if needed to make a coherent recipe.';

  const prompt = `
    You are an expert chef named "DishGen AI". A user has provided you with the following ingredients and preferences. Your task is to generate a single, creative, and delicious recipe.

    User's Ingredients:
    ${formData.ingredients}

    Preferences:
    - Cuisine: ${formData.cuisine || 'Any'}
    - Meal Type: ${formData.mealType || 'Any'}
    - Difficulty: ${formData.difficulty || 'Any'}
    - Dietary Needs: ${formData.dietary?.join(', ') || 'None'}

    Ingredient Usage Rule: ${strictnessInstruction}

    Based on this, generate a recipe. Your response MUST be a single, minified JSON object with no extra text or markdown formatting. The JSON object must have the following structure:
    {
      "recipe_name": "string",
      "description": "string (a brief, enticing description of the dish)",
      "prep_time": number (in minutes),
      "cook_time": number (in minutes),
      "difficulty": "string (Easy, Medium, or Hard)",
      "cuisine_type": "string",
      "ingredients_json": [{"item": "string", "quantity": "string"}],
      "instructions": ["string (step 1)", "string (step 2)"]
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  const cleanedJsonString = responseText.replace(/```json\n|\n```/g, '').trim();
  try {
    const parsedJson = JSON.parse(cleanedJsonString);
    return parsedJson;
  } catch (_error) { // 2. Fix the unused variable warning by adding an underscore
    console.error("Failed to parse Gemini response:", cleanedJsonString);
    throw new Error("The AI returned a recipe in an unexpected format. Please try again.");
  }
}

export async function POST(request: Request) {
  const formData = await request.json()
  let recipe;

  try {
    if (formData.generationMode === 'gemini') {
      console.log("Using direct Gemini generation...");
      recipe = await runGemini(formData);
    } else {
      console.log("Using n8n workflow generation...");
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
      if (!n8nWebhookUrl) throw new Error("N8N_WEBHOOK_URL is not configured.");

      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const n8nResult = await n8nResponse.json()
      if (!n8nResponse.ok || n8nResult.error) {
        throw new Error(n8nResult.error || 'n8n workflow failed')
      }
      recipe = n8nResult;
    }

    try {
      const { db } = await connectToMongoDB();
      await db.collection("recipe_generation_logs").insertOne({
        request: formData,
        response: recipe,
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error("MongoDB logging failed:", dbError);
    }

    return NextResponse.json(recipe)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in generate-recipe route:", errorMessage)
    return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
}