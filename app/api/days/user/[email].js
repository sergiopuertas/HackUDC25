import Day from '@/models/Day';
import { connectToDB } from '../../utils/database';

// 📥 Obtener días por userId (GET /api/days/user/:userId)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const days = await Day.find({ email: params.email });

        if (!days || days.length === 0) {
            return new Response(JSON.stringify({ error: 'No se encontraron días para este email' }), { status: 404 });
        }
        return new Response(JSON.stringify(days), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
