import Day from '@/models/Day';
import { connectToDB } from '../../utils/database';

// 📌 Crear un nuevo día (POST /api/days)
export async function POST(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const nuevoDay = new Day(body);
        await nuevoDay.save();

        return new Response(JSON.stringify(nuevoDay), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

// 📥 Obtener todos los días (GET /api/days)
export async function GET() {
    try {
        await connectToDB();
        const days = await Day.find();

        return new Response(JSON.stringify(days), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
