"use client";
import Cuca from "@/components/svg/cuca";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { code } from "@/fonts/fonts";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import Typewriter from "typewriter-effect";

export default function ChatScreen() {
  return (
    <div>
      <div className="w-screen h-[80dvh] items-center justify-start flex flex-col  space-y-8">
        <div className="flex flex-col items-center justify-start w-full min-h-[50dvh] bg-chart-1  p-10 rounded-b-[2rem]   ">
          <Cuca className="w-28 h-28 fill-chart-2 stroke-chart-2" />
        </div>
        <div className="flex space-x-5 w-full px-5">
          <Input
            placeholder="Speak to Cuca"
            className="rounded-full bg-secondary text-black z-10 h-14 w-full font-bold"
            style={{ fontFamily: code.style.fontFamily }}
          />
          <Button
            size={"icon"}
            className="bg-blue-400 rounded-full h-full w-20"
          >
            <Send className="min-w-6 min-h-6 " />
          </Button>
        </div>
        <div className="space-y-2 h-full items-center justify-center flex flex-col ">
          <p className=" text-2xl text-center">Tienes algun problema?</p>
          <p className="text-4xl font-bold text-center">
            Cuantaselo
            <br /> a Cuca!
          </p>
        </div>
      </div>
    </div>
  );
}
