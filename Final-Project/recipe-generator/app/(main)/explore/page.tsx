// app/(main)/my-recipes/page.tsx

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default async function MyRecipesPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { data: recipes, error } = await supabase
    .from('saved_recipes')
    .select('*')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="p-4">Could not load your recipes. Please try again later.</p>
  }
  
  if (!recipes) {
    return <p className="p-4">An error occurred while fetching recipes.</p>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Saved Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: any) => (
          <Card key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.recipe_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground capitalize">{recipe.cuisine_type || 'N/A'} | {recipe.difficulty || 'N/A'}</p>
            </CardContent>
          </Card>
        ))}
        {recipes.length === 0 && (
          <div className="col-span-full text-center">
            <p>You haven't saved any recipes yet. <Link href="/recipe" className="text-primary underline">Generate one!</Link></p>
          </div>
        )}
      </div>
    </div>
  )
}