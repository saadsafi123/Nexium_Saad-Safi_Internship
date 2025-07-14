// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Noto_Nastaliq_Urdu } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from 'next-themes'; 

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
      <head>
        {/* No <link> for Noto Nastaliq Urdu needed here beacause we are using next/font/google */}
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          notoNastaliqUrdu.variable // Applying the Urdu font variable globally
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}