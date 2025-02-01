"use client";

import { useEffect, useState } from "react";

export default function ScrollHighlight() {
  const HIGHLIGHT_CLASS = "text-[#313130]"; // Tailwind class for red highlight
  const TEXT =
    "The Egeon is more than just footwear – it's a celebration of modern design and artisanal craftsmanship. Inspired by the dynamic interplay of urban culture and high fashion, the Egeon bridges the gap between bold aesthetics and everyday practicality. From the moment you step into the Egeon, you'll experience a perfect harmony of comfort, durability, and timeless style.";

  const words = TEXT.split(" ");
  const [highlightedCount, setHighlightedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollFraction = getScrollFraction();
      let wordsHighlighted = Math.floor((scrollFraction * words.length) / 1.5);
      setHighlightedCount(wordsHighlighted);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getScrollFraction() {
    const h = document.documentElement;
    const b = document.body;
    const st = "scrollTop";
    const sh = "scrollHeight";
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
  }

  return (
    <div className="text-[#D0D1D1] leading-relaxed font-montserrat max-w-md text-2xl">
      {words.map((word, i) => (
        <span key={i} className={i < highlightedCount ? HIGHLIGHT_CLASS : ""}>
          {word}{" "}
        </span>
      ))}
    </div>
  );
}
