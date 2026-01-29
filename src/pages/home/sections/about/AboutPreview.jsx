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

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const AboutPreview = () => {
  const scrollRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const toolRef = useRef(null);

  useGSAP(() => {
    // ============================
    // TEXT (CHARACTER) ANIMATION
    // ============================
    const split = new SplitText(".scrollAnimate", {
      type: "chars,words",
      charsClass: "char",
    });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top 60%",
        end: "50% 50%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      filter: "blur(4px)",
      stagger: { amount: 1.5 },
      ease: "power2.out",
    });

    // ============================
    // TOOL + ICON (TOGETHER)
    // ============================
    gsap.from([toolRef.current, iconRef.current], {
      scrollTrigger: {
        trigger: toolRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      ease: "power2.out",
      duration: 0.9,
    });

    // ============================
    // BUTTON (SEPARATE)
    // ============================
    gsap.from(buttonRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      ease: "power2.out",
      duration: 0.7,
    });
  }, scrollRef);

  return (
    <div
      ref={scrollRef}
      className="bg-[#131313] relative z-0 flex flex-col justify-center gap-10 w-full lg:h-[140vh] lg:mt-30 mt-20 md:px-16 lg:px-40 px-6 lg:py-0 md:py-40 py-40"
    >
      {/* Content */}
      <div className="flex flex-col gap-6 items-start lg:items-end justify-center">
        {/* Mobile: text-4xl, text-left | Large: text-6xl, text-right (Original) */}
        <h1 className="scrollAnimate text-white font-euclid font-medium text-4xl leading-tight md:text-5xl lg:text-6xl lg:leading-18 text-left lg:text-right">
          I’m a{" "}
          <span className="text-[#19E6B6]"> multidisciplinary designer </span>{" "}
          and focused on building{" "}
          <span className="text-[#19E6B6]">
            {" "}
            visually strong, interactive digital experiences.
          </span>
        </h1>

        {/* Mobile: w-full, text-base, text-left | Large: w-[50%], text-xl, text-right (Original) */}
        <p className="scrollAnimate font-euclid text-base text-[#bfbfbf] md:text-lg w-full text-left lg:text-xl lg:text-white lg:text-right lg:w-[50%]">
          I combine design systems, UI/UX thinking, and strong visual
          foundations to create experiences that are engaging, consistent, and
          thoughtfully designed.
        </p>
      </div>

      {/* Tools */}
      {/* Mobile: items-start | Large: items-end (Original) */}
      <div className="flex flex-col gap-6 justify-center items-start lg:items-end">
        {/* Mobile: text-4xl | Large: text-6xl (Original) */}
        <h1
          ref={toolRef}
          className="font-bebas text-white text-4xl text-left lg:text-6xl lg:text-right"
        >
          TOOLS
        </h1>
        {/* Icons container - adjust gap for mobile if needed, usually gap-6 is fine */}
        <div ref={iconRef} className="icons flex gap-4 flex-wrap lg:gap-6">
          <Figma />
          <AdobeIllustratorIcon />
          <CanvaIcon />
          <PhotoshopIcon />
        </div>
      </div>

      {/* CTA */}
      {/* Mobile: flex-col, items-start | Large: flex-row, items-center, justify-end (Original) */}
      <div
        ref={buttonRef}
        className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-start lg:justify-end"
      >
        <LearnMore
          to={"/about"}
          // Mobile: text-lg, px-8 | Large: text-3xl, px-12 (Original)
          className={
            "cursor-pointer duration-200 hover:bg-[#19E6B6] font-euclid font-medium text-black text-lg md:text-xl lg:text-3xl bg-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          }
        />

        <ProjectsButton
          // Mobile: text-lg, px-8 | Large: text-3xl, px-12 (Original)
          className={
            "cursor-pointer duration-200 hover:bg-[#19E6B6] hover:ring-[#19E6B6] hover:text-black font-euclid font-medium text-white uppercase text-lg md:text-xl lg:text-3xl ring-3 ring-inset ring-white rounded-full px-8 py-2 lg:px-12 text-center w-full sm:w-auto"
          }
        />
      </div>

      {/* ABOUT svg */}
      <div className="absolute -z-10 top-1/2 -translate-y-1/2">
        <ABOUTsvg />
      </div>
    </div>
  );
};

export default AboutPreview;
