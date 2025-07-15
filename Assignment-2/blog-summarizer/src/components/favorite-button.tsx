// src/components/favorite-button.tsx
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  summaryId: string;
  initialIsFavorite: boolean;
  onToggle?: (id: string, newStatus: boolean) => void;
}

export function FavoriteButton({ summaryId, initialIsFavorite, onToggle }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleToggleFavorite = async () => {
    setIsUpdating(true);
    const newFavoriteStatus = !isFavorite;

    try {
      const response = await fetch('/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summaryId,
          isFavorite: newFavoriteStatus,
        }),
      });

      if (!response.ok) {
        setIsFavorite(isFavorite); 
        toast.error('Failed to update favorite status. Please try again.', {
          description: `Error: ${response.statusText}`,
        });
        console.error('Failed to update favorite status:', response.status, response.statusText);
      } else {
        setIsFavorite(newFavoriteStatus);
        toast.success(
          newFavoriteStatus
            ? 'Added to favorites!'
            : 'Removed from favorites.',
          { duration: 1500 }
        );
        if (onToggle) { 
          onToggle(summaryId, newFavoriteStatus);
        }
      }
    } catch (error) {
      setIsFavorite(isFavorite); 
      toast.error('Network error updating favorite status.', {
        description: 'Check your internet connection.',
      });
      console.error('Network error during favorite update:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isUpdating}
      className="ml-2 h-8 w-8 transition-colors duration-200"
    >
      <Star
        className={cn(
          'h-5 w-5',
          isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        )}
      />
      <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
    </Button>
  );
}