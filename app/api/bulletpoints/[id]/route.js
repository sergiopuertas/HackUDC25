import BulletPoint from '@/models/BulletPoint';
import { connectToDB } from '../../utils/database';

// 📥 Obtener un día por ID (GET /api/days/:id)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const point = await BulletPoint.findById(params.id);

        if (!day) {
            return new Response(JSON.stringify({ error: 'Punto no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify(point), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// ✏️ Actualizar un día (PUT /api/days/:id)
export async function PUT(req, { params }) {
    try {
        await connectToDB();
        const body = await req.json();
        const pointActualizado = await BulletPoint.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

        if (!pointActualizado) {
            return new Response(JSON.stringify({ error: 'Punto no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify(pointActualizado), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

// 🗑️ Eliminar un día (DELETE /api/days/:id)
export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const pointEliminado = await BulletPoint.findByIdAndDelete(params.id);

        if (!pointEliminado) {
            return new Response(JSON.stringify({ error: 'Punto no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify({ mensaje: 'Punto eliminado' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
