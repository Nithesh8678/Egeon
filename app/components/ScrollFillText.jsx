"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollFillText({ text }) {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Split text into words
    const words = text.split(" ");
    if (textRef.current) {
      textRef.current.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");
    }

    // Get all word spans
    const wordSpans = textRef.current.querySelectorAll(".word");
    const totalWords = wordSpans.length;

    // Create scroll-based animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const wordsToHighlight = Math.floor(progress * totalWords);

        wordSpans.forEach((word, index) => {
          if (index <= wordsToHighlight) {
            word.style.color = "#6D6D6D";
            word.style.transition = "color 0.3s ease";
          } else {
            word.style.color = "#D1D1D1";
            word.style.transition = "color 0.3s ease";
          }
        });
      },
    });
  }, [text]);

  return (
    <div ref={containerRef} className="min-h-[50vh]">
      <p
        ref={textRef}
        className="text-sm leading-relaxed font-montserrat max-w-md"
        style={{ wordSpacing: "0.25em" }}
      >
        {text}
      </p>
    </div>
  );
}
