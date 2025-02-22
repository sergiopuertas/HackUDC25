"use client";
import Cuca from "@/components/svg/cuca";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { code } from "@/fonts/fonts";
import { Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";


export default function ChatScreen() {
  // Estado para el mensaje del usuario y la respuesta de la API
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // Función para manejar el envío del mensaje
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.respuesta || "¡Respuesta recibida!");
      } else {
        setResponse("Hubo un problema con la API.");
      }
    } catch (error) {
      setResponse("Error de conexión con la API.");
    }

    setMessage("");
  };

  return (
    <div className="w-full h-screen items-center justify-start flex flex-col space-y-8">
      <div className="flex flex-col items-center justify-start w-full h-[50dvh] bg-chart-1 p-10 rounded-b-[2rem]">
        <Cuca className="w-28 h-28 fill-chart-2 stroke-chart-2" />
      </div>

      {/* Input y botón para enviar el mensaje */}
      <div className="flex space-x-5 w-full px-5">
        <Input
          placeholder="Speak to Cuca"
          className="rounded-full bg-secondary text-black z-10 h-14 w-full font-bold"
          style={{ fontFamily: code.style.fontFamily }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          size={"icon"}
          className="bg-blue-400 rounded-full h-full w-20"
          onClick={handleSendMessage}
        >
          <Send className="min-w-6 min-h-6" />
        </Button>
      </div>

      {/* Mostrar la respuesta de la API */}
      <div className="space-y-2">
        <p className="text-2xl text-center">Tienes algún problema?</p>
        <p className="text-4xl font-bold text-center">
          Cuéntaselo
          <br /> a Cuca!
        </p>
        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 rounded-xl shadow-md text-center"
          >
            <p className="text-lg font-medium">{response}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
