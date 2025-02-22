import { connectToDB } from '../../utils/database'; // Conectar a MongoDB
import User from '@/models/User'; // Importar el modelo de usuario
// 📥 POST: Iniciar sesión
export async function POST(req) {
  await connectToDB();
  console.log("🟢 Conectado a la BD");

  try {
    const { email, password, action } = await req.json();

    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) {
        console.error("❌ Usuario no encontrado:", email);
        return new Response(JSON.stringify({ success: false, message: 'Usuario no encontrado' }), { status: 401 });
      }
      console.log(password,user.password)
      const passwordMatch = await password.localeCompare(user.password);
      if (passwordMatch != 0) {
        console.error("❌ Contraseña incorrecta para:", email);
        return new Response(JSON.stringify({ success: false, message: 'Credenciales incorrectas' }), { status: 401 });
      }

      console.log("🟢 Usuario autenticado:", email);
      return new Response(JSON.stringify({ success: true, message: 'Sesión iniciada correctamente' }), { status: 200 });

    } else if (action === 'logout') {
      console.log("🟢 Sesión cerrada para:", email);
      return new Response(JSON.stringify({ success: true, message: 'Sesión cerrada correctamente' }), { status: 200 });

    } else {
      console.error("❌ Acción no válida:", action);
      return new Response(JSON.stringify({ success: false, message: 'Acción no válida' }), { status: 400 });
    }
  } catch (error) {
    console.error("❌ Error durante la autenticación:", error);
    return new Response(JSON.stringify({ success: false, message: 'Error interno del servidor' }), { status: 500 });
  }
}
