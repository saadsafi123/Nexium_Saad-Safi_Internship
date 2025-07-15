// src/app/api/summary/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Summary ID is required.' }, { status: 400 });
    }

    console.log(`Fetching summary with ID: ${id}`);

    const { data: summary, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Summary not found.' }, { status: 404 });
      }
      console.error(`Error fetching summary ${id} from Supabase:`, error);
      return NextResponse.json({ error: `Failed to fetch summary: ${error.message}` }, { status: 500 });
    }

    if (!summary) {
      return NextResponse.json({ error: 'Summary not found.' }, { status: 404 });
    }

    console.log(`Summary with ID: ${id} fetched successfully.`);
    return NextResponse.json({ summary }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error in /api/summary/[id]:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}