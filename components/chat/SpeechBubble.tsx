"use client";
import { useState } from "react";
import Typewriter from "typewriter-effect";

export default function SpeechBubble({
  text,
  who,
}: {
  text: string;
  who: string;
}) {
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className={`flex flex-col w-full  ${
        who === "Tu" ? "items-start    " : "items-end"
      } `}
    >
      <p className="text-black">{who}</p>
      <div
        className={`rounded-lg p-2 bg-primary text-background text-sm shadow-md max-w-[80%] `}
      >
        <span className="text-xl text-start text-black py-10 font-medium">
          {completed ? (
            text
          ) : (
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(50)
                  .typeString(text)
                  .callFunction(() => {
                    setCompleted(true);
                  })

                  .start();
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}
