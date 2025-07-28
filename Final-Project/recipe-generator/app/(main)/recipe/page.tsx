'use client'

import { useState } from 'react'
import { RecipeForm } from '@/components/custom/RecipeForm'
import { RecipeDisplay } from '@/components/custom/RecipeDisplay'

export default function RecipePage() {
  const [recipe, setRecipe] = useState(null)

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Generate Your Next Meal</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let our AI chef create a delicious recipe from the ingredients you have on hand.
        </p>
      </div>

      <RecipeForm onRecipeGenerated={setRecipe} />
      
      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  )
}