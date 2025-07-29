'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trash2, Clock, BarChart3, ChefHat } from 'lucide-react'
import { StarRatingInput } from '@/components/custom/StarRatingInput'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from '@/components/ui/separator'
import { type Recipe } from '@/types'

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const params = useParams()
  const router = useRouter()
  const recipeId = params.id as string

  const fetchRecipe = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from('saved_recipes').select('*').eq('id', recipeId).single()
    if (error || !data) {
      toast.error("Could not find the recipe.")
      router.push('/my-recipes')
    } else {
      setRecipe(data as Recipe)
    }
  }, [recipeId, router])

  useEffect(() => {
    if (recipeId) fetchRecipe()
  }, [recipeId, fetchRecipe])

  const confirmDelete = async () => {
    const response = await fetch(`/api/delete-recipe`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId: recipeId }),
    })

    if (!response.ok) {
      toast.error('Failed to delete recipe. Please try again.')
    } else {
      toast.success('Recipe deleted!')
      router.push('/my-recipes')
    }
  }

  const handleRate = async (rating: number) => {
    setRecipe(prev => prev ? { ...prev, rating } : null);
    const response = await fetch('/api/rate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, rating }),
    });
    if (!response.ok) {
      toast.error("Could not save your rating.");
      fetchRecipe();
    } else {
      toast.success(`Rated ${rating} stars!`);
    }
  };

  if (!recipe) {
    return (
      <div className="container mx-auto max-w-3xl py-10 animate-pulse">
        <Card className="h-[600px]"></Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 animate-fade-in-up">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-4xl font-bold font-lora">{recipe.recipe_name}</CardTitle>
              <CardDescription className="pt-2 text-lg">{recipe.description}</CardDescription>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete your saved recipe.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-center my-6">
              <div className="flex flex-col items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Prep: {recipe.prep_time} min</span></div>
              <div className="flex flex-col items-center gap-2"><ChefHat className="h-5 w-5 text-primary" /><span className="text-muted-foreground">Cook: {recipe.cook_time} min</span></div>
              <div className="flex flex-col items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><span className="text-muted-foreground capitalize">{recipe.difficulty}</span></div>
              <div>
                  <p className="text-muted-foreground mb-2">Your Rating</p>
                  <StarRatingInput initialRating={recipe.rating || 0} onRate={handleRate} />
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