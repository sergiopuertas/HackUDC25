"use client";
import { MessageCircle, Notebook, Puzzle } from "lucide-react";
import { useState } from "react";

export default function BottomBar({
  setScreen,
  screen,
}: {
  setScreen: Function;
  screen: string;
}) {
  return (
    <>
      <div className="flex justify-between items-center absolute bottom-10 w-[90%] p-1 rounded-full bg-primary shadow-lg">
        <div
          className={` w-16 h-16 bg-secondary rounded-full   absolute transition-all duration-200`}
          style={{
            transform: `translateX(${
              screen === "Journal" ? "10%" : screen === "Chat" ? "245%" : "480%"
            })`,
          }}
        ></div>
        <button
          onClick={() => setScreen("Journal")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <Notebook
            className={`min-w-6 min-h-6 transition-colors duration-300 ${
              screen === "Journal" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
        <button
          onClick={() => setScreen("Chat")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <MessageCircle
            className={`min-w-6 min-h-6 transition-colors duration-300 ${
              screen === "Chat" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
        <button
          onClick={() => setScreen("Join")}
          className={`rounded-full w-20 h-20 bg-transparent flex items-center justify-center  z-10`}
        >
          <Puzzle
            className={`min-w-6 min-h-6 transition-colors duration-300 ${
              screen === "Join" ? "stroke-primary" : "stroke-background "
            }`}
          />
        </button>
      </div>
    </>
  );
}
