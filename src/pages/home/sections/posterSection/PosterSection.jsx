import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Mock Data Structure (Updated: 'mockups' is now an array)
const postersData = [
  {
    id: 1,
    title: "DualSense Edge Wireless Controller",
    description:
      "Designed to reflect the evolving aesthetics of gaming hardware, this poster blends technical detailing with a clean, modern layout. The focus was on balancing information with visual appeal while maintaining a strong, premium identity across different mockup environments.",
    mainPoster: "/img/posters/poster-1-main.webp",
    mockups: [
      "/img/posters/poster-1-mockup-1.webp",
      "/img/posters/poster-1-mockup-2.webp",
      "/img/posters/poster-1-mockup-3.webp",
      // You can add as many as you want here!
    ],
  },
  {
    id: 2,
    title: "911 GT3 RS",
    description:
      "Inspired by the raw performance and racing heritage of Porsche, this poster focuses on translating speed into a visual form. The use of dynamic shapes, strong color hierarchy, and multiple perspectives of the vehicle creates a sense of motion and intensity within a static frame.",
    mainPoster: "/img/posters/poster-2-main.webp",
    mockups: [
      "/img/posters/poster-2-mockup-1.webp",
      "/img/posters/poster-2-mockup-2.webp",
      "/img/posters/poster-2-mockup-3.webp",
      "/img/posters/poster-2-mockup-4.webp",
    ],
  },
];

// 2. Extracted Sub-component
const PosterRow = ({ item }) => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);

  useGSAP(
    () => {
      // --- 1. LEFT SIDE ENTRY ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stagger the text in first
      tl.from(".anim-text", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
        // Bring in the main poster overlapping the text
        .from(
          ".anim-poster",
          {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "<+=0.2",
        );

      // --- 2. INDIVIDUAL MOCKUP ANIMATIONS (Right Side) ---
      // Select all elements with the class 'anim-mockup' inside THIS specific row
      const mockups = gsap.utils.toArray(".anim-mockup");

      // Loop through each one and give it its own ScrollTrigger
      mockups.forEach((mockup) => {
        gsap.from(mockup, {
          scrollTrigger: {
            trigger: mockup, // The trigger is the image itself, not the parent container
            start: "top 80%", // Animates when the top of THIS specific image hits 80% of viewport
            toggleActions: "play none none reverse",
          },
          x: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // --- 3. PINNING LOGIC (Desktop Only) ---
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: leftColRef.current,
          start: "top 50px",
          end: "bottom bottom",
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative grid items-start grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
    >
      {/* PINNED WRAPPER */}
      <div
        ref={leftColRef}
        className="w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:h-[80vh] p-4 lg:p-8"
      >
        {/* COLUMN 1: Title & Description */}
        <div className="flex flex-col items-start justify-center w-full">
          <h3 className="text-3xl font-medium text-left text-white anim-text md:text-5xl lg:text-6xl font-bebas">
            {item.title}
          </h3>
          <p className="max-w-md mt-6 text-sm text-left text-gray-400 anim-text md:text-base font-euclid">
            {item.description}
          </p>
        </div>

        {/* COLUMN 2: Main Poster */}
        <div className="flex items-center justify-center w-full">
          <img
            src={item.mainPoster}
            alt={item.title}
            className="anim-poster max-h-[85vh] max-w-full object-contain shadow-2xl shadow-black/50"
          />
        </div>
      </div>

      {/* COLUMN 3: Scrollable Mockups (MAPPED) */}
      <div className="flex flex-col items-center w-full gap-8 pt-4 pb-12 lg:col-span-1 lg:gap-12 lg:pt-24">
        {/* Map through the mockups array */}
        {item.mockups.map((imgSrc, index) => (
          <div
            key={index}
            className="anim-mockup w-full max-w-md bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={imgSrc}
              alt={`${item.title} Mockup ${index + 1}`}
              className="object-cover w-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Main Component
const PosterSection = () => {
  return (
    <div className="w-full bg-[#131313] flex flex-col px-4 md:px-8 py-24 gap-32">
      {postersData.map((item) => (
        <PosterRow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PosterSection;
