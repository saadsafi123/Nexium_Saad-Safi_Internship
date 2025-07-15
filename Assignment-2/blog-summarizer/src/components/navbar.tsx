// src/components/navbar.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
// import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MainNav } from './main-nav'; 
import { ThemeToggle } from './theme-toggle'; 
// import { cn } from '@/lib/utils';

export function Navbar() {
//   const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="flex items-center space-x-2 mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-extrabold text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Nexium
            </span>
            <span className="font-bold text-lg md:text-xl lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Blog Summarizer
            </span>
          </Link>
        </div>


        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Main Navigation for Desktop */}
          <MainNav />

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center space-x-2 px-6 py-4">
                <span className="inline-block font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Nexium
                </span>
                <span className="font-semibold text-xl text-foreground">
                  Blog Summarizer
                </span>
              </Link>
              <div className="flex flex-col space-y-3 p-6">
                {[
                  { href: '/', title: 'Home' },
                  { href: '/history', title: 'History' },
                  { href: '/favorites', title: 'Favorites' },
                  { href: '/about', 'title': 'About' }, 
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}