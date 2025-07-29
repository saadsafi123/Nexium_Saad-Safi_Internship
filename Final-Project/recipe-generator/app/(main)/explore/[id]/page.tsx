'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams, notFound } from 'next/navigation'
// import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StarRatingDisplay } from '@/components/custom/StarRatingDisplay'
import { Separator } from '@/components/ui/separator'
// import { Clock, BarChart3, ChefHat } from 'lucide-react'

type Ingredient = { item: string; quantity: string };
type Recipe = {
  id: string;
  recipe_name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  difficulty: string;
  rating: number | null;
  ingredients_json: Ingredient[];
  instructions: string[];
};

export default function PublicRecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const recipeId = params.id as string

  const fetchRecipe = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('id', recipeId)
      .single()

    if (error || !data) {
      notFound()
    } else {
      setRecipe(data as Recipe)
    }
    setIsLoading(false)
  }, [recipeId])

  useEffect(() => {
    if (recipeId) {
      fetchRecipe()
    }
  }, [recipeId, fetchRecipe])
  
  if (isLoading) {
    return (
       <div className="container mx-auto max-w-3xl py-10 animate-pulse">
        <Card className="h-[600px]"></Card>
      </div>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 animate-fade-in-up">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-4xl font-bold font-lora">{recipe.recipe_name}</CardTitle>
            <CardDescription className="pt-2 text-lg">{recipe.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-center my-6">
              <div><p className="text-muted-foreground">Prep Time</p><p className="font-bold">{recipe.prep_time} mins</p></div>
              <div><p className="text-muted-foreground">Cook Time</p><p className="font-bold">{recipe.cook_time} mins</p></div>
              <div><p className="text-muted-foreground">Difficulty</p><p className="font-bold capitalize">{recipe.difficulty}</p></div>
              <div>
                  <p className="text-muted-foreground">Rating</p>
                  <StarRatingDisplay rating={recipe.rating} />
              </div>
          </div>
          <Separator className="my-4" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold font-lora mb-4">Ingredients</h3>
              <ul className="space-y-2 text-muted-foreground">
                {recipe.ingredients_json.map((ing, index) => (
                  <li key={index} className="flex gap-2"><span>-</span><div><strong>{ing.quantity}</strong> {ing.item}</div></li>
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
        </CardContent>
      </Card>
    </div>
  )
}