import Figma from "./components/Figma";
import AdobeIllustratorIcon from "./components/AdobeIllustratorIcon";
import CanvaIcon from "./components/CanvaIcon";
import PhotoshopIcon from "./components/PhotoshopIcon";
import ABOUTsvg from "./components/ABOUTsvg";
import ProjectsButton from "../../../../components/ProjectsButton";

import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import LearnMore from "../../../../components/LearnMore.jsx";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AboutPreview = () => {
  const scrollRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const toolRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Define breakpoints
      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          // 1. Initialize SplitText
          // We create it inside the matchMedia so it calculates positions based on the CURRENT screen size
          const split = new SplitText(".scrollAnimate", {
            type: "chars,words",
            charsClass: "char",
          });

          // 2. Define Animation
          gsap.from(split.chars, {
            scrollTrigger: {
              trigger: scrollRef.current,
              // Mobile: Trigger earlier (top 70%) so user sees it sooner
              // Desktop: Trigger later (top 60%) for that "reveal" feel
              start: isMobile ? "top 70%" : "top 60%",
              end: isMobile ? "bottom 50%" : "80% 40%",
              scrub: 0.05,
              toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            // filter: "blur(4px)",
            // Reduce stagger amount on mobile because there are more lines/wrapping
            stagger: { amount: isMobile ? 0.5 : 1.5 },
            ease: "power2.out",
          });

          // 3. TOOLS & ICONS
          // We can keep this separate if you want it to trigger later
          gsap.from([toolRef.current, iconRef.current], {
            scrollTrigger: {
              trigger: toolRef.current,
              start: isMobile ? "top 80%" : "top 70%",
              toggleActions: "play none none reverse", // OPTIMIZATION: Don't scrub simple fades. Just play them.
            },
            // y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 0.5,
            // stagger: 0.1,
          });

          // 4. BUTTONS
          gsap.from(buttonRef.current, {
            scrollTrigger: {
              trigger: buttonRef.current,
              start: isMobile ? "top 90%" : "top 80%",
              toggleActions: "play none none reverse", // Don't scrub buttons, it feels unresponsive
            },
            // y: 30,
            opacity: 0,
            ease: "power2.out",
            duration: 0.6,
          });

          // 3. CLEANUP
          // This is CRITICAL. When the breakpoint changes, we must revert the text
          // back to a plain string so the browser can re-flow it before we re-split it.
          return () => {
            split.revert();
          };
        },
      );
    },
    { scope: scrollRef },
  );
  /*
  useGSAP(
    () => {
      // 1. SPLIT TEXT
      // Revert logic is handled automatically by useGSAP, but scoping helps cleanliness
      const split = new SplitText(".scrollAnimate", {
        type: "words", // OPTIMIZATION: Use 'words' instead of 'chars' for 5x better performance
      });

      // 2. TIMELINE
      // Combining these into a timeline is cleaner and more performant than separate triggers
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 60%",
          end: "bottom 80%", // Adjusted end for better pacing
          scrub: 1, // OPTIMIZATION: Use a number (e.g., 1) to smooth out the jitter
        },
      });

      tl.from(split.words, {
        opacity: 0,
        y: 30, // OPTIMIZATION: Use Translate Y instead of Blur
        // filter: "blur(4px)", // <--- THIS WAS THE LAG KILLER. REMOVED.
        stagger: 0.05, // Faster stagger for words
        ease: "power2.out",
        duration: 0.5, // Explicit duration helps GSAP calculate logic
      });

      
    },
    { scope: scrollRef },
  ); // Correct usage of scope
  */

  return (
    <div
      ref={scrollRef}
      className="bg-[#131313] relative z-0 flex flex-col justify-center gap-10 w-full lg:h-[140vh] lg:mt-30 mt-20 md:px-16 lg:px-40 px-6 lg:py-0 md:py-40 py-40"
    >
      {/* Content */}
      <div className="flex flex-col gap-6 items-start lg:items-end justify-center">
        <h1 className="scrollAnimate text-white font-euclid font-medium text-4xl leading-tight md:text-5xl lg:text-6xl lg:leading-18 text-left lg:text-right will-change-transform">
          Hi, I'm <span>Dipram</span>, <br />
          I’m a{" "}
          <span className="text-[#19E6B6]">
            {" "}
            multidisciplinary designer{" "}
          </span>{" "}
          and focused on building{" "}
          <span className="text-[#19E6B6]">
            {" "}
            visually strong, interactive digital experiences.
          </span>
        </h1>

        <p className="scrollAnimate font-euclid text-base text-[#bfbfbf] md:text-lg w-full text-left lg:text-xl lg:text-white lg:text-right lg:w-[50%] will-change-transform">
          I combine design systems, UI/UX thinking, and strong visual
          foundations to create experiences that are engaging, consistent, and
          thoughtfully designed.
        </p>
      </div>

      {/* Tools */}
      <div className="flex flex-col gap-6 justify-center items-start lg:items-end">
        <h1
          ref={toolRef}
          className="font-bebas text-white text-4xl text-left lg:text-6xl lg:text-right"
        >
          TOOLS
        </h1>
        <div ref={iconRef} className="icons flex gap-4 flex-wrap lg:gap-6">
          <Figma />
          <AdobeIllustratorIcon />
          <CanvaIcon />
          <PhotoshopIcon />
        </div>
      </div>

      {/* CTA */}
      <div
        ref={buttonRef}
        className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-start lg:justify-end"
      >
        <LearnMore
          to={"/about"}
          className={
            "cursor-pointer duration-200 hover:bg-[#19E6B6] font-euclid font-medium text-black text-lg md:text-xl lg:text-3xl bg-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          }
        />

        <ProjectsButton
          className={
            "cursor-pointer duration-200 hover:bg-[#19E6B6] hover:ring-[#19E6B6] hover:text-black font-euclid font-medium text-white uppercase text-lg md:text-xl lg:text-3xl ring-3 ring-inset ring-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          }
        />
      </div>

      {/* ABOUT svg */}
      {/* Ensure ABOUTsvg is lightweight or use an IMG tag if it's static */}
      <div className="absolute -z-10 top-1/2 -translate-y-1/2 pointer-events-none">
        <ABOUTsvg />
      </div>
    </div>
  );
};

export default AboutPreview;
