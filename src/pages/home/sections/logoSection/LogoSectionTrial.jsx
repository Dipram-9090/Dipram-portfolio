import { useRef, useState, useEffect } from "react";
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

const LogoSectionTrial = () => {
  const containerRef = useRef(null);
  const logosRef = useRef([]);
  const [viewport, setViewport] = useState("desktop");

  // --- 1. RESIZE HANDLER (Unchanged) ---
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
      case "mobile": return { w: baseW * 0.55, h: baseH * 0.55 };
      case "tablet": return { w: baseW * 0.75, h: baseH * 0.75 };
      default: return { w: baseW, h: baseH };
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

  useGSAP(() => {
    const logoElements = logosRef.current;
    
    // 1. Initial State: Hide all except the first one
    gsap.set(logoElements, { opacity: 0, scale: 0.9, filter: "blur(10px)" });
    gsap.set(logoElements[0], { opacity: 1, scale: 1, filter: "blur(0px)" });

    // 2. Create the Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // Increase this value to make the "stay" longer. 
        // 500% means the user scrolls 5 screens worth of height to finish the anim.
        end: "+=500%", 
        pin: true,
        scrub: 1, // Smooths the transition so it feels like an animation, not a mechanical lock
      }
    });

    // 3. Build the Sequence
    // In a scrubbed timeline, 'duration' is actually 'distance'
    
    logoElements.forEach((logo, i) => {
      if (i === 0) return; // Skip the first one (it's already visible)
      
      const prevLogo = logoElements[i - 1];

      // Step A: "Stay for a few scrolls"
      // We achieve this by adding a relative delay ("+=3") to the start of the next animation.
      // This creates a gap in the timeline where nothing happens (the user just scrolls).
      
      tl.to(prevLogo, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        duration: 1, // Takes 1 "unit" of scrolling to fade out
        ease: "power1.inOut"
      }, "+=3"); // <--- THIS IS THE PAUSE (3x longer than the fade)

      // Step B: Fade In the current logo
      tl.to(logo, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1, // Takes 1 "unit" of scrolling to fade in
        ease: "power1.inOut"
      }, "<"); // The "<" means "Start at the same time as the previous fade out"
      
      // Result: Crossfade happens, then it waits for the loop to hit the next "+=3"
    });

  }, { scope: containerRef, dependencies: [viewport] });

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
          <div className="w-1/2 lg:w-full h-px bg-white origin-center lg:origin-left" />
          <p className="font-euclid text-sm md:text-lg lg:text-xl text-white max-w-xs md:max-w-md leading-relaxed">
            Scroll down to explore the collection...
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
    </div>
  );
};

export default LogoSectionTrial;