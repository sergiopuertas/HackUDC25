"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      const response = await axios.post("/api/auth", {
        name,
        email,
        password,
        action: "register",
      });
      if (response.status === 201) {
        setIsRegistered(true);
        const { name } = response.data;
        localStorage.setItem("username", name);
      } else {
        alert("Error en el registro");
      }
    } catch (error) {
      alert("Error en el registro");
    }
  };

  return (
    <div className="bg-white p-8 shadow-md w-screen h-screen items-center justify-center flex flex-col space-y-10">
      <h1 className="text-3xl font-bold text-center text-black">Registrarse</h1>

      <div className="space-y-4 w-full">
        <div className="flex items-center bg-gray-100 p-2 rounded-full">
          <User className="text-black ml-2" />
          <Input
            placeholder="Nombre"
            type="text"
            className="bg-transparent border-none focus:ring-0 w-full text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white rounded-full py-2 font-semibold hover:bg-blue-600 transition-colors"
      >
        Registrarse
      </Button>

      <Link href="/login">
        <p className="text-blue-500 hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </p>
      </Link>
    </div>
  );
}
