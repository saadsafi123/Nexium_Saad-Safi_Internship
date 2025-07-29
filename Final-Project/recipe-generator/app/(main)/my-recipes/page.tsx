'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { StarRatingDisplay } from '@/components/custom/StarRatingDisplay'
import { Clock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Recipe = {
  id: string;
  recipe_name: string;
  description: string | null;
  cook_time: number | null;
  rating: number | null;
};

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at,desc')

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      const [column, order] = sortBy.split(',')
      const isAscending = order === 'asc'

      const { data, error } = await supabase
        .from('saved_recipes')
        .select('id, recipe_name, description, cook_time, rating')
        .eq('user_id', session.user.id)
        .order(column, { ascending: isAscending })

      if (error) {
        toast.error('Could not load your recipes.')
      } else {
        setRecipes(data as Recipe[])
      }
    }
    setIsLoading(false)
  }, [sortBy])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) return recipes
    return recipes.filter(recipe =>
      recipe.recipe_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [recipes, searchTerm])

  if (isLoading) {
    return (
       <div className="container mx-auto py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-lora bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">My Saved Recipes</h1>
            <p className="mt-4 text-lg text-muted-foreground">Your personal collection of culinary creations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => <Card key={i} className="h-56"></Card>)}
          </div>
       </div>
    )
  }

  return (
    <div className="container mx-auto py-10 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-lora bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">My Saved Recipes</h1>
        <p className="mt-4 text-lg text-muted-foreground">Your personal collection of culinary creations.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Input
          placeholder="Search your recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at,desc">Newest</SelectItem>
            <SelectItem value="created_at,asc">Oldest</SelectItem>
            <SelectItem value="rating,desc">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link href={`/my-recipes/${recipe.id}`} key={recipe.id}>
            <Card className="h-full hover:border-primary transition-colors flex flex-col">
              <CardHeader>
                <CardTitle>{recipe.recipe_name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{recipe.description || 'No description available.'}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <StarRatingDisplay rating={recipe.rating} />
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cook_time || 'N/A'} min</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
        
        {recipes.length > 0 && filteredRecipes.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p>No recipes found matching your search.</p>
          </div>
        )}

        {recipes.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p>You haven&apos;t saved any recipes yet. <Link href="/recipe" className="text-primary underline">Generate one!</Link></p>
          </div>
        )}
      </div>
    </div>
  )
}