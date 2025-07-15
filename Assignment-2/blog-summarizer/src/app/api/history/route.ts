// src/app/api/history/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db'; 

export async function GET() {
  try {
    const { data: summaries, error } = await supabase
      .from('summaries')
      .select('*') 
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching summaries from Supabase in /api/history:', error);
      return NextResponse.json({ error: `Failed to fetch history: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ summaries }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error in /api/history:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}