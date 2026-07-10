"use client";

export default function Sparkles({ count = 20 }) {
  const stars = Array.from({ length: count });
  return (
    <>
      {stars.map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = 8 + Math.random() * 16;
        const delay = Math.random() * 3;
        return (
          <span
            key={i}
            className="sparkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          >
            ✨
          </span>
        );
      })}
    </>
  );
}