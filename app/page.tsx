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
import { ScreenType } from "@/types/types";
import ProfileScreen from "./screens/Profile";
export default function Page() {
  const [screen, setScreen] = useState<ScreenType>("Chat");
  const [changeTo, setChangeTo] = useState<ScreenType[]>(["Chat", "Chat"]);
  const [barHidden, setBarHidden] = useState(false);

  const changeScreen = (screen: ScreenType) => {
    setChangeTo([changeTo.at(1) ?? "Chat", screen]);
    setTimeout(() => {
      setScreen(screen);
    }, 20);
  };

  return (
    <main className="flex flex-col items-center justify-start h-[100dvh] w-screen">
      <AnimatePresence>
        {screen === "Chat" && (
          <motion.div
            className="w-screen h-[100dvh] absolute"
            initial={{
              x:
                ScreenType[changeTo.at(0) ?? "Chat"].id > ScreenType["Chat"].id
                  ? "-100%"
                  : "100%",
            }}
            animate={{ x: 0 }}
            exit={{
              x:
                ScreenType[changeTo.at(1) ?? "Chat"].id < ScreenType["Chat"].id
                  ? "100%"
                  : "-100%",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <ChatScreen setBarHidden={setBarHidden} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "Join" && (
          <motion.div
            className="w-screen h-[100dvh]  absolute"
            initial={{
              x:
                ScreenType[changeTo.at(0) ?? "Chat"].id > ScreenType["Join"].id
                  ? "-100%"
                  : "100%",
            }}
            animate={{ x: 0 }}
            exit={{
              x:
                ScreenType[changeTo.at(1) ?? "Chat"].id < ScreenType["Join"].id
                  ? "100%"
                  : "-100%",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <JoinScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {screen === "Journal" && (
          <motion.div
            className="w-screen h-[100dvh]  absolute"
            initial={{
              x:
                ScreenType[changeTo.at(0) ?? "Chat"].id >
                ScreenType["Journal"].id
                  ? "-100%"
                  : "100%",
            }}
            animate={{ x: 0 }}
            exit={{
              x:
                ScreenType[changeTo.at(1) ?? "Chat"].id <
                ScreenType["Journal"].id
                  ? "100%"
                  : "-100%",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <JournalScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "Profile" && (
          <motion.div
            className="w-screen h-[100dvh]  absolute"
            initial={{
              x:
                ScreenType[changeTo.at(0) ?? "Chat"].id >
                ScreenType["Profile"].id
                  ? "-100%"
                  : "100%",
            }}
            animate={{ x: 0 }}
            exit={{
              x:
                ScreenType[changeTo.at(1) ?? "Chat"].id <
                ScreenType["Profile"].id
                  ? "100%"
                  : "-100%",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <ProfileScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomBar screen={screen} setScreen={changeScreen} hidden={barHidden} />
    </main>
  );
}
