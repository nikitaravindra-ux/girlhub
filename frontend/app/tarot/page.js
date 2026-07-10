"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/api";

const DECK = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Lovers", "Strength", "The Hermit", "Wheel of Fortune", "Justice",
  "The Star", "The Moon", "The Sun", "Judgement", "The World",
];

export default function TarotPage() {
  const [shuffling, setShuffling] = useState(false);
  const [cards, setCards] = useState([]);
  const [reading, setReading] = useState("");

  const draw = async () => {
    setShuffling(true);
    setReading("");
    setTimeout(async () => {
      const shuffled = [...DECK].sort(() => 0.5 - Math.random()).slice(0, 3);
      setCards(shuffled);
      setShuffling(false);
      const res = await api.post("/ai/tarot", { cards: shuffled });
      setReading(res.data.result);
    }, 1200);
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-6">🔮 Tarot</h1>
      <button onClick={draw} className="px-6 py-3 rounded-full bg-red-400 text-white font-bold mb-8">
        Shuffle & Draw
      </button>

      <div className="flex justify-center gap-4 mb-6 h-40">
        <AnimatePresence>
          {shuffling &&
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 15, -15, 0], y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                className="w-20 h-32 rounded-lg bg-purple-500 shadow-xl"
              />
            ))}
          {!shuffling &&
            cards.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: i * 0.2 }}
                className="w-24 h-36 rounded-lg bg-gradient-to-b from-purple-300 to-pink-300 shadow-xl flex items-center justify-center text-xs font-bold p-2 text-white"
              >
                {c}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {reading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/70 rounded-xl p-5 shadow text-left"
        >
          {reading}
        </motion.p>
      )}
    </main>
  );
}