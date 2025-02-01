"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import F1Button from "./components/f1-button";
import SplitText from "./components/SplitText";
import ScrollFillText from "./components/ScrollFillText";
import SpecificationsGrid from "./components/SpecificationsGrid";
import ScrollSequence from "./components/ScrollSequence";

export default function Home() {
  const bgImageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Background image animation
    gsap.set(bgImageRef.current, {
      scale: 1.1,
    });

    gsap.to(bgImageRef.current, {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Parallax effect for background image (slower)
    gsap.to(bgImageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Parallax effect for EGEON title (faster)
    gsap.to(titleRef.current, {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Parallax effect for F1 button (medium speed)
    gsap.to(".button-container", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    // Parallax effect for tagline (different speed)
    gsap.to(".tagline-container", {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Parallax effect for description (slowest)
    gsap.to(descriptionRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
      },
    });

    // Create arrays of span elements for title
    const titleLetters = titleRef.current.innerText.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(20px)";
      return span;
    });

    // Clear and append new spans for title
    titleRef.current.textContent = "";
    titleLetters.forEach((span) => titleRef.current.appendChild(span));

    // Animate title letters
    gsap.to(titleLetters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out",
      delay: 0.5,
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
    <div className="h-full overflow-x-hidden">
      {/* First Section */}
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <div ref={bgImageRef} className="absolute inset-0">
          <Image
            src="/homebg.jpg"
            alt="Background"
            fill
            sizes="100vw"
            priority={true}
            className="object-cover"
            quality={100}
            loading="eager"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col px-12 text-white">
          {/* Brand Name */}
          <h1
            ref={titleRef}
            className="mt-4 text-3xl italic font-extrabold text-black tracking-wider font-orbitron"
          >
            EGEON
          </h1>

          {/* Tagline */}
          <div className="mt-auto mb-52">
            <div className="mb-4 button-container">
              <F1Button />
            </div>
            <div className="tagline-container">
              <SplitText
                text="A Fusion of Elegance & Innovation"
                className="font-light mb-3 font-montserrat text-black text-[45px]"
                delay={80}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="w-[450px] text-sm leading-relaxed font-montserrat text-[#6D6D6D]"
            >
              The Egeon sneaker represents the pinnacle of modern craftsmanship.
              Combining lightweight synthetic materials with a durable rubber
              sole, the Egeon redefines comfort, style, and quality. Designed
              for those who demand the best, this handmade sneaker seamlessly
              blends performance with luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Second Section - Split Screen */}
      <section className="relative w-full min-h-screen grid grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative h-full">
          <Image
            src="/homebg.jpg"
            alt="Product Image"
            fill
            sizes="50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Half - Content */}
        <div className="flex flex-col justify-center px-16 py-24 bg-white">
          <F1Button text="Details" suffix="F2" />
          <h3 className="text-4xl font-semibold font-montserrat text-[#9B887E] italic mt-8 mb-6">
            Where Innovation Meets Artistry
          </h3>
          <ScrollFillText text="The Egeon is more than just footwear – it's a celebration of modern design and artisanal craftsmanship. Inspired by the dynamic interplay of urban culture and high fashion, the Egeon bridges the gap between bold aesthetics and everyday practicality. From the moment you step into the Egeon, you'll experience a perfect harmony of comfort, durability, and timeless style." />
          <SpecificationsGrid />
        </div>
      </section>

      {/* Scroll Sequence Section */}
      <ScrollSequence />
    </div>
  );
}
