import React, { useRef, useState, useEffect, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. Mock Data Structure
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
    bgColor: "#000722", // Default dark gray
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
    bgColor: "#500604", // A subtle dark reddish/burgundy hue for Porsche
  },
];

// Data for the new mention-worthy section
// Data for the new mention-worthy section
const otherWorksData = [
  { 
    id: 1, 
    src: "img/posters/eFootball.webp", 
    alt: "eFootball Poster", 
    direction: -50,
    title: "eFootball Campaign",
    description: "Dynamic promotional artwork highlighting the new season update, focusing on player motion and stadium atmosphere."
  }, 
  { 
    id: 2, 
    src: "img/posters/FC26-Poster.webp", 
    alt: "FC26 Poster", 
    direction: 50,
    title: "FC26 Concept Art",
    description: "A modern, high-contrast visual exploration for sports gaming, balancing gritty textures with clean typography."
  }, 
  { 
    id: 3, 
    src: "img/posters/SYNCHRONICITY.webp", 
    alt: "Synchronicity Poster", 
    direction: -50,
    title: "Synchronicity S2",
    description: "Cyberpunk-inspired key visual blending neon aesthetics with futuristic character design for tech events."
  }, 
];

// --- Reusable LazyImage Component ---
const LazyImage = ({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px" },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`w-full h-full bg-[#1e1e1e] ${className || ""}`}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => ScrollTrigger.refresh()}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      )}
    </div>
  );
};

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

      tl.from(".anim-text", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }).from(
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
      const mockups = gsap.utils.toArray(".anim-mockup");

      mockups.forEach((mockup) => {
        gsap.from(mockup, {
          scrollTrigger: {
            trigger: mockup,
            start: "top 80%",
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
          start: "top 30px",
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
      className="poster-color-trigger relative grid items-start grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
      data-bg-color={item.bgColor}
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
          <p className="max-w-md mt-6 text-sm text-left text-white/80 anim-text md:text-base font-euclid">
            {item.description}
          </p>
        </div>

        {/* COLUMN 2: Main Poster */}
        <div className="flex items-center justify-center w-full anim-poster">
          <LazyImage
            src={item.mainPoster}
            alt={item.title}
            className="max-h-[60vh] max-w-full object-contain shadow-2xl shadow-black/50 bg-transparent [&>img]:hover:scale-100"
          />
        </div>
      </div>

      {/* COLUMN 3: Scrollable Mockups */}
      <div className="flex flex-col items-center w-full gap-8 pt-4 pb-12 lg:col-span-1 lg:gap-12 lg:pt-24">
        {item.mockups.map((imgSrc, index) => (
          <div
            key={index}
            className="anim-mockup w-full max-w-md bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg"
          >
            <LazyImage src={imgSrc} alt={`${item.title} Mockup ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NEW SUB-COMPONENT: Other Works Row ---
const OtherWorksRow = memo(() => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Title fade up
      gsap.from(".anim-other-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Staggered alternate slide-in for the posters
      gsap.from(".anim-other-card", {
        scrollTrigger: {
          trigger: ".other-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        x: (index, target) => Number(target.dataset.direction), 
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="poster-color-trigger flex flex-col items-center justify-center w-full gap-16 pt-20"
      data-bg-color="#0a0a0a" 
    >
      <h3 className="anim-other-title text-4xl font-medium text-white md:text-5xl lg:text-6xl font-bebas text-center">
        Other Mention-Worthy Recent Works
      </h3>

      <div className="other-grid flex flex-wrap justify-center gap-8 lg:gap-12 w-full max-w-4xl mx-auto">
        {otherWorksData.map((poster) => (
          // 1. MAIN WRAPPER: Now acts as a transparent column holding both elements
          <div
            key={poster.id}
            data-direction={poster.direction}
            className="anim-other-card flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] gap-4"
          >
            {/* 2. THE CARD: Restored to exactly how you had it originally */}
            <div className="w-full overflow-hidden rounded-xl shadow-2xl shadow-black/60 bg-[#1e1e1e] border border-white/5">
              <img
                src={poster.src}
                alt={poster.alt}
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* 3. THE TEXT: Transparent background, sitting naturally below the card */}
            <div className="flex flex-col px-1 bg-transparent">
              <h4 className="text-2xl font-medium text-white font-bebas tracking-wide">
                {poster.title}
              </h4>
              <p className="text-sm text-white/70 font-euclid leading-relaxed">
                {poster.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

OtherWorksRow.displayName = "OtherWorksRow";

// 3. Main Component
const PosterSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const triggers = gsap.utils.toArray(".poster-color-trigger");

      triggers.forEach((trigger) => {
        const color = trigger.dataset.bgColor;

        ScrollTrigger.create({
          trigger: trigger,
          start: "top 50%", 
          end: "bottom 50%",
          onEnter: () =>
            gsap.to(sectionRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(sectionRef.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      style={{ backgroundColor: "#131313" }}
      className="w-full flex flex-col px-4 md:px-8 py-24 gap-32"
    >
      {/* Dynamic Main Posters */}
      {postersData.map((item) => (
        <PosterRow key={item.id} item={item} />
      ))}
      
      {/* New Mention-Worthy Gallery appended at the end */}
      <OtherWorksRow />
    </div>
  );
};

export default PosterSection;