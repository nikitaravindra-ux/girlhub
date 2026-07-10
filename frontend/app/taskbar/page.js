"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function TaskbarPage() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await api.get("/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    await api.post("/tasks/", { text });
    setText("");
    load();
  };

  const toggle = async (id, done) => {
    await api.patch(`/tasks/${id}`, { done: !done });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    load();
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-500 mb-4">✅ Taskbar</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-2 rounded-lg border border-green-200"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} className="px-4 py-2 rounded-full bg-green-400 text-white font-bold">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between bg-white/60 rounded-xl p-3 shadow">
            <span
              onClick={() => toggle(t.id, t.done)}
              className={`cursor-pointer ${t.done ? "line-through text-gray-400" : ""}`}
            >
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} className="text-red-400 font-bold">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}