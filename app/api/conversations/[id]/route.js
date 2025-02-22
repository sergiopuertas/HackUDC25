import Conversation from '@/models/Conversation';
import { connectToDB } from '../../utils/database';

// 📥 Obtener una conversación por ID (GET /api/conversations/:id)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const conversation = await Conversation.findById(params.id);

        if (!conversation) {
            return new Response(JSON.stringify({ error: 'Conversación no encontrada' }), { status: 404 });
        }
        return new Response(JSON.stringify(conversation), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// ✏️ Actualizar una conversación (PUT /api/conversations/:id)
export async function PUT(req, { params }) {
    try {
        await connectToDB();
        const body = await req.json();
        const convActualizada = await Conversation.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

        if (!convActualizada) {
            return new Response(JSON.stringify({ error: 'Conversación no encontrada' }), { status: 404 });
        }
        return new Response(JSON.stringify(convActualizada), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

// 🗑️ Eliminar una conversación (DELETE /api/conversations/:id)
export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const convEliminada = await Conversation.findByIdAndDelete(params.id);

        if (!convEliminada) {
            return new Response(JSON.stringify({ error: 'Conversación no encontrada' }), { status: 404 });
        }
        return new Response(JSON.stringify({ mensaje: 'Conversación eliminada' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
