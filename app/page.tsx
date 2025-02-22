"use client";
import ChatScreen from "@/app/screens/ChatScreen";
import BottomBar from "../components/BottomBar";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import JournalScreen from "@/app/screens/JournalScreen";
import JoinScreen from "@/app/screens/JoinScreen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { code } from "@/fonts/fonts";
import Cuca from "@/components/svg/cuca";
export default function Page() {
  const [screen, setScreen] = useState("Chat");

  return (
    <main className="flex flex-col items-center justify-start h-screen w-screen ">
      <AnimatePresence>
        {screen === "Chat" && (
          <motion.div
            className="w-screen h-screen absolute"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ ease: "easeInOut", type: "tween", duration: 0.2 }}
          >
            <ChatScreen />{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "Join" && (
          <motion.div
            className="w-screen h-screen absolute"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            <JoinScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {screen === "Journal" && (
          <motion.div
            className="w-screen h-screen absolute"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ ease: "easeInOut", type: "tween" }}
          >
            <JournalScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomBar screen={screen} setScreen={setScreen} />
    </main>
  );
}
