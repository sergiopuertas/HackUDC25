import User from '@/models/User'; // Importar el modelo corregido
import { connectToDB } from '../../utils/database'; // Conectar a MongoDB


// 📥 GET: Obtener todos los usuarios
export async function GET(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const users = await User.find();
        console.log("🟢 Usuarios encontrados:", users);

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error("❌ Error en GET:", error);
        return new Response(JSON.stringify({ error: 'Error al obtener los usuarios' }), { status: 500 });
    }
}

// 📤 POST: Crear un nuevo usuario
export async function POST(req) {
    try {
        await connectToDB();
        const data = await req.json(); 
        const nuevoUser = new User(data);
        await nuevoUser.save();

        return new Response(JSON.stringify(nuevoUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al crear el usuario' }), { status: 400 });
    }
}
