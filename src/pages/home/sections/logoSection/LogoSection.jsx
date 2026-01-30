import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Icons
import SynchronicityLogo from "../../../../components/logoSectionComponents/SynchronicityLogo";
import FrostbyteLogo from "../../../../components/logoSectionComponents/FrostbyteLogo";
import CodeverseLogo from "../../../../components/logoSectionComponents/CodeverseLogo";
import DipramLogo from "../../../../components/logoSectionComponents/DipramLogo";
import JugsLogo from "../../../../components/logoSectionComponents/JugsLogo";

gsap.registerPlugin(ScrollTrigger);

const LogoSection = () => {
  const containerRef = useRef(null);
  const logosRef = useRef([]);

  // 1. STATE TO TRACK SCREEN SIZE
  const [viewport, setViewport] = useState("desktop");

  // 2. DETECT SCREEN RESIZE
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport("mobile");
      } else if (width >= 768 && width < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    // Initial check
    handleResize();

    // Listen for changes
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. HELPER TO CALCULATE DIMENSIONS
  const getSize = (baseW, baseH) => {
    switch (viewport) {
      case "mobile":
        return { w: baseW * 0.55, h: baseH * 0.55 }; // Mobile: 55% size
      case "tablet":
        return { w: baseW * 0.75, h: baseH * 0.75 }; // Tablet: 75% size
      default:
        return { w: baseW, h: baseH }; // Desktop: 100% size
    }
  };

  // Helper to push refs
  const addToRefs = (el) => {
    if (el && !logosRef.current.includes(el)) {
      logosRef.current.push(el);
    }
  };

  // 4. LOGOS ARRAY WITH DYNAMIC SIZES
  // We use the helper function to calculate W/H based on the current viewport state
  const logos = [
    {
      Component: SynchronicityLogo,
      ...getSize(500, 300),
    },
    {
      Component: FrostbyteLogo,
      ...getSize(500, 300),
    },
    {
      Component: CodeverseLogo,
      ...getSize(500, 300),
    },
    {
      Component: DipramLogo,
      ...getSize(500, 300),
    },
    {
      Component: JugsLogo,
      ...getSize(300, 200), // Different base size, still scales proportionally
    },
  ];

  useGSAP(
    () => {
      const totalLogos = logos.length;

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalLogos * 100}%`, // Increased scroll distance slightly for better feel
          scrub: 1, // Increased scrub slightly for smoother seeking before snap
          pin: true,

          // --- ADD THIS SNAP OBJECT ---
          snap: {
            // Logic: 1 divided by (5 items - 1) = 0.25 steps (0, 0.25, 0.5, 0.75, 1)
            snapTo: 1 / (totalLogos - 1),

            // Interaction settings
            duration: 0.2, // Snap animation duration
            delay: 0, // Wait 0.1s after user stops scrolling to start snapping
            ease: "power1.inOut", // Smoothness of the snap
            inertia: false, // Set to true if you use the InertiaPlugin (paid), otherwise false
          },
          // ---------------------------
        },
      });

      logosRef.current.forEach((logo, i) => {
        if (i === 0) return;
        const prevLogo = logosRef.current[i - 1];

        // Fade OUT previous
        tl.to(
          prevLogo,
          {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            duration: 1, // Normalized duration (GSAP scrub maps this to scroll distance)
            ease: "power1.inOut",
          },
          `switch-${i}`,
        );

        // Fade IN current
        tl.fromTo(
          logo,
          {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power1.inOut",
          },
          "<", // Start at the same time as the fade out
        );
      });
    },
    { scope: containerRef, dependencies: [viewport] },
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#131313] text-white w-full h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* --- STATIC TEXT SECTION --- */}
      <div className="w-full h-[35%] lg:w-1/2 lg:h-full flex flex-col justify-end lg:justify-center items-center lg:items-start px-6 pb-4 lg:p-20 z-10 text-center lg:text-left">
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start">
          <h1 className="font-bebas font-medium text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tight text-[#19E6B6]">
            LOGOFOLIO
          </h1>
          <div className="w-1/2 lg:w-full h-px bg-white origin-center lg:origin-left" />
          <p className="font-euclid text-sm md:text-lg lg:text-xl text-white max-w-xs md:max-w-md leading-relaxed">
            A curated collection of logos crafted with strong concepts, clean
            geometry, and memorable brand identity. Every design begins with
            strategy and evolves into a simple, distinctive symbol that
            represents the essence of the brand. <br />
            <span className="text-teal-400 text-xs md:text-sm mt-2 lg:mt-4 block font-euclid tracking-widest uppercase">
              ( Scroll to explore )
            </span>
          </p>
        </div>
      </div>

      {/* --- STACKED LOGOS SECTION --- */}
      <div className="w-full h-[65%] lg:w-1/2 lg:h-full flex items-start lg:items-center justify-center relative z-10 pt-10 lg:pt-0">
        <div className="relative w-full h-full flex items-center justify-center">
          {logos.map((Item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              {/* Width and Height are now dynamic based on state */}
              <Item.Component width={Item.w} height={Item.h} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
