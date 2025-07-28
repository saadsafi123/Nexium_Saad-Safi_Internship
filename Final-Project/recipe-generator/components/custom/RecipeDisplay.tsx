// components/custom/RecipeDisplay.tsx

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from "sonner" // <-- Import toast from sonner

interface Recipe {
  recipe_name: string;
  ingredients_json: { item: string; quantity: string }[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
}

export function RecipeDisplay({ recipe }: { recipe: Recipe }) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const response = await fetch('/api/save-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })

    if (response.ok) {
      toast.success("Recipe saved to your collection.")
    } else {
      toast.error("Could not save the recipe.")
    }
    setIsSaving(false)
  }

  return (
    <Card className="mt-10 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl">{recipe.recipe_name}</CardTitle>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Recipe'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <p><strong>Prep Time:</strong> {recipe.prep_time} mins</p>
          <p><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients_json.map((ing, index) => (
              <li key={index}>
                <strong>{ing.quantity}</strong> {ing.item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}