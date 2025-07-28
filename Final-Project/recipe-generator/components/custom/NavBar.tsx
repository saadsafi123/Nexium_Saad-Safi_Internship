'use client'

import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Determine the active tab based on the current path
  const activeTab = pathname.split('/').pop() || 'recipe'

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">DishGen 🍳</h1>
          <Tabs value={activeTab} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="recipe" onClick={() => router.push('/recipe')}>Recipe</TabsTrigger>
              <TabsTrigger value="my-recipes" onClick={() => router.push('/my-recipes')}>My Recipes</TabsTrigger>
              <TabsTrigger value="explore" onClick={() => router.push('/explore')}>Explore</TabsTrigger>
              <TabsTrigger value="about" onClick={() => router.push('/about')}>About</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}