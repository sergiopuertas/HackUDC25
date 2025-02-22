"use client";
import { motion } from "framer-motion";
import { Dices } from "lucide-react";

export default function JoinScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] -mt-20 space-y-10">
      <p className="text-center text-5xl font-bold mt-10">Join</p>
      <Dices className="w-20 h-20 text-primary animate-spin " />
      <p className="text-center text-xl mt-5">Próximamente...</p>
    </div>
  );
}
