"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import F1Button from "./components/f1-button";

export default function Home() {
  const bgImageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Background image animation
    gsap.set(bgImageRef.current, {
      scale: 1.1,
    });

    gsap.to(bgImageRef.current, {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Create arrays of span elements for title and subtitle
    const titleLetters = titleRef.current.innerText.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(20px)";
      return span;
    });

    const subtitleLetters = subtitleRef.current.innerText
      .split("")
      .map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        return span;
      });

    // Clear and append new spans
    titleRef.current.textContent = "";
    subtitleRef.current.textContent = "";
    titleLetters.forEach((span) => titleRef.current.appendChild(span));
    subtitleLetters.forEach((span) => subtitleRef.current.appendChild(span));

    // Animate title letters
    gsap.to(titleLetters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.5,
    });

    // Animate subtitle letters
    gsap.to(subtitleLetters, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: "power3.out",
      delay: 1.2,
    });

    // Description animation
    gsap.from(descriptionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 2,
    });
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div ref={bgImageRef} className="absolute inset-0">
        <Image
          src="/homebg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col px-12 text-white">
        {/* Brand Name */}
        <h1
          ref={titleRef}
          className="mt-4 text-3xl italic font-extra bold text-black tracking-wider font-orbitron"
        >
          EGEON
        </h1>

        {/* Tagline */}
        <div className="mt-auto mb-52">
          <div className="mb-4">
            <F1Button />
          </div>
          <h2
            ref={subtitleRef}
            className="text-4xl mb-6 font-semibold font-montserrat text-black text-[45px]"
          >
            A Fusion of Elegance & Innovation
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="w-[450px] text-sm leading-relaxed font-bold font-montserrat text-[#6D6D6D]"
          >
            The Egeon sneaker represents the pinnacle of modern craftsmanship.
            Combining lightweight synthetic materials with a durable rubber
            sole, the Egeon redefines comfort, style, and quality. Designed for
            those who demand the best, this handmade sneaker seamlessly blends
            performance with luxury.
          </p>
        </div>
      </div>
    </main>
  );
}
