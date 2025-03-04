import Conversation from "../../../models/conversation";
import { connectToDB } from "../../utils/database";

// 📌 Crear una nueva conversación (POST /api/conversations)
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const nuevaConv = new Conversation(body);
    await nuevaConv.save();

    return new Response(JSON.stringify(nuevaConv), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// 📥 Obtener todas las conversaciones (GET /api/conversations)
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const conversations = await Conversation.find({ email });

    return new Response(JSON.stringify(conversations), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
