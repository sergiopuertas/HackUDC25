"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, User } from "lucide-react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    // Aquí iría la lógica de autenticación
    setIsLoggedIn(true);
    alert(`Sesión iniciada con ${email}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    alert("Has cerrado sesión");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center " style={{backgroundImage: 'url https://i.pinimg.com/736x/c1/aa/34/c1aa34866ecc63e368161eccac91b5c8.jpg'}}>
      {isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-md w-80 "
        >
          <h1 className="text-3xl font-bold text-center">Bienvenido, {email}</h1>
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white rounded-full py-2 font-semibold hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-md w-y-2 space-y-80"
        >
          <h1 className="text-3xl font-bold text-center text-black">Iniciar Sesión</h1>

          <div className="space-y-4">
            <div className="flex items-center bg-gray-100 p-2 rounded-full">
              <User className="text-black ml-2" />
              <Input
                placeholder="Correo Electrónico"
                type="email"
                className="bg-transparent border-none focus:ring-0 w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-gray-100 p-2 rounded-full">
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
        </motion.div>
      )}
    </div>
  );
}
