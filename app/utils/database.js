import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://hack:hack@cluster0.t1fxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error('❌ Por favor, define la variable MONGODB_URI en tu .env.local');
}

// Almacenar la conexión en caché global (Next.js usa recarga en caliente en desarrollo)
let cached = globalThis.mongoose;

if (!cached) {
    cached = globalThis.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
    if (cached.conn) {
        console.log("🔄 Usando conexión MongoDB en caché");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("⚡ Estableciendo nueva conexión a MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI)
            .then((mongoose) => {
                console.log("🟢 Conectado a MongoDB");
                return mongoose;
            })
            .catch((error) => {
                console.error("❌ Error conectando a MongoDB:", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
