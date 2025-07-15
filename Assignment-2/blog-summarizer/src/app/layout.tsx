// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Noto_Nastaliq_Urdu } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from 'next-themes';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  variable: '--font-urdu',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexium Blog Summarizer',
  description: 'AI-powered blog summarizer for Nexium internship',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          fontSans.variable,
          notoNastaliqUrdu.variable,
          'bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-950 dark:to-slate-900' // More subtle dark gradient
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}