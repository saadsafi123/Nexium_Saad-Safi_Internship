import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGO_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in environment variables. Please check .env.local');
}

if (!MONGODB_DB_NAME) {
  throw new Error('MONGODB_DB_NAME is missing in environment variables. Please check .env.local');
}

let cachedMongoClient: MongoClient | null = null;
let cachedMongoDb: Db | null = null;

export async function connectToMongoDB(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedMongoClient && cachedMongoDb) {
    console.log('Using cached MongoDB connection.');
    return { client: cachedMongoClient, db: cachedMongoDb };
  }

  try {
    console.log('Attempting to establish a new MongoDB connection...');
    const client = new MongoClient(MONGODB_URI!);
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    cachedMongoClient = client;
    cachedMongoDb = db;

    console.log(`Successfully connected to MongoDB database: ${MONGODB_DB_NAME}`);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB.');
  }
}