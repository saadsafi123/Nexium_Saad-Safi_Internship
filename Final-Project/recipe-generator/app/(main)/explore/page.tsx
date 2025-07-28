import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ExploreTabs } from '@/components/custom/ExploreTabs'
import { connectToMongoDB } from '@/lib/mongodb'
import type { SupabaseClient } from '@supabase/supabase-js'

async function getMostSaved(supabase: SupabaseClient) {
  const { data, error } = await supabase.rpc('get_most_saved_recipes')
  if (error) console.error('Error fetching most saved:', error)
  return data || []
}

async function getHighestRated(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('saved_recipes')
    .select('id, recipe_name, description, rating, cook_time')
    .not('rating', 'is', null)
    .order('rating', { ascending: false })
    .limit(10)
  if (error) console.error('Error fetching highest rated:', error)
  return data || []
}

async function getRecentGenerations() {
  try {
    const { db } = await connectToMongoDB()
    const logs = await db
      .collection("recipe_generation_logs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()
    
    return JSON.parse(JSON.stringify(logs))
  } catch (error) {
    console.error('Error fetching recent generations:', error)
    return []
  }
}

export default async function ExplorePage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const [mostSaved, highestRated, recentGenerations] = await Promise.all([
    getMostSaved(supabase),
    getHighestRated(supabase),
    getRecentGenerations()
  ])

  return (
    <div className="container mx-auto py-10 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-lora bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">Explore Community Recipes</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover what&apos;s popular and trending in the DishGen community.
        </p>
      </div>
      <ExploreTabs 
        mostSaved={mostSaved} 
        highestRated={highestRated}
        recentGenerations={recentGenerations}
      />
    </div>
  )
}