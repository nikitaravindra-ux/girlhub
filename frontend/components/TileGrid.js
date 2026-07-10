"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const tiles = [
  { name: "Pinterest Doomscroll", href: "/pinterest", color: "#ff6ec7" },
  { name: "Music", href: "/music", color: "#63d2ff" },
  { name: "Journal", href: "/journal", color: "#ffe066" },
  { name: "Affirmations", href: "/affirmations", color: "#b565ff" },
  { name: "Tarot Cards", href: "/tarot", color: "#ff2b4e" },
  { name: "Taskbar", href: "/taskbar", color: "#7CFFB2" },
];

export default function TileGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-8">
      {tiles.map((tile) => (
        <Link href={tile.href} key={tile.name}>
          <motion.div
            whileHover={{ scale: 1.06, boxShadow: `0 0 30px ${tile.color}` }}
            whileTap={{ scale: 0.97 }}
            className="rounded-3xl p-8 h-40 flex items-center justify-center text-center font-bold text-white text-lg cursor-pointer shadow-lg"
            style={{ backgroundColor: tile.color }}
          >
            {tile.name}
          </motion.div>
        </Link>
      ))}
    </div>
  );
}