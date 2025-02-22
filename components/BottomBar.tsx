"use client";
import { MessageCircle, Notebook, Puzzle } from "lucide-react";
import { Button } from "./ui/button";
import Wave from "react-wavify";
import { useState } from "react";

export default function BottomBar() {
  const [selected, setSelected] = useState("Journal");

  return (
    <>
      <div className="flex justify-between items-center absolute bottom-10 w-[90%] p-5 rounded-full bg-primary shadow-lg">
        <div
          className={`w-20 h-20 bg-secondary rounded-full   absolute transition-all duration-300`}
          style={{
            transform: `translateX(${
              selected === "Journal"
                ? "0"
                : selected === "Chat"
                ? "170%"
                : "335%"
            })`,
          }}
        ></div>
        <button
          onClick={() => setSelected("Journal")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <Notebook
            className={`min-w-8 min-h-8 transition-colors duration-300 ${
              selected === "Journal" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
        <button
          onClick={() => setSelected("Chat")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <MessageCircle
            className={`min-w-8 min-h-8 transition-colors duration-300 ${
              selected === "Chat" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
        <button
          onClick={() => setSelected("Join")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <Puzzle
            className={`min-w-8 min-h-8 transition-colors duration-300 ${
              selected === "Join" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
      </div>
    </>
  );
}
