import { connectToDB } from "../../utils/database"; // Conectar a MongoDB
import User from "../../../models/User"; // Importar el modelo de Usuario
// 📥 POST: Iniciar sesión
export async function POST(req) {
  await connectToDB();
  console.log("🟢 Conectado a la BD");

  let requestBody;
  try {
    requestBody = await req.json();
    const { name, email, password, action } = requestBody;

    if (action === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        console.error("❌ Usuario no encontrado:", email);
        return new Response(
          JSON.stringify({ success: false, message: "Usuario no encontrado" }),
          { status: 401 }
        );
      }
      console.log(password, user.password);
      const passwordMatch = await password.localeCompare(user.password);
      if (passwordMatch != 0) {
        console.error("❌ Contraseña incorrecta para:", email);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Credenciales incorrectas",
          }),
          { status: 401 }
        );
      }

      console.log("🟢 Usuario autenticado:", email);
      return new Response(
        JSON.stringify({
          name: user.name,
          message: "Sesión iniciada correctamente",
        }),
        { status: 200 }
      );
    }
    if (action === "register") {
      const newUser = new User({ name, email, password });
      await newUser.save();
      console.log("🟢 Usuario creado:", email);
      return new Response(
        JSON.stringify({
          name: newUser.name,
          message: "Usuario creado correctamente",
          email: newUser.email,
        }),
        { status: 201 }
      );
    } else {
      console.error("❌ Acción no válida:", action);
      return new Response(
        JSON.stringify({ success: false, message: "Acción no válida" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Error durante la autenticación:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
