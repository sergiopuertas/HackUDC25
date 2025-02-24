"use client";

import { useEffect, useState } from "react";
import { TrendingUp, LogOut, Circle } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import type { JournalEntry } from "@/types/types";

const chartConfig = {
  value: {
    label: "Personality Traits",
    color: "hsl(var(--chart-1))",
  },
};

export default function ProfileScreen() {
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState([
    { trait: "Agreeableness", value: 0 },
    { trait: "Conscientiousness", value: 0 },
    { trait: "Extraversion", value: 0 },
    { trait: "Neuroticism", value: 0 },
    { trait: "Openness", value: 0 },
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ? storedUsername : "");
  }, []);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        let data: typeof JournalEntry | undefined;
        const getLastResume = async () => {
          const response = await axios.get("/api/conversations", {
            params: {
              email: localStorage.getItem("email"),
            },
          });
          data = (response.data as (typeof JournalEntry)[])[0];
        };
        await getLastResume();

        const response = await axios.post(
          "https://magicloops.dev/api/loop/7617d987-c675-4aaa-a536-af9ea82a6a49/run",
          {
            text: data?.summary,
          }
        );
        setDescription(
          response.data.description.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") || ""
        );

        setChartData([
          { trait: "Openness", value: response.data.Openness },
          {
            trait: "Conscientiousness",
            value: response.data.Conscientiousness,
          },
          { trait: "Extraversion", value: response.data.Extraversion },
          { trait: "Agreeableness", value: response.data.Agreeableness },
          { trait: "Neuroticism", value: response.data.Neuroticism },
        ]);
      } catch (error) {
        console.error("Error fetching description:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth", { action: "logout" });
      if (response.data.success) {
        console.log("Sesión cerrada");
        window.location.href = "/login";
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen h-[100dvh] absolute top-0 flex flex-col items-center overflow-scroll p-10">
      <div className="w-full flex justify-between items-center">
        <Button
          onClick={handleLogout}
          className=" flex items-center w-40 rounded-full"
          variant="destructive"
          size="lg"
        >
          <LogOut size={20} /> <p className="text-xl font-bold">Logout</p>
        </Button>

        <div className="w-10 h-10 bg-secondary rounded-full items-center justify-center flex font-bold">
          {username.at(0)?.toUpperCase()}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="flex space-x-2">
            <motion.div
              className="h-8 w-8 bg-primary rounded-full"
              initial={{ y: -20 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
            ></motion.div>
            <motion.div
              className="h-8 w-8 bg-primary rounded-full"
              initial={{ y: -20 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="h-8 w-8 bg-primary rounded-full"
              initial={{ y: -20 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
            ></motion.div>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, delay: 0.1 },
            }}
            className="w-full max-w-md"
          >
            <Card className="border-none z-20 w-full max-w-md mt-10">
              <CardHeader className="items-center text-center">
                <CardTitle>Radar Chart - Personality Traits</CardTitle>
                <CardDescription>
                  Showing personality trait scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-[80%] "
                >
                  <RadarChart data={chartData}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarGrid />
                    <Radar
                      dataKey="value"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                      dot={{ r: 4, fillOpacity: 1 }}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div className="mt-4 w-full max-w-md">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </motion.div>
        </>
      )}
    </div>
  );
}
