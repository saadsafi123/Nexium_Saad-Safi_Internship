// src/components/footer.tsx
import * as React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 text-center text-sm text-muted-foreground">
      <div className="container">
        &copy; {new Date().getFullYear()} Nexium. All rights reserved. Built by Saad Safi for the AI-First Web Development Internship.
        <div className="mt-1">
          <Link href="https://github.com/saadsafi123/Nexium_Saad-Safi_Internship/tree/main/Assignment-2/blog-summarizer" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub Repository
          </Link>
        </div>
      </div>
    </footer>
  );
}