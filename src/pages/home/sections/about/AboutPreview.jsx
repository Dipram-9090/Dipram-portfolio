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
import HTML5icon from "../../../../components/iconComponents/HTML5icon.jsx";
import CSS3icon from "../../../../components/iconComponents/CSS3icon.jsx";
import JSIcon from "../../../../components/iconComponents/JSIcon.jsx";
import TailwindIcon from "../../../../components/iconComponents/TailwindIcon.jsx";
import ReactIcon from "../../../../components/iconComponents/ReactIcon.jsx";
import NextjsIcon from "../../../../components/iconComponents/NextjsIcon.jsx";
import SCSSicon from "../../../../components/iconComponents/SCSSicon.jsx";
import GSAPicon from "../../../../components/iconComponents/GSAPicon.jsx";
import MotionIcon from "../../../../components/iconComponents/MotionIcon.jsx";
import VSicon from "../../../../components/iconComponents/VSicon.jsx";
import AntiGravityIcon from "../../../../components/iconComponents/AntiGravity.jsx";
import VercelIcon from "../../../../components/iconComponents/VercelIcon.jsx";
import GitIcon from "../../../../components/iconComponents/GitIcon.jsx";
import GitHubIcon from "../../../../components/iconComponents/GitHubIcon.jsx";
import WebflowIcon from "../../../../components/iconComponents/WebflowIcon.jsx";
import FramerIcon from "../../../../components/iconComponents/FramerIcon.jsx";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AboutPreview = () => {
  const scrollRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const toolRef = useRef(null);
  const techStackRef = useRef(null);
  const techIconRef = useRef(null);

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
              end: isMobile ? "bottom 90%" : "80% 80%",
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
            duration: 1,
            // stagger: 0.1,
          });

          gsap.from([techStackRef.current, techIconRef.current], {
            scrollTrigger: {
              trigger: techStackRef.current,
              start: isMobile ? "top 80%" : "top 70%",
              toggleActions: "play none none reverse", // OPTIMIZATION: Don't scrub simple fades. Just play them.
            },
            // y: 50,
            opacity: 0,
            ease: "power2.out",
            duration: 1,
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
            duration: 1,
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

  return (
    <div
      ref={scrollRef}
      className="bg-[#131313] relative z-0 flex flex-col justify-center gap-15 w-full lg:mt-30 mt-20 md:px-16 lg:px-40 px-6 lg:pb-50 md:py-40 py-40"
    >
      {/* Content */}
      <div className="flex flex-col items-start justify-center gap-6  lg:items-end">
        <h1 className="text-4xl font-medium leading-tight text-left text-white max-w-300 scrollAnimate font-euclid md:text-5xl lg:text-6xl lg:leading-18 lg:text-right will-change-transform">
          Hi, I'm <span>Dipram</span>, <br />
          I’m a{" "}
          <span className="text-[#19E6B6]">
            {" "}
            creative front-end developer{" "}
          </span>{" "}
          and
          <span className="text-[#19E6B6]"> designer </span> focused on building{" "}
          <span className="text-[#19E6B6]">
            {" "}
            visually strong, interactive digital experiences.
          </span>
        </h1>

        <p className="scrollAnimate font-euclid text-base text-[#bfbfbf] md:text-lg w-full text-left lg:text-xl lg:text-white lg:text-right lg:w-[50%] will-change-transform">
          I combine design systems, UI/UX thinking, brand-driven visuals, and
          motion-focused front-end development to craft experiences that are
          immersive, engaging, and built with long-term clarity and usability in
          mind.
        </p>
      </div>

      {/* Tools */}
      <div className="flex flex-col items-start justify-center gap-5 lg:items-end">
        <h1
          ref={toolRef}
          className="text-4xl text-left text-white font-bebas lg:text-6xl lg:text-right"
        >
          DESIGN TOOLS
        </h1>
        <div
          ref={iconRef}
          className="flex flex-wrap items-center gap-4 icons lg:gap-6"
        >
          <Figma size={50} />
          <AdobeIllustratorIcon size={50} />
          <CanvaIcon size={50} />
          <PhotoshopIcon size={50} />
          <WebflowIcon color="white" size={50} />
          <FramerIcon color="white" size={50} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 lg:items-end">
        <h1
          ref={techStackRef}
          className="text-4xl text-left text-white font-bebas lg:text-6xl lg:text-right"
        >
          Frontend Tech Stack
        </h1>
        <div
          ref={techIconRef}
          className="flex flex-wrap icons lg:justify-end gap-y-5 gap-x-10 lg:gap-y-4 lg:gap-x-15"
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <HTML5icon color="white" size={50} />
            <CSS3icon color="white" size={50} />
            <JSIcon color="white" size={50} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <TailwindIcon color="white" size={40} />
            <SCSSicon color="white" size={50} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <GSAPicon color="white" size={25} />
            <MotionIcon color="white" size={25} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <ReactIcon color="white" size={50} />
            <NextjsIcon color="white" size={50} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <GitIcon color="white" size={50} />
            <GitHubIcon color="white" size={50} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <VSicon color="white" size={50} />
            <AntiGravityIcon color="white" size={50} />
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <VercelIcon size={50} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        ref={buttonRef}
        className="flex flex-col items-start justify-start gap-6 sm:flex-row sm:items-center lg:justify-end"
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
      <div className="absolute -translate-y-1/2 pointer-events-none -z-10 top-1/2">
        <ABOUTsvg />
      </div>
    </div>
  );
};

export default AboutPreview;
