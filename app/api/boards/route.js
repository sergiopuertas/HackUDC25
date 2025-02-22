import Board from '@/models/Board'; // Importar el modelo corregido
import { connectToDB } from '../../utils/database'; // Conectar a MongoDB

// 📥 GET: Obtener todos los usuarios
export async function GET(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const boards = await Board.find();
        console.log("🟢 Boards encontrados:", boards);

        return new Response(JSON.stringify(boards), { status: 200 });
    } catch (error) {
        console.error("❌ Error en GET:", error);
        return new Response(JSON.stringify({ error: 'Error al obtener los usuarios' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const data = await req.json(); 
        const nuevoUser = new Board(data);
        await nuevoUser.save();

        return new Response(JSON.stringify(nuevoUser), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al crear el board' }), { status: 400 });
    }
}