import Day from '@/models/Day';
import { connectToDB } from '../../utils/database';

// 📥 Obtener un día por ID (GET /api/days/:id)
export async function GET(req, { params }) {
    try {
        await connectToDB();
        const day = await Day.findById(params.id);

        if (!day) {
            return new Response(JSON.stringify({ error: 'Día no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify(day), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// ✏️ Actualizar un día (PUT /api/days/:id)
export async function PUT(req, { params }) {
    try {
        await connectToDB();
        const body = await req.json();
        const dayActualizado = await Day.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

        if (!dayActualizado) {
            return new Response(JSON.stringify({ error: 'Día no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify(dayActualizado), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}

// 🗑️ Eliminar un día (DELETE /api/days/:id)
export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const dayEliminado = await Day.findByIdAndDelete(params.id);

        if (!dayEliminado) {
            return new Response(JSON.stringify({ error: 'Día no encontrado' }), { status: 404 });
        }
        return new Response(JSON.stringify({ mensaje: 'Día eliminado' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
