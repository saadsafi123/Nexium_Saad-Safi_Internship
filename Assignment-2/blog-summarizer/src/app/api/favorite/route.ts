// src/app/api/favorite/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { summaryId, isFavorite } = await request.json();

    if (!summaryId || typeof isFavorite !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request: summaryId (UUID) and isFavorite (boolean) are required.' }, { status: 400 });
    }

    console.log(`Updating favorite status for summaryId: ${summaryId} to ${isFavorite}`);

    const { data, error } = await supabase
      .from('summaries')
      .update({ is_favorite: isFavorite })
      .eq('id', summaryId)
      .select();

    if (error) {
      console.error('Error updating favorite status in Supabase:', error);
      return NextResponse.json({ error: `Failed to update favorite status: ${error.message}` }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Summary not found.' }, { status: 404 });
    }

    console.log(`Favorite status updated successfully for summaryId: ${summaryId}`);
    return NextResponse.json({ success: true, summary: data[0] }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error in /api/favorite:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}