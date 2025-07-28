import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google' 
import './globals.css'
import { ThemeProvider } from '@/components/custom/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/custom/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', weight: "600" })

export const metadata: Metadata = {
  title: 'DishGen',
  description: 'AI-Powered Recipe Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-grow">
            {children}
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}