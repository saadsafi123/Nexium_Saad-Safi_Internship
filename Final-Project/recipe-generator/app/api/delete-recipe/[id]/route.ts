// app/api/delete-recipe/[id]/route.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = params.id
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

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Delete the recipe, ensuring the user can only delete their own recipes
  const { error } = await supabase
    .from('saved_recipes')
    .delete()
    .match({ id: recipeId, user_id: session.user.id })

  if (error) {
    console.error('Error deleting recipe:', error)
    return new NextResponse('Failed to delete recipe', { status: 500 })
  }

  return NextResponse.json({ success: true })
}