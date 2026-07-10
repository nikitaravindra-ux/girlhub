"use client";
import { useState } from "react";
import api from "../../lib/api";

export default function AffirmationsPage() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState("");
  const [listening, setListening] = useState(false);

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser — type instead!");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setTranscript(e.results[0][0].transcript);
    recognition.start();
  };

  const getAffirmations = async () => {
    const res = await api.post("/ai/affirmations", { transcript });
    setResult(res.data.result);
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-purple-500 mb-6">💜 Affirmations</h1>
      <button
        onClick={startVoice}
        className={`px-6 py-3 rounded-full font-bold text-white mb-4 ${listening ? "bg-red-400" : "bg-purple-400"}`}
      >
        {listening ? "Listening..." : "🎤 Speak how you feel"}
      </button>
      <textarea
        className="w-full h-24 p-3 rounded-lg border border-purple-200 mb-4"
        placeholder="Or type here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button onClick={getAffirmations} className="px-6 py-2 rounded-full bg-pink-400 text-white font-bold">
        Get affirmations ✨
      </button>
      {result && (
        <div className="mt-6 bg-white/70 rounded-xl p-5 shadow whitespace-pre-line text-left">
          {result}
        </div>
      )}
    </main>
  );
}