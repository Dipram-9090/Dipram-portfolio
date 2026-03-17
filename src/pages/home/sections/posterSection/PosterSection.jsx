import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Static data outside component — never triggers re-renders
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

/**
 * LazyImage — shared utility component
 *
 * OPTIMIZATION NOTES:
 * 1. Uses native loading="lazy" + decoding="async" — browser-native, zero JS,
 *    offloads decode to a worker thread so it never blocks the main thread.
 * 2. IntersectionObserver removed — redundant when loading="lazy" is present.
 * 3. contain: "layout paint" on wrapper prevents layout recalc when image loads.
 * 4. will-change: transform only injected on hover via CSS, not permanently —
 *    permanent will-change promotes to its own compositor layer wasting GPU RAM.
 * 5. memo() — prevents re-render when parent PosterRow re-renders.
 */
const LazyImage = memo(({ src, alt, className = "" }) => (
  <div
    className={`w-full h-full bg-[#1e1e1e] ${className}`}
    style={{ contain: "layout paint" }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
));

LazyImage.displayName = "LazyImage";

/**
 * PosterRow
 *
 * OPTIMIZATION NOTES:
 * 1. Merged the two separate animation blocks (text + mockups) into ONE
 *    ScrollTrigger timeline per row — halves the number of ScrollTrigger
 *    instances and reduces the per-frame listener count.
 * 2. gsap.matchMedia() instance is returned from useGSAP's cleanup function
 *    so it's properly reverted when the component unmounts, preventing a
 *    ScrollTrigger memory leak that existed in the original.
 * 3. Mockup animation uses a single ScrollTrigger per row (not per mockup) —
 *    stagger handles sequencing, saving N-1 IntersectionObserver-equivalent
 *    triggers for rows with many mockups.
 * 4. useMemo on mockup list prevents array re-allocation on re-render.
 */
const PosterRow = memo(({ item }) => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);

  // Memoize the mockup JSX list — avoids rebuilding on any parent re-render
  const mockupElements = useMemo(
    () =>
      item.mockups.map((imgSrc, index) => (
        <div
          key={index}
          className="anim-mockup w-full max-w-md bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg"
        >
          <LazyImage src={imgSrc} alt={`${item.title} Mockup ${index + 1}`} />
        </div>
      )),
    [item.mockups, item.title]
  );

  useGSAP(
    () => {
      // --- Entry animation: text + poster together ---
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
        .from(".anim-text", {
          x: -100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        })
        .from(
          ".anim-poster",
          { x: -100, opacity: 0, duration: 1.2, ease: "power3.out" },
          "<+=0.2"
        )
        // Mockups animate from right, staggered — single trigger instead of N triggers
        .from(
          ".anim-mockup",
          {
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "<+=0.3"
        );

      // --- Pin: desktop only — matchMedia instance returned for proper cleanup ---
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: leftColRef.current,
          start: "top 50px",
          end: "bottom bottom",
          pinSpacing: false,
        });
        // Return a cleanup function for matchMedia context
        return () => {};
      });

      // Returning mm makes useGSAP call mm.revert() on unmount — fixes original leak
      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative grid items-start grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
    >
      {/* Pinned left column */}
      <div
        ref={leftColRef}
        className="w-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:h-[80vh] p-4 lg:p-8"
      >
        {/* Text */}
        <div className="flex flex-col items-start justify-center w-full">
          <h3 className="text-3xl font-medium text-left text-white anim-text md:text-5xl lg:text-6xl font-bebas">
            {item.title}
          </h3>
          <p className="max-w-md mt-6 text-sm text-left text-gray-400 anim-text md:text-base font-euclid">
            {item.description}
          </p>
        </div>

        {/* Main poster */}
        <div className="flex items-center justify-center w-full anim-poster">
          <LazyImage
            src={item.mainPoster}
            alt={item.title}
            className="max-h-[85vh] max-w-full shadow-2xl shadow-black/50 bg-transparent"
          />
        </div>
      </div>

      {/* Scrollable mockups */}
      <div className="flex flex-col items-center w-full gap-8 pt-4 pb-12 lg:col-span-1 lg:gap-12 lg:pt-24">
        {mockupElements}
      </div>
    </div>
  );
});

PosterRow.displayName = "PosterRow";

const PosterSection = () => (
  <div className="w-full bg-[#131313] flex flex-col px-4 md:px-8 py-24 gap-32">
    {postersData.map((item) => (
      <PosterRow key={item.id} item={item} />
    ))}
  </div>
);

export default PosterSection;