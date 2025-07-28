'use client'

import { useState } from 'react'
import { RecipeForm } from '@/components/custom/RecipeForm'
import { RecipeDisplay } from '@/components/custom/RecipeDisplay'
import { RecipeSkeleton } from '@/components/custom/RecipeSkeleton'
import { type Recipe } from '@/types'

export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateNew = () => {
    setRecipe(null)
  }

  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24">
      <div className="mb-12 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-lora bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
          Generate Your Next Meal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let our AI chef create a delicious recipe from the ingredients you have on hand.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <RecipeForm 
          onRecipeGenerated={setRecipe}
          onIsLoadingChange={setIsLoading}
          isLoading={isLoading}
        />
      </div>
      
      {isLoading && <RecipeSkeleton />}
      {recipe && !isLoading && <RecipeDisplay recipe={recipe as Recipe} onGenerateNew={handleGenerateNew} />}
    </div>
  )
}