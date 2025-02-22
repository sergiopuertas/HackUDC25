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

const chartData = [
  { trait: "Agreeableness", value: 86 },
  { trait: "Conscientiousness", value: 75 },
  { trait: "Extraversion", value: 63 },
  { trait: "Neuroticism", value: 45 },
  { trait: "Openness", value: 92 },
];

const chartConfig = {
  value: {
    label: "Personality Traits",
    color: "hsl(var(--chart-1))",
  },
};

export default function ProfileScreen() {
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ? storedUsername : "");
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // Aquí puedes añadir la lógica de logout
  };

  return (
    <div className="w-screen h-[100dvh] absolute top-0 flex flex-col items-center overflow-scroll p-5">
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

      <Card className="border-none z-20 w-full max-w-md mt-10">
        <CardHeader className="items-center text-center">
          <CardTitle>Radar Chart - Personality Traits</CardTitle>
          <CardDescription>Showing personality trait scores</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-[80%] "
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
      <div className="mt-4 w-full max-w-md">
        <p>{description}</p>
      </div>
    </div>
  );
}
