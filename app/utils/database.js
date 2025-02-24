// connectToDB.js
import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://hack:hack@cluster0.t1fxw.mongodb.net/hackUdc25?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, define la variable MONGODB_URI en tu archivo .env"
  );
}

// Variable de conexión en caché
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Conectando a MongoDB Atlas...");

    const clientOptions = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, clientOptions)
      .then((mongoose) => {
        console.log("🔥 Conectado a MongoDB Atlas");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
