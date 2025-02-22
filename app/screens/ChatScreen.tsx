import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

  const [conversation, setConversation] = useState<
    { type: string; message: string }[]
  >([]);

  const addToConversation = (message: string, type: string) => {
    setConversation((prev) => [...prev, { type, message }]);
  };

  const analyzeConversation = async () => {
    try {
      const url =
        "https://magicloops.dev/api/loop/53986829-7ffa-40b4-8995-7a57fd454545/run";

      const response = await axios.post(url, { conversation: conversation });

      console.log(response.data);
      const url2 = 
      "https://magicloops.dev/api/loop/39f149f4-dc7e-4da8-bd7a-730ae135a221/run";
      const response2 = await axios.post(url2, response.data);
      await axios.post("/conversations",response2)
      setConversation([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResponse = async (message: string) => {
    try {
      setLoading(true);
      const url =
        "https://magicloops.dev/api/loop/b3456033-5397-4097-9145-a6a7a9176f9a/run";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ text: message }),
      });

      const responseJson = await response.json();
      
      console.log(responseJson);

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
        <div className="flex px-5 w-screen justify-between items-center ">
          <AnimatePresence>
            {conversation.length == 0 && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className=" flex flex-col text-black w-1/3"
              >
                <p className="text-start">Buenos Dias!</p>
                <p className="text-start text-4xl font-bold">Sergio</p>
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

          <Cuca
            className={`w-28 h-28  fill-chart-2 stroke-chart-2 transition-transform ${
              conversation.length == 0 ? "" : "rotate-[-30deg]"
            } `}
          />
        </div>

        {/* Conversations */}
        <div
          className=" w-full h-full flex flex-col space-y-5 overflow-y-auto fade-scroll"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
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
        />
        <Button
          size={"icon"}
          className="bg-primary rounded-full h-full w-20"
          disabled={inputText === "" && !loading}
          onClick={() => {
            if (inputText === "") return;
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
      <div className="space-y-2">
        <p className="text-2xl text-center">Tienes algún problema?</p>
        <p className="text-4xl font-bold text-center">
          Cuéntaselo
          <br /> a Cuca!
        </p>
      </div>
    </div>
  );
}
