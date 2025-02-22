import BulletPoint from '@/models/BulletPoint';
import { connectToDB } from '../../utils/database';

// 📌 Crear una nueva conversación (POST /api/conversations)
export async function GET() {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const points = await BulletPoint.find();
        console.log("🟢 Puntos encontrados:", points);

        return new Response(JSON.stringify(points), { status: 200 });
    } catch (error) {
        console.error("❌ Error en GET:", error);
        return new Response(JSON.stringify({ error: 'Error al obtener los puntos' }), { status: 500 });
    }
}


// 📥 Obtener todas las conversaciones (GET /api/conversations)
export async function POST(req) {
    try {
        await connectToDB();
        const data = await req.json(); 
        const nuevoPoint = new BulletPoint(data);
        await nuevoPoint.save();

        return new Response(JSON.stringify(nuevoPoint), { status: 201 });
    } catch (error ) {
        console.error(" Error en POST:", error);
        return new Response(JSON.stringify({ error: 'Error al crear el punto' }), { status: 400 });
    }
}
