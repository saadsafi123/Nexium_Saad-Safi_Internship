// src/components/copy-button.tsx
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // For notifications

interface CopyButtonProps {
  textToCopy: string;
  label?: string; 
}

export function CopyButton({ textToCopy, label = 'Copy' }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000); // Reset "Copied!" state after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setHasCopied(true);
        toast.success('Copied to clipboard!', { duration: 1500 });
      })
      .catch((err) => {
        console.error('Failed to copy text:', err);
        toast.error('Failed to copy. Please try again.', { duration: 1500 });
      });
  };

  return (
    <Button
      variant="ghost" 
      size="sm"
      onClick={handleCopy}
      className="ml-2 px-2 py-1 h-auto text-xs"
    >
      {hasCopied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      )}
      <span className="ml-1">{hasCopied ? 'Copied!' : label}</span>
    </Button>
  );
}