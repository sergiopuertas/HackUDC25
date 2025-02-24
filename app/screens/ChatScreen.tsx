"use client";
import { AnimatePresence, motion } from "framer-motion";
import { use, useEffect, useRef, useState } from "react";
import SpeechBubble from "@/components/chat/SpeechBubble";
import Cuca from "@/components/svg/cuca";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import axios from "axios";
export default function ChatScreen({
  setBarHidden,
}: {
  setBarHidden: Function;
}) {
  const [typeText, setTypeText] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [conversation, setConversation] = useState<
    { type: string; message: string }[]
  >([]);
  const [lastResponse, setLastResponse] = useState<
    { type: string; message: string }[]
  >([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ? storedUsername : "");
  }, []);

  const addToConversation = (message: string, type: string) => {
    setConversation((prev) => [...prev, { type, message }]);
  };

  const analyzeConversation = async () => {
    try {
      const copyConversation = new Array(...conversation);
      setConversation([]);
      const url =
        "https://magicloops.dev/api/loop/39f149f4-dc7e-4da8-bd7a-730ae135a221/run";

      const response = await axios.post(url, {
        conversation: copyConversation,
      });

      const adaptedResponse = {
        summary: response.data.resumen,
        emotion: response.data.sentiment,
        bulletpoints: response.data.bulletpoints,
        title: response.data.title,
        advice: response.data.advice,
        email: localStorage.getItem("email"),
      };
      await axios.post("/api/conversations", adaptedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResponse = async (message: string) => {
    try {
      const url =
        "https://magicloops.dev/api/loop/b3456033-5397-4097-9145-a6a7a9176f9a/run";

      const username = localStorage.getItem("username");

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          text: message,
          speaker: { username },
          lastResponse: lastResponse,
        }),
      });

      const responseJson = await response.json();

      console.log(responseJson);
      setLastResponse([]);
      setLastResponse((prev) => [
        ...prev,
        { type: username || "user", message },
      ]);
      setLastResponse((prev) => [
        ...prev,
        { type: "Cuca", message: responseJson.response },
      ]);

      addToConversation(responseJson.response, "Cuca");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-[100dvh] items-center justify-start flex flex-col space-y-8 overflow-hidden">
      <motion.div
        initial={{ minHeight: "50dvh", height: "50dvh", opacity: 0, y: -50 }}
        animate={{
          minHeight: conversation.length == 0 ? "50dvh" : "88dvh",
          height: conversation.length == 0 ? "50dvh" : "88dvh",
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-start w-full transition-transform transform bg-chart-1 p-5 rounded-b-[2rem]"
      >
        {/* Header */}
        <div className="flex px-10 w-screen justify-between items-center ">
          <AnimatePresence>
            {conversation.length == 0 && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className=" flex flex-col text-black w-1/3"
              >
                <p className="text-start">Buenos Dias!</p>
                <p className="text-start text-4xl font-bold">
                  {username ? username : "Usuario"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {conversation.length > 0 && (
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                exit={{ opacity: 0, y: -50 }}
              >
                <Button
                  disabled={loading}
                  size={"icon"}
                  className={`bg-background rounded-full w-28 -mt-10 text-white p-8 transition-opacity duration-500${
                    conversation.length == 0 ? " opacity-0" : " opacity-100"
                  }`}
                  onClick={() => {
                    setTypeText("");
                    setInputText("");
                    setBarHidden(false);
                    analyzeConversation();
                  }}
                >
                  <ArrowLeft className="min-w-6 min-h-6 stroke-primary" />
                  <p>Atras</p>
                </Button>
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 0.4 }}
            whileTap={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="z-20"
          >
            <Cuca
              className={`w-28 h-28 -mr-2 fill-chart-2 stroke-chart-2 transition-transform ${
                conversation.length == 0 ? "" : "rotate-[-30deg]"
              } `}
            />
          </motion.div>
          <div className="w-28 h-28 bg-chart-2/40 rounded-full absolute right-5 top-10" />
        </div>

        {/* Conversations */}
        <div
          className="w-full h-full flex flex-col space-y-5 overflow-y-auto fade-scroll"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          {conversation.map((item, index) => (
            <SpeechBubble
              key={index}
              text={item.message}
              who={item.type}
              isSpeaking={(speaking: boolean) => {
                setLoading(speaking);
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex space-x-5 w-full px-5 "
      >
        <Input
          placeholder="Habla con Cuca"
          className="rounded-full bg-secondary z-10 h-14 w-full font-bold"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputText === "") return;
              setLoading(true);
              setBarHidden(true);
              addToConversation(inputText, "Tu");
              handleResponse(inputText);
              setInputText("");
            }
          }}
        />
        <Button
          size={"icon"}
          className="bg-primary rounded-full h-full w-20"
          disabled={inputText === "" && !loading}
          onClick={() => {
            if (inputText === "") return;
            setLoading(true);
            setBarHidden(true);
            addToConversation(inputText, "Tu");
            handleResponse(inputText);
            setInputText("");
          }}
        >
          <Send className="min-w-6 min-h-6" />
        </Button>
      </motion.div>

      {/* Call to Action */}
      <div className="space-y-2 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center">
          Cuéntaselo
          <br /> a Cuca!
        </p>
        <p className="text-2xl text-center">Tienes algún problema?</p>
      </div>
    </div>
  );
}
