// src/app/api/full-text/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/db';
import { supabase } from '@/lib/db'; 

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Summary ID is required.' }, { status: 400 });
    }

    console.log(`Attempting to fetch full text from MongoDB for summary ID: ${id}`);

    const { db } = await connectToMongoDB();
    const collection = db.collection('full_texts');

    const { data: summaryData, error: supabaseError } = await supabase
      .from('summaries')
      .select('original_url')
      .eq('id', id)
      .single();

    if (supabaseError || !summaryData || !summaryData.original_url) {
      console.error(`Error finding original_url for summary ID ${id} in Supabase:`, supabaseError?.message || 'Not found');
      return NextResponse.json({ error: 'Original URL not found for this summary.' }, { status: 404 });
    }

    const originalUrl = summaryData.original_url;

    const fullTextDocument = await collection.findOne({ original_url: originalUrl });

    if (!fullTextDocument || !fullTextDocument.full_text) {
      console.warn(`Full text not found in MongoDB for URL: ${originalUrl}`);
      return NextResponse.json({ error: 'Original full text not found.' }, { status: 404 });
    }

    console.log(`Full text for ID: ${id} fetched successfully from MongoDB.`);
    return NextResponse.json({ fullText: fullTextDocument.full_text }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error in /api/full-text/[id]:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}