// app/(main)/layout.tsx

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers' // Make sure this is from 'next/headers'
import { redirect } from 'next/navigation'
import NavBar from '@/components/custom/NavBar'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
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

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}