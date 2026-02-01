import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mouse } from "lucide-react";

// Icons
import SynchronicityLogo from "../../../../components/logoSectionComponents/SynchronicityLogo";
import FrostbyteLogo from "../../../../components/logoSectionComponents/FrostbyteLogo";
import CodeverseLogo from "../../../../components/logoSectionComponents/CodeverseLogo";
import DipramLogo from "../../../../components/logoSectionComponents/DipramLogo";
import JugsLogo from "../../../../components/logoSectionComponents/JugsLogo";

gsap.registerPlugin(ScrollTrigger);

const LogoSectionDesktop = () => {
  const containerRef = useRef(null);
  const logosRef = useRef([]);
  // We need a ref to store the ScrollTrigger instance to get its start position
  const masterTriggerRef = useRef(null);
  const [viewport, setViewport] = useState("desktop");

  // --- 1. RESIZE HANDLER ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setViewport("mobile");
      else if (width >= 768 && width < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSize = (baseW, baseH) => {
    switch (viewport) {
      case "mobile":
        return { w: baseW * 0.55, h: baseH * 0.55 };
      case "tablet":
        return { w: baseW * 0.75, h: baseH * 0.75 };
      default:
        return { w: baseW, h: baseH };
    }
  };

  const logos = [
    { Component: SynchronicityLogo, ...getSize(500, 300) },
    { Component: FrostbyteLogo, ...getSize(500, 300) },
    { Component: CodeverseLogo, ...getSize(500, 300) },
    { Component: DipramLogo, ...getSize(500, 300) },
    { Component: JugsLogo, ...getSize(300, 200) },
  ];

  const addToRefs = (el) => {
    if (el && !logosRef.current.includes(el)) logosRef.current.push(el);
  };

  useGSAP(
    () => {
      const logoElements = logosRef.current;
      const totalLogos = logoElements.length;

      // 1. Initial State
      // All hidden except first
      gsap.set(logoElements, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        zIndex: 0,
      });
      gsap.set(logoElements[0], {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        zIndex: 1,
      });

      // 2. MASTER PIN
      // This simply locks the visual view. It does NOT handle animation.
      // We add +100% extra at the end so the last logo "stays" for a while.
      const pinDistance = totalLogos * 50;

      const masterST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${pinDistance}%`,
        pin: true,
        pinSpacing: true,
      });
      masterTriggerRef.current = masterST;

      // 3. ANIMATION TRIGGERS
      // We create a specific trigger for every logo transition.
      logoElements.forEach((logo, i) => {
        if (i === 0) return; // Skip first logo

        const prevLogo = logoElements[i - 1];

        // Reusable animation function for consistent timing
        const animateSwitch = (enteringEl, leavingEl, direction) => {
          // Force Real-time animation (Standard GSAP)
          const tl = gsap.timeline({ overwrite: "auto" }); // overwrite prevents glitching if scrolling fast

          // 1. Animate OUT the previous logo
          tl.to(leavingEl, {
            opacity: 0,
            scale: direction === "down" ? 1.1 : 0.8,
            filter: "blur(10px)",
            duration: 0.5, // <--- FIXED REAL TIME DURATION (0.5 Second)
            ease: "power2.inOut",
            zIndex: 0,
          });

          // 2. Animate IN the new logo
          tl.fromTo(
            enteringEl,
            {
              opacity: 0,
              scale: direction === "down" ? 0.8 : 1.1,
              filter: "blur(10px)",
              zIndex: 1,
            },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.5, // <--- FIXED REAL TIME DURATION (0.5 Second)
              ease: "power2.inOut",
            },
            "<", // Start at same time
          );
        };

        // Create a trigger exactly where this logo should appear
        // Logic: Master Start + (Index * Viewport Height)
        ScrollTrigger.create({
          start: () => masterST.start + (i * window.innerHeight) / 2,
          end: () => masterST.start + ((i + 1) * window.innerHeight) / 2,

          // When we scroll DOWN into this zone:
          onEnter: () => animateSwitch(logo, prevLogo, "down"),

          // When we scroll UP back into this zone:
          onLeaveBack: () => animateSwitch(prevLogo, logo, "up"),
        });
      });
    },
    { scope: containerRef, dependencies: [viewport] },
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#131313] text-white w-full h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Static Text Section */}
      <div className="w-full h-[35%] lg:w-1/2 lg:h-full flex flex-col justify-end lg:justify-center items-center lg:items-start px-6 pb-4 lg:p-20 z-10 text-center lg:text-left">
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start">
          <h1 className="font-bebas font-medium text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tight text-[#19E6B6]">
            LOGOFOLIO
          </h1>
          <div className="w-1/2 lg:w-full h-px bg-white/50 origin-center lg:origin-left" />
          <p className="font-euclid text-sm md:text-lg lg:text-xl text-white max-w-xs md:max-w-md leading-relaxed">
            A curated collection of logos crafted with strong concepts, clean
            geometry, and memorable brand identity. Every design begins with
            strategy and evolves into a simple, distinctive symbol that
            represents the essence of the brand.
          </p>
        </div>
      </div>

      {/* Logos Section */}
      <div className="w-full h-[65%] lg:w-1/2 lg:h-full flex items-start lg:items-center justify-center relative z-10 pt-10 lg:pt-0">
        <div className="relative w-full h-full flex items-center justify-center">
          {logos.map((Item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none"
            >
              <Item.Component width={Item.w} height={Item.h} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span><Mouse size={32} strokeWidth={1.75}/></span>
        <span className="text-teal-400 text-xs md:text-sm mt-2 lg:mt-4 block font-euclid tracking-widest uppercase">
          Scroll to explore
        </span>
      </div>
    </div>
  );
};

export default LogoSectionDesktop;
