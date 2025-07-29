import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { recipeId } = await request.json();
  const cookieStore =await cookies()

  if (!recipeId) {
    return new NextResponse('Recipe ID is missing', { status: 400 });
  }
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

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