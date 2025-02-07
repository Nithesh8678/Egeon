"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const TOTAL_FRAMES = 126;

export default function ScrollSequence() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll trigger animation
    const animation = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (TOTAL_FRAMES - 1)) + 1;
        setCurrentFrame(frame);
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Generate array of frame numbers
  const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Container for all images */}
      <div className="relative w-full h-full">
        {frames.map((frame) => (
          <div
            key={frame}
            className="absolute inset-0 w-full h-full transition-opacity duration-200"
            style={{ opacity: currentFrame === frame ? 1 : 0 }}
          >
            <Image
              ref={(el) => (imagesRef.current[frame - 1] = el)}
              src={`/mulclip/shoe${frame.toString().padStart("0")}.jpeg`}
              alt={`Frame ${frame}`}
              fill
              priority={frame <= 5} // Prioritize loading first 5 frames
              className="object-contain"
              quality={100}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Frame counter */}
      <div className="absolute bottom-8 left-8 text-white/50 text-sm">
        Frame: {currentFrame}/{TOTAL_FRAMES}
      </div>
    </section>
  );
}
