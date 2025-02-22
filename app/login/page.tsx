"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      const response = await axios.post("/api/auth", {
        email,
        password,
        action: "login",
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        const { name } = response.data;
        localStorage.setItem("username", name);
        window.location.href = "/main";
      } else {
        alert("Error en la autenticación");
      }
    } catch (error) {
      alert("Error en la autenticación");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
  };

  return (
    <div className="bg-white p-8 shadow-md w-screen h-screen items-center justify-center flex flex-col space-y-10">
      <h1 className="text-3xl font-bold text-center text-black">
        Iniciar Sesión
      </h1>

      <div className="space-y-4 w-full">
        <div className="flex items-center bg-gray-100 p-2 rounded-full">
          <Mail className="text-black ml-2" />
          <Input
            placeholder="Correo Electrónico"
            type="email"
            className="bg-transparent border-none focus:ring-0 w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-gray-100 p-2 rounded-full w-full ">
          <Lock className="text-gray-500 ml-2" />
          <Input
            placeholder="Contraseña"
            type="password"
            className="bg-transparent border-none focus:ring-0 w-full text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white rounded-full py-2 font-semibold hover:bg-blue-600 transition-colors"
      >
        Iniciar Sesión
      </Button>

      <Link href="/register">
        <p className="text-blue-500 hover:underline">
          ¿No tienes una cuenta? Regístrate
        </p>
      </Link>
    </div>
  );
}
