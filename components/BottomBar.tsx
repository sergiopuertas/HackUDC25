"use client";
import { MessageCircle, Notebook, Puzzle, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenType } from "@/types/types";

interface BottomBarProps {
  setScreen: (screen: ScreenType) => void;
  screen: "Journal" | "Chat" | "Join" | "Profile";
  hidden: boolean;
}

export default function BottomBar({
  setScreen,
  screen,
  hidden,
}: BottomBarProps) {
  const screens: Array<"Journal" | "Chat" | "Join" | "Profile"> = [
    "Journal",
    "Chat",
    "Join",
    "Profile",
  ];
  const screenIndex = screens.indexOf(screen);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll("button");
      if (buttons.length > 0) {
        const selectedButton = buttons[screenIndex];
        setIndicatorPosition(
          selectedButton.offsetLeft + selectedButton.clientWidth / 2
        );
      }
    }
  }, [screen]);

  return (
    <motion.div
      ref={containerRef}
      className="flex justify-between items-center absolute bottom-10 w-[90%] p-1 rounded-full bg-primary shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.5 }}
    >
      {/* Indicador dinámico con framer-motion */}
      <motion.div
        className="w-16 h-16 bg-secondary rounded-full absolute"
        animate={{ x: indicatorPosition - 35 }}
        transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
      />

      {/* Botones */}
      {screens.map((item) => (
        <button
          key={item}
          onClick={() => setScreen(item)}
          className="relative z-10 w-20 h-20 flex items-center justify-center"
        >
          {item === "Journal" && (
            <Notebook
              className={`min-w-6 min-h-6 transition-colors duration-300 ${
                screen === item ? "stroke-primary" : "stroke-background"
              }`}
            />
          )}
          {item === "Chat" && (
            <MessageCircle
              className={`min-w-6 min-h-6 transition-colors duration-300 ${
                screen === item ? "stroke-primary" : "stroke-background"
              }`}
            />
          )}
          {item === "Join" && (
            <Puzzle
              className={`min-w-6 min-h-6 transition-colors duration-300 ${
                screen === item ? "stroke-primary" : "stroke-background"
              }`}
            />
          )}

          {item === "Profile" && (
            <User
              className={`min-w-6 min-h-6 transition-colors duration-300 ${
                screen === item ? "stroke-primary" : "stroke-background"
              }`}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
