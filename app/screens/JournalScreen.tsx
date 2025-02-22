"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather } from "lucide-react";
import DetailsScreen from "./DetailsScreen";
import { JournalEntry } from "@/types/types";
import axios from "axios";
export default function JournalScreen({ hideBar }: { hideBar: Function }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [showEntries, setShowEntries] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<
    typeof JournalEntry | null
  >(null);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get("/api/conversations", {
          params: {
            email: localStorage.getItem("email"),
          },
        });
        const data = response.data;
        setJournalEntries(data as (typeof JournalEntry)[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJournalEntries();
  }, []);

  const [journalEntries, setJournalEntries] = useState<(typeof JournalEntry)[]>(
    []
  );

  const filteredEntries = journalEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const entryYear = entryDate.getFullYear();
    const entryMonth = entryDate.toLocaleString("default", { month: "long" });

    return (
      (selectedYear === null || entryYear === selectedYear) &&
      (selectedMonth === null || entryMonth === selectedMonth)
    );
  });

  const handleFilterChange = (year: number | null, month: string | null) => {
    setShowEntries(false);
    setSelectedYear(year);
    setSelectedMonth(month);
    setTimeout(() => {
      setShowEntries(true);
    }, 500);
  };

  return (
    <div className="overflow-x-hidden overflow-y-scroll h-[100dvh] w-screen">
      <div className="p-5 space-y-5">
        <div className="w-full flex justify-between ">
          <p className="text-start font-bold text-3xl">Journal</p>
          <Feather size={32} />
        </div>
        <motion.div
          className="flex justify-between w-full rounded-3xl bg-chart-1 text-black p-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col space-y-2">
            <p className="font-bold">Hoy</p>
            <p className="font-black text-5xl">Feliz</p>
            <p className="text-sm">Sigue asi y tendras un gran dia!</p>
          </div>
          <p className="text-chart-2">{new Date().toLocaleDateString()}</p>
        </motion.div>
      </div>
      <div className="flex space-x-5 overflow-scroll w-screen">
        <AnimatePresence>
          {Object.entries(
            journalEntries.reduce((acc, entry) => {
              const year = new Date(entry.date).getFullYear();
              if (!acc[year]) {
                acc[year] = 0;
              }
              acc[year]++;
              return acc;
            }, {} as Record<number, number>)
          ).map(([year, count], index) => (
            <motion.div
              key={index}
              className={`bg-secondary rounded-xl p-5 ml-5 min-w-40 overflow-hidden ${
                selectedYear === Number(year) ? "bg-yellow-500" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: (index + 1) * 0.1 }}
              onClick={() =>
                handleFilterChange(
                  selectedYear === Number(year) ? null : Number(year),
                  selectedMonth
                )
              }
            >
              <p className="absolute font-black  text-9xl text-black/60 -z-10 -top-2 text-center -right-5 ">
                {year.toString().slice(2, 4)}
              </p>
              <p className="font-bold text-3xl">{year}</p>
              <p>{count} entradas</p>
            </motion.div>
          ))}
          <div className="w-20"></div>
        </AnimatePresence>
      </div>
      <div className="flex space-x-5 overflow-scroll w-screen mt-5">
        <AnimatePresence>
          {Object.entries(
            journalEntries.reduce((acc, entry) => {
              const month = new Date(entry.date).toLocaleString("default", {
                month: "long",
              });
              if (!acc[month]) {
                acc[month] = 0;
              }
              acc[month]++;
              return acc;
            }, {} as Record<string, number>)
          ).map(([month, count], index) => (
            <motion.div
              key={index}
              className={`bg-secondary rounded-full p-4 ml-5 min-w-36 ${
                selectedMonth === month ? "bg-yellow-500" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: (index + 2) * 0.1 }}
              onClick={() =>
                handleFilterChange(
                  selectedYear,
                  selectedMonth === month ? null : month
                )
              }
            >
              <p className="text-sm text-center">{month}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="w-full flex-col flex p-5">
        <AnimatePresence>
          {showEntries &&
            filteredEntries.map((entry, index) => (
              <motion.div
                onClick={() => {
                  setSelectedEntry(entry);
                  hideBar(true);
                }}
                key={index}
                className="bg-secondary rounded-xl p-5 mt-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
                <p className="font-bold text-xl">{entry.title}</p>
                <p className="text-sm">{entry.date}</p>
                <p>{entry.resume}</p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedEntry !== null && (
          <DetailsScreen
            entry={selectedEntry}
            close={() => {
              setSelectedEntry(null);
              hideBar(false);
            }}
          ></DetailsScreen>
        )}
      </AnimatePresence>
    </div>
  );
}
