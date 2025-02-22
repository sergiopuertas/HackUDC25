import BulletPoint from '@/models/BulletPoint';
import { connectToDB } from '../../utils/database';

// 📥 Obtener días por userId (GET /api/days/user/:userId)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const points = await BulletPoint.find({ userId: params.userId });

        if (!points || points.length === 0) {
            return new Response(JSON.stringify({ error: 'No se encontraron puntos para este userId' }), { status: 404 });
        }
        return new Response(JSON.stringify(points), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
