// src/lib/db.ts
import { createClient } from '@supabase/supabase-js';
import { MongoClient, Db } from 'mongodb';

// --- Supabase Configuration ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing in environment variables. Please check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves a new summary record to Supabase.
 * @param data The data for the summary record.
 */
export async function saveSummaryToSupabase(data: {
  original_url: string;
  english_summary: string;
  urdu_summary: string;
  keywords: string[];
}) {
  console.log('Attempting to save summary to Supabase:', data.original_url);
  const { error } = await supabase
    .from('summaries') 
    .insert([data]);

  if (error) {
    console.error('Error saving summary to Supabase:', error);
    throw new Error(`Failed to save summary to Supabase: ${error.message}`);
  }
  console.log('Summary successfully saved to Supabase for URL:', data.original_url);
}

// --- MongoDB Configuration ---
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = 'nexium-mongo'; 

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in environment variables. Please check .env.local');
}

let cachedMongoClient: MongoClient | null = null;
let cachedMongoDb: Db | null = null;

/**
 * Establishes and caches a connection to MongoDB.
 * @returns An object containing the MongoClient and Db instances.
 */
export async function connectToMongoDB(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedMongoClient && cachedMongoDb) {
    console.log('Using cached MongoDB connection.');
    return { client: cachedMongoClient, db: cachedMongoDb };
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    const client = new MongoClient(MONGODB_URI!);
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    cachedMongoClient = client;
    cachedMongoDb = db;
    console.log('Successfully connected to MongoDB.');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Saves the full blog text to MongoDB.
 * @param url The original URL of the blog.
 * @param fullText The full text of the blog.
 */
export async function saveFullTextToMongoDB(url: string, fullText: string) {
  console.log('Attempting to save full text to MongoDB for URL:', url);
  try {
    const { db } = await connectToMongoDB();
    const collection = db.collection('full_texts'); 

    const result = await collection.updateOne(
      { original_url: url },
      { $set: { original_url: url, full_text: fullText, saved_at: new Date() } },
      { upsert: true }
    );

    if (result.upsertedId || result.modifiedCount > 0) {
        console.log('Full text successfully saved/updated in MongoDB for URL:', url);
    } else {
        console.error('MongoDB save/update operation did not result in upsertedId or modifiedCount.');
        throw new Error('MongoDB save/update operation failed silently.');
    }
  } catch (error) {
    console.error('Error saving full text to MongoDB:', error);
    throw new Error(`Failed to save full text to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
  }
}