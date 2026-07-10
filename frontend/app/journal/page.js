"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    const res = await api.get("/journal/get");
    setEntries(res.data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const save = async () => {
    await api.post("/journal/save", { title, content, mood });
    setTitle("");
    setContent("");
    setMood("");
    loadEntries();
  };

  const analyze = async () => {
    const res = await api.post("/ai/analyze", { text: content });
    setMood(res.data.result);
  };

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">📔 Journal</h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 rounded-2xl p-6 shadow-lg mb-8"
      >
        <input
          className="w-full mb-3 p-2 rounded-lg border border-pink-200 text-lg font-semibold"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full h-40 p-3 rounded-lg border border-pink-200"
          placeholder="Dear diary..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {mood && <p className="mt-2 text-sm text-purple-600">{mood}</p>}
        <div className="flex gap-3 mt-4">
          <button onClick={analyze} className="px-4 py-2 rounded-full bg-purple-400 text-white font-bold">
            Analyze mood ✨
          </button>
          <button onClick={save} className="px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
            Save entry 💾
          </button>
        </div>
      </motion.div>

      <h2 className="text-xl font-bold text-pink-500 mb-3">Past entries</h2>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.id} className="bg-white/60 rounded-xl p-4 shadow">
            <p className="font-semibold">{e.title}</p>
            <p className="text-sm text-gray-700">{e.content}</p>
            {e.mood && <p className="text-xs text-purple-500 mt-1">{e.mood}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}