import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link 
            href="https://github.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link 
            href="https://linkedin.com/in/your-profile" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DishGen. Built by Saad Safi.
        </p>
        <p className="text-sm text-muted-foreground">
          An AI-First Web Development Project.
        </p>
      </div>
    </footer>
  );
}