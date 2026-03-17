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
import CodeClubLogo from "../../../../components/logoSectionComponents/CodeClubLogo";

gsap.registerPlugin(ScrollTrigger);

const LogoSectionSimpler = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const textRef = useRef(null);

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
    { Component: CodeClubLogo, ...getSize(500, 200) },
    { Component: JugsLogo, ...getSize(500, 150) },
    { Component: DipramLogo, ...getSize(500, 300) },
    { Component: FrostbyteLogo, ...getSize(500, 300) },
    { Component: CodeverseLogo, ...getSize(500, 300) },
  ];

  useGSAP(
    () => {
      // Subtle Staggered Entry Animation
      const items = gridRef.current.children;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          // stagger: 0.1, // Logos appear one after another
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 60%", // Animation starts when grid enters viewport
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        textRef.current,
        {
          autoAlpha: 0,
          filter: "blur(10px)",
        },
        {
          autoAlpha: 1,
          filter: "blur(0px)",

          duration: 0.7,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%", // Animation starts when grid enters viewport
            toggleActions: "play none none reverse",
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
      <div className="z-10 flex flex-col items-center gap-4 text-center">
        <p
          ref={textRef}
          className="max-w-2xl text-lg leading-relaxed text-white font-euclid md:text-lg lg:text-xl"
        >
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
        className="z-10 flex flex-wrap justify-center w-full gap-4 md:gap-16 lg:gap-20 max-w-350"
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
