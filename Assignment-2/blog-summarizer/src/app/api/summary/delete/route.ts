// src/app/api/summary/delete/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db'; 

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); 

    if (!id) {
      return NextResponse.json({ error: 'Summary ID is required for deletion.' }, { status: 400 });
    }

    console.log(`Attempting to delete summary with ID: ${id}`);

    const { error } = await supabase
      .from('summaries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting summary ${id} from Supabase:`, error);
      return NextResponse.json({ error: `Failed to delete summary: ${error.message}` }, { status: 500 });
    }

    console.log(`Summary with ID: ${id} deleted successfully.`);
    return NextResponse.json({ success: true, message: `Summary ${id} deleted.` }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error in /api/summary/delete:', error);
    return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}