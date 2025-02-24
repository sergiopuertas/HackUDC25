import { connectToDB } from "../../utils/database"; // Conectar a MongoDB
import User from "../../../models/User"; // Importar el modelo de Usuario
import jwt from "jsonwebtoken"; // JWT para autenticación
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 📥 POST: Iniciar sesión o registro
export async function POST(req) {
  await connectToDB();
  console.log("🟢 Conectado a la BD");

  try {
    const { name, email, password, action } = await req.json();

    if (action === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { success: false, message: "Credenciales inválidas" },
          { status: 401 }
        );
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Credenciales inválidas" },
          { status: 401 }
        );
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // ✅ Establecer la cookie con `cookies()` de `next/headers`
      cookies().set("token", token, {
        maxAge: 60 * 60 * 24, // 1 día
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: { name: user.name, email: user.email },
      });
    }

    if (action === "register") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "El usuario ya existe" },
          { status: 400 }
        );
      }

      const user = new User({ name, email, password });
      await user.save();

      return NextResponse.json({
        success: true,
        user: { name: user.name, email: user.email },
      });
    }

    if (action === "logout") {
      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      cookies().delete({ name: "token", path: "/" });
      return response;
    }

    return NextResponse.json(
      { success: false, message: "Acción no válida" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Error durante la autenticación:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
