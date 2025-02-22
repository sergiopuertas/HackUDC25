import Board from '@/models/Board'; // Importar el modelo Board
import { connectToDB } from '../../utils/database'; // Conectar a MongoDB

// 📥 GET: Obtener Boards por userId
export async function GET(req) {
    try {
        await connectToDB(); 
        console.log("🟢 Conectado a la BD");

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('email'); // Obtener el userId desde la URL

        if (!userId) {
            return new Response(JSON.stringify({ error: 'email no proporcionado' }), { status: 400 });
        }

        const boards = await Board.find({ email });

        if (!boards || boards.length === 0) {
            return new Response(JSON.stringify({ error: 'No se encontraron boards para este userId' }), { status: 404 });
        }

        console.log("🟢 Boards encontrados:", boards);
        return new Response(JSON.stringify(boards), { status: 200 });

    } catch (error) {
        console.error("❌ Error en GET (Boards por userId):", error);
        return new Response(JSON.stringify({ error: 'Error al obtener los boards' }), { status: 500 });
    }
}
