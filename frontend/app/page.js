"use client";
import DiscoBall from "../components/DiscoBall";
import TileGrid from "../components/TileGrid";
import Sparkles from "../components/Sparkles";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Sparkles count={25} />
      <section className="flex flex-col items-center justify-center pt-20">
        <DiscoBall />
        <p className="text-pink-600 mt-2 italic">your whimsical corner of the internet 🌸</p>
      </section>
      <TileGrid />
    </main>
  );
}