import User from '@/models/User'; // Importar el modelo corregido
import { connectToDB } from '../../utils/database'; // Conectar a MongoDB

// 📥 GET: Obtener todos los usuarios
export async function GET(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const users = await User.find().populate('problems');
        console.log("🟢 Usuario encontrado:", users);

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error("❌ Error en GET:", error);
        return new Response(JSON.stringify({ error: 'Error al obtener los usuarios' }), { status: 500 });
    }
}

// 🔄 PUT: Actualizar un usuario por ID
export async function PUT(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Obtener el ID del query param
        const updatedData = await req.json(); // Obtener los datos actualizados del body

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID no proporcionado' }), { status: 400 });
        }

        const userActualizado = await User.findByIdAndUpdate(id, updatedData, { 
            new: true, 
            runValidators: true 
        }).populate('problems');

        if (!userActualizado) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
        }

        console.log("🟢 Usuario actualizado:", userActualizado);
        return new Response(JSON.stringify(userActualizado), { status: 200 });

    } catch (error) {
        console.error("❌ Error en PUT:", error);
        return new Response(JSON.stringify({ error: 'Error al actualizar el usuario' }), { status: 500 });
    }
}

// 🗑️ DELETE: Eliminar un usuario por ID
export async function DELETE(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Obtener el ID del query param

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID no proporcionado' }), { status: 400 });
        }

        const userEliminado = await User.findByIdAndDelete(id);

        if (!userEliminado) {
            return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
        }

        console.log("🟢 Usuario eliminado:", userEliminado);
        return new Response(JSON.stringify({ mensaje: 'Usuario eliminado correctamente' }), { status: 200 });

    } catch (error) {
        console.error("❌ Error en DELETE:", error);
        return new Response(JSON.stringify({ error: 'Error al eliminar el usuario' }), { status: 500 });
    }
}
