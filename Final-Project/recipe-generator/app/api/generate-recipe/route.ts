
import { NextResponse } from 'next/server'
import { connectToMongoDB } from '@/lib/mongodb'

export async function POST(request: Request) {
  const formData = await request.json()
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

  if (!n8nWebhookUrl) {
    console.error("N8N_WEBHOOK_URL is not set");
    return new NextResponse(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
  }

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'n8n workflow failed')
    }
    
    try {
      const { db } = await connectToMongoDB();
      const collection = db.collection("recipe_generation_logs");
      await collection.insertOne({
        request: formData,
        response: result,
        createdAt: new Date(),
      });
      console.log("Document inserted successfully into MongoDB.");
    } catch (dbError) {
      console.error("MongoDB logging failed:", dbError);
    }

    return NextResponse.json(result)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in generate-recipe route:", errorMessage)
    return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
}