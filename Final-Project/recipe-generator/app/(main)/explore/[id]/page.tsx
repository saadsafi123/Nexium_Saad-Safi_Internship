import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StarRatingDisplay } from '@/components/custom/StarRatingDisplay'
import { Separator } from '@/components/ui/separator'
import { Clock, BarChart3, ChefHat } from 'lucide-react'

type Props = {
  params: { id: string };
};

type Ingredient = {
  item: string;
  quantity: string;
}

export const dynamic = 'force-dynamic';

export default async function PublicRecipeDetailPage({ params }: Props) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const { data: recipe } = await supabase
    .from('saved_recipes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!recipe) {
    notFound()
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
                {recipe.ingredients_json.map((ing: Ingredient, index: number) => (
                  <li key={index} className="flex gap-2"><span>-</span><div><strong>{ing.quantity}</strong> {ing.item}</div></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold font-lora mb-4">Instructions</h3>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                {recipe.instructions.map((step: string, index: number) => (
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