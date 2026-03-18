import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

// Design Tool Icons
import Figma from "../../../home/sections/about/components/Figma";
import AdobeIllustratorIcon from "../../../home/sections/about/components/AdobeIllustratorIcon";
import CanvaIcon from "../../../home/sections/about/components/CanvaIcon";
import PhotoshopIcon from "../../../home/sections/about/components/PhotoshopIcon";

// Frontend Tech Stack Icons
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

/* ---------------- Reusable Scroll Animation Hook ---------------- */

const useScrollAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: false }); // Slightly reduced amount for smoother trigger on taller sections

  const lastScrollY = useRef(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setDirection(current > lastScrollY.current ? 1 : -1);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        staggerDirection: direction,
      },
    },
  };

  const item = {
    hidden: (dir) => ({
      opacity: 0,
      filter: "blur(10px)",
      y: dir === 1 ? 30 : -30,
    }),
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return { ref, inView, container, item, direction };
};

/* ---------------- Para (Animated) ---------------- */

const Para = ({ heading, text }) => {
  const anim = useScrollAnimation();

  return (
    <motion.div
      ref={anim.ref}
      variants={anim.container}
      initial="hidden"
      animate={anim.inView ? "show" : "hidden"}
      // Gap: gap-12 on mobile -> gap-25 on desktop
      className="flex flex-col items-center gap-12 lg:gap-25 px-5 lg:px-0"
    >
      <div className="flex flex-col items-center gap-8 lg:gap-15 w-full">
        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          // Font size: text-4xl mobile -> text-7xl desktop
          className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white text-center"
        >
          {heading}
        </motion.h2>

        <div className="flex flex-col items-center gap-3 lg:gap-5 text-center">
          {text.map((elem, i) => (
            <motion.p
              key={i}
              variants={anim.item}
              custom={anim.direction}
              // Font size: text-lg mobile -> text-2xl desktop
              className="font-euclid text-white text-lg md:text-xl lg:text-2xl leading-relaxed"
            >
              {elem}
            </motion.p>
          ))}
        </div>
      </div>

      <motion.div
        variants={anim.item}
        custom={anim.direction}
        className="w-[70%] h-px bg-white"
      />
    </motion.div>
  );
};

/* ---------------- Tools (Same Animation) ---------------- */

const Tools = () => {
  const anim = useScrollAnimation();

  // Added WebflowIcon and FramerIcon here
  const designIcons = [Figma, AdobeIllustratorIcon, CanvaIcon, PhotoshopIcon, WebflowIcon, FramerIcon];
  
  // Removed them from techIcons to avoid duplication
  const techIcons = [
    HTML5icon, CSS3icon, JSIcon, TailwindIcon, ReactIcon, NextjsIcon,
    SCSSicon, GSAPicon, MotionIcon, VSicon, AntiGravityIcon, VercelIcon,
    GitIcon, GitHubIcon
  ];

  return (
    <motion.div
      ref={anim.ref}
      variants={anim.container}
      initial="hidden"
      animate={anim.inView ? "show" : "hidden"}
      // Margin bottom: mb-20 mobile -> mb-60 desktop
      className="tools flex flex-col items-center mb-40 lg:mb-60 gap-20 lg:gap-32 w-full px-5 lg:px-0"
    >
      
      {/* ---------- Design Tools Section ---------- */}
      <div className="flex flex-col items-center gap-8 lg:gap-15 w-full">
        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          // Font size: text-5xl mobile -> text-9xl desktop
          className="font-bebas text-5xl md:text-7xl lg:text-9xl text-white text-center"
        >
          Design Tools
        </motion.h2>

        {/* Styled identically to Tech Stack */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-5 lg:gap-16 max-w-6xl" 
          variants={anim.container}
        >
          {designIcons.map((Icon, i) => (
            <motion.div 
              key={`design-${i}`} 
              variants={anim.item} 
              custom={anim.direction}
              className="scale-75 md:scale-90 lg:scale-100"
            >
              <Icon size={60} color="white" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------- Frontend Tech Stack Section ---------- */}
      <div className="flex flex-col items-center gap-8 lg:gap-15 w-full">
        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          className="font-bebas text-5xl md:text-7xl lg:text-9xl text-white text-center"
        >
          Frontend Tech Stack
        </motion.h2>

        <motion.div 
          className="flex flex-wrap justify-center items-center gap-5 lg:gap-16 max-w-6xl" 
          variants={anim.container}
        >
          {techIcons.map((Icon, i) => {
            // Check if the current Icon is GSAPicon or MotionIcon
            const iconSize = (Icon === GSAPicon || Icon === MotionIcon || Icon === TailwindIcon ) ? 35 : 60;

            return (
              <motion.div 
                key={`tech-${i}`} 
                variants={anim.item} 
                custom={anim.direction}
                className="scale-75 md:scale-90 lg:scale-100"
              >
                <Icon size={iconSize} color="white" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </motion.div>
  );
};

/* ---------------- Section3 ---------------- */

const Section3 = () => {
  const howIWorkText = [
    "Work primarily from clear briefs and structured discussions",
    "Follow a requirement-driven and methodical design process",
    "Prefer controlled revisions to maintain quality and clarity",
    "Focus on solutions that are practical and easy to implement",
  ];

  const designApproachText = [
    "Problem-solving first, visuals second",
    "Minimal yet professional visual language",
    "Emphasis on clarity, consistency, and usability",
    "Design decisions guided by purpose, not decoration",
  ];

  const areasOfStrengthText = [
    "Marketing and communication assets",
    "Maintaining brand consistency across assets",
    "Creating visually appealing designs without compromising structure",
    "Handling end-to-end design tasks independently",
  ];

  const workValuesText = [
    "Quality over speed in all deliverables",
    "Clear requirements and brand resources are essential",
    "Avoid rushed work without proper context or direction",
  ];

  return (
    // Padding top: pt-20 mobile -> pt-40 desktop
    // Gap: gap-12 mobile -> gap-25 desktop
    <div className="w-full pt-40 flex flex-col gap-12 lg:gap-25">
      <Para heading="How I Work" text={howIWorkText} />
      <Para heading="Design Approach" text={designApproachText} />
      <Para heading="Areas of Strength" text={areasOfStrengthText} />
      <Para heading="Work Values" text={workValuesText} />
      <Tools />
    </div>
  );
};

export default Section3;