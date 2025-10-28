// lib/db.ts
import mongoose from 'mongoose';

const MongoUri = process.env.MONGODB_URI; // ← use o mesmo nome do .env.local

if (!MongoUri) {
  throw new Error('Defina MONGODB_URI no .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }; // ← "mongoose", não "moongose"
}

export default async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MongoUri!, opts).then((mongoose) => {
      console.log('✅ Conexão estabelecida com MongoDB');
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}