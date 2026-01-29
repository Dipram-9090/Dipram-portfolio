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

const LogoSectionSimpler = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

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

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. HELPER TO CALCULATE DIMENSIONS
  // Tweaked values slightly to fit grid cells better
  const getSize = (baseW, baseH) => {
    switch (viewport) {
      case "mobile":
        return { w: baseW * 0.5, h: baseH * 0.5 }; // Mobile: 50%
      case "tablet":
        return { w: baseW * 0.5, h: baseH * 0.5 }; // Tablet: 50%
      default:
        return { w: baseW * 0.6, h: baseH * 0.6 }; // Desktop: 60%
    }
  };

  const logos = [
    { Component: SynchronicityLogo, ...getSize(500, 300) },
    { Component: FrostbyteLogo, ...getSize(500, 300) },
    { Component: CodeverseLogo, ...getSize(500, 300) },
    { Component: DipramLogo, ...getSize(500, 300) },
    { Component: JugsLogo, ...getSize(300, 250) },
  ];

  useGSAP(
    () => {
      // Subtle Staggered Entry Animation
      const items = gridRef.current.children;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1, // Logos appear one after another
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%", // Animation starts when grid enters viewport
          },
        },
      );
    },
    { scope: containerRef, dependencies: [viewport] },
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#131313] text-white w-full min-h-screen flex flex-col items-center justify-center py-20 px-6 gap-10 lg:gap-20"
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col items-center text-center gap-4 z-10">
        <p className="font-euclid text-lg md:text-lg lg:text-xl text-white max-w-lg leading-relaxed">
          A curated collection of logos crafted with strong concepts, clean
          geometry, and memorable brand identity. Every design begins with
          strategy and evolves into a simple, distinctive symbol that represents
          the essence of the brand.
        </p>
      </div>

      {/* --- LOGO GRID --- */}
      {/* CHANGE: Switched from Grid to Flexbox to center the orphan logos */}
      <div
        ref={gridRef}
        className="flex flex-wrap justify-center gap-4 md:gap-16 lg:gap-20 w-full max-w-350 z-10"
      >
        {logos.map((Item, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 opacity-0"
          >
            <Item.Component width={Item.w} height={Item.h} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSectionSimpler;
