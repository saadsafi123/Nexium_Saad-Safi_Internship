'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Star, Printer, RefreshCw, Save, Clock, BarChart3, ChefHat } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface Recipe {
  recipe_name: string;
  description: string;
  ingredients_json: { item: string; quantity: string }[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  difficulty: string;
}

export function RecipeDisplay({ recipe, onGenerateNew }: { recipe: Recipe; onGenerateNew: () => void }) {
  const [isSaving, setIsSaving] = useState(false)
  const [savedRecipeId, setSavedRecipeId] = useState<string | null>(null)
  const [currentRating, setCurrentRating] = useState(0)

  const handleSave = async () => {
    setIsSaving(true)
    const response = await fetch('/api/save-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...recipe, rating: currentRating > 0 ? currentRating : null }),
    })
    const result = await response.json()

    if (response.ok && result.data) {
      toast.success("Recipe saved!")
      setSavedRecipeId(result.data[0].id)
    } else {
      toast.error("Could not save the recipe.")
    }
    setIsSaving(false)
  }

  const handlePrint = () => window.print()

  const handleRate = (rating: number) => {
    setCurrentRating(rating);

    if (savedRecipeId) {
       fetch('/api/rate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: savedRecipeId, rating }),
      }).then(res => {
        if(res.ok) toast.success(`Rating updated to ${rating} stars!`);
      });
    }
  }

  return (
    <Card className="mt-10 animate-fade-in-up">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-lora font-bold">{recipe.recipe_name}</CardTitle>
            <CardDescription className="pt-2 text-muted-foreground">{recipe.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onGenerateNew}><RefreshCw className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={handlePrint}><Printer className="h-4 w-4" /></Button>
            <Button onClick={handleSave} disabled={isSaving || !!savedRecipeId}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : savedRecipeId ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-4 text-sm text-center my-6">
            <div className="flex flex-col items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Prep: {recipe.prep_time} min</span></div>
            <div className="flex flex-col items-center gap-2"><ChefHat className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Cook: {recipe.cook_time} min</span></div>
            <div className="flex flex-col items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><span className="text-muted-foreground capitalize">{recipe.difficulty}</span></div>
        </div>
        <Separator className="my-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold font-lora mb-4">Ingredients</h3>
            <ul className="space-y-2 text-muted-foreground">
              {recipe.ingredients_json.map((ing, index) => (
                <li key={index} className="flex gap-2">
                  <span>-</span>
                  <div><strong>{ing.quantity}</strong> {ing.item}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold font-lora mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-center">
            <h3 className="text-lg font-lora mb-2">Rate this Recipe</h3>
            <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors ${currentRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRate(star)}
                />
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  )
}