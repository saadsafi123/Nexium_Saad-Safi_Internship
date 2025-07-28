// app/api/save-recipe/route.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers' // Make sure this is from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const recipeData = await request.json()
  const cookieStore = await cookies() // <-- ADD AWAIT HERE

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

  // ... rest of the file is the same
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { data, error } = await supabase
    .from('saved_recipes')
    .insert([{ ...recipeData, user_id: session.user.id }])
    .select()

  if (error) {
    console.error('Error saving recipe:', error)
    return new NextResponse('Failed to save recipe', { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}