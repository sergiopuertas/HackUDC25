import Conversation from '@/models/Conversation';
import { connectToDB } from '../../utils/database';

// 📌 Crear una nueva conversación (POST /api/conversations)
export async function POST(req) {
    try {
        await connectToDB();
        const body = await req.json();
        const nuevaConv = new Conversation(body);
        await nuevaConv.save();

        return new Response(JSON.stringify(nuevaConv), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

// 📥 Obtener todas las conversaciones (GET /api/conversations)
export async function GET() {
    try {
        await connectToDB();
        const conversations = await Conversation.find();

        return new Response(JSON.stringify(conversations), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
