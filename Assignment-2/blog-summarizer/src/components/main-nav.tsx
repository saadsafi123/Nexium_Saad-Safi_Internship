// src/components/main-nav.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface NavLink {
  href: string;
  title: string;
}

const navLinks: NavLink[] = [
  { href: '/', title: 'Home' },
  { href: '/history', title: 'History' },
  { href: '/favorites', title: 'Favorites' },
  { href: '/about', title: 'About' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
                  'ring-offset-background transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-50',
                  'h-10 px-4 py-2', 

                  pathname === link.href 
                    ? // --- ACTIVE STATE STYLES ---
                      cn(
                        'font-semibold', 
                        'bg-primary/20 text-foreground',
                        'dark:bg-secondary dark:text-foreground'
                      )
                    : // --- INACTIVE STATE STYLES ---
                      cn(
                        'text-muted-foreground',
                        'hover:bg-accent hover:text-foreground',
                        'dark:hover:bg-accent dark:hover:text-foreground'
                      )
                )}
              >
                {link.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}