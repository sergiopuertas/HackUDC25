import User from "@/models/User"; // Importar el modelo corregido
import { connectToDB } from "@/utils/database";

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
    return new Response(
      JSON.stringify({ error: "Error al obtener los usuarios" }),
      { status: 500 }
    );
  }
}

// 📥 POST: Registrar un nuevo usuario
export async function POST(req) {
  await connectToDB();
  console.log("🟢 Conectado a la BD");

  try {
    const { email, password } = await req.json();

    // Validar campos
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email y contraseña son obligatorios",
        }),
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "El usuario ya existe" }),
        { status: 409 }
      );
    }

    // Crear un nuevo usuario (se hashea automáticamente la contraseña por el middleware)
    const newUser = new User({ email, password });
    await newUser.save();

    console.log("🟢 Usuario registrado:", newUser.email);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Usuario registrado correctamente",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error al registrar el usuario:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
