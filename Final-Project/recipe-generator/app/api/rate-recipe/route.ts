// app/api/rate-recipe/route.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { recipeId, rating } = await request.json()
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { error } = await supabase
    .from('saved_recipes')
    .update({ rating: rating })
    .match({ id: recipeId, user_id: user.id })

  if (error) {
    console.error('Error saving rating:', error)
    return new NextResponse('Failed to save rating', { status: 500 })
  }

  return NextResponse.json({ success: true })
}