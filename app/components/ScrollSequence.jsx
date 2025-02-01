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
  const prevFrameRef = useRef(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll trigger animation
    const animation = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5, // Reduced scrub time for smoother transitions
      onUpdate: (self) => {
        const newFrame = Math.min(
          Math.max(1, Math.floor(self.progress * (TOTAL_FRAMES - 1)) + 1),
          TOTAL_FRAMES
        );

        if (newFrame !== prevFrameRef.current) {
          setCurrentFrame(newFrame);
          prevFrameRef.current = newFrame;
        }
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  // Generate array of frame numbers
  const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);

  // Only render current frame and adjacent frames for performance
  const visibleFrames = frames.filter(
    (frame) => Math.abs(frame - currentFrame) <= 2
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden will-change-transform"
    >
      {/* Container for all images */}
      <div className="relative w-full h-full">
        {visibleFrames.map((frame) => (
          <div
            key={frame}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: currentFrame === frame ? 1 : 0,
              transition: "opacity 0.1s ease-out",
              willChange: "opacity",
              pointerEvents: "none",
            }}
          >
            <Image
              ref={(el) => (imagesRef.current[frame - 1] = el)}
              src={`/mulclip/shoe${frame}.jpeg`}
              alt={`Frame ${frame}`}
              fill
              priority={frame <= 5}
              className="object-contain select-none"
              quality={100}
              sizes="100vw"
              unoptimized={true} // Bypass Next.js image optimization for smoother transitions
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
