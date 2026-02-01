import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

// Icons (Keep your imports)
import SynchronicityLogo from "../../../../components/logoSectionComponents/SynchronicityLogo";
import FrostbyteLogo from "../../../../components/logoSectionComponents/FrostbyteLogo";
import CodeverseLogo from "../../../../components/logoSectionComponents/CodeverseLogo";
import DipramLogo from "../../../../components/logoSectionComponents/DipramLogo";
import JugsLogo from "../../../../components/logoSectionComponents/JugsLogo";

gsap.registerPlugin(ScrollTrigger, Observer);

const LogoSection = () => {
  const containerRef = useRef(null);
  const logosRef = useRef([]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const scrollTriggerRef = useRef(null); // Reference to store the ScrollTrigger instance

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

  // Logo objects
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

      // Initial Setup
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

      // Animation Helper
      const gotoLogo = (index, direction) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const currentLogo = logoElements[currentIndex.current];
        const nextLogo = logoElements[index];

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
            currentIndex.current = index;
          },
        });

        tl.to(currentLogo, {
          opacity: 0,
          scale: direction === "down" ? 1.1 : 0.8,
          filter: "blur(10px)",
          duration: 0.6,
          ease: "power2.inOut",
          zIndex: 0,
        }).fromTo(
          nextLogo,
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
            duration: 0.6,
            ease: "power2.out",
          },
          "<",
        );
      };

      // --- 2. SCROLLTRIGGER (THE PIN) ---
      // We create a "buffer" zone. We pin for 200% of the viewport height.
      // However, the user won't actually scroll this distance because Observer intercepts it.
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // ⚠️ Increased from +=1 to give it "grip"
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          // Optional: ensure we are clean when entering
        },
      });
      scrollTriggerRef.current = st;

      // --- 3. OBSERVER (THE INTERACTION) ---
      Observer.create({
        target: containerRef.current,
        type: "wheel, pointer",
        preventDefault: true, // Stop the browser scroll

        onWheel: (self) => {
          // Only run if the element is currently pinned (active)
          if (!st.isActive) return;

          const isScrollingDown = self.deltaY > 0;
          const isScrollingUp = self.deltaY < 0;

          if (isScrollingDown) {
            if (currentIndex.current < logoElements.length - 1) {
              // Navigate Logos
              gotoLogo(currentIndex.current + 1, "down");
            } else {
              // We are at the LAST logo. Release the lock.
              // We manually jump the scroll to the END of the pin so the user can continue down.
              // 'self.event.preventDefault()' is NOT called here because we returned early?
              // Actually Observer with preventDefault:true is aggressive.
              // We must force the scroll:

              if (!isAnimating.current) {
                // Smoothly scroll the window to the end of the trigger
                window.scrollTo({ top: st.end + 1, behavior: "smooth" });
              }
            }
          }

          if (isScrollingUp) {
            if (currentIndex.current > 0) {
              // Navigate Logos
              gotoLogo(currentIndex.current - 1, "up");
            } else {
              // We are at the FIRST logo. Release UP.
              if (!isAnimating.current) {
                window.scrollTo({ top: st.start - 1, behavior: "smooth" });
              }
            }
          }
        },
      });
    },
    { scope: containerRef, dependencies: [viewport] },
  );

  return (
    // ... JSX (Unchanged)
    <div
      ref={containerRef}
      className="relative bg-[#131313] text-white w-full h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* ... Content ... */}
      <div className="w-full h-[35%] lg:w-1/2 lg:h-full flex flex-col justify-end lg:justify-center items-center lg:items-start px-6 pb-4 lg:p-20 z-10 text-center lg:text-left">
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start">
          <h1 className="font-bebas font-medium text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tight text-[#19E6B6]">
            LOGOFOLIO
          </h1>
          <div className="w-1/2 lg:w-full h-px bg-white origin-center lg:origin-left" />
          <p className="font-euclid text-sm md:text-lg lg:text-xl text-white max-w-xs md:max-w-md leading-relaxed">
            A curated collection of logos crafted with strong concepts...
            <br />
            <span className="text-teal-400 text-xs md:text-sm mt-2 lg:mt-4 block font-euclid tracking-widest uppercase">
              ( Scroll to explore )
            </span>
          </p>
        </div>
      </div>

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

export default LogoSection;
