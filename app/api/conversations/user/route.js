import Conversation from '@/models/Conversation';
import { connectToDB } from '@/utils/database';

// 📥 Obtener conversaciones por userId (GET /api/conversations/user/:userId)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const conversations = await Conversation.find({ userId: params.userId });

        if (!conversations || conversations.length === 0) {
            return new Response(JSON.stringify({ error: 'No se encontraron conversaciones para este userId' }), { status: 404 });
        }
        return new Response(JSON.stringify(conversations), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
