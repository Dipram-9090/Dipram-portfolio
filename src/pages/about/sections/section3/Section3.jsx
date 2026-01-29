import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

import Figma from "../../../home/sections/about/components/Figma";
import AdobeIllustratorIcon from "../../../home/sections/about/components/AdobeIllustratorIcon";
import CanvaIcon from "../../../home/sections/about/components/CanvaIcon";
import PhotoshopIcon from "../../../home/sections/about/components/PhotoshopIcon";

/* ---------------- Reusable Scroll Animation Hook ---------------- */

const useScrollAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

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

  const icons = [Figma, AdobeIllustratorIcon, CanvaIcon, PhotoshopIcon];

  return (
    <motion.div
      ref={anim.ref}
      variants={anim.container}
      initial="hidden"
      animate={anim.inView ? "show" : "hidden"}
      // Margin bottom: mb-20 mobile -> mb-60 desktop
      className="tools flex flex-col items-center mb-40 lg:mb-60 gap-8 lg:gap-15 w-full px-5 lg:px-0"
    >
      <motion.h2
        variants={anim.item}
        custom={anim.direction}
        // Font size: text-5xl mobile -> text-9xl desktop
        className="font-bebas text-5xl md:text-7xl lg:text-9xl text-white text-center"
      >
        Tools That I Use
      </motion.h2>

      {/* Icons Container: flex-wrap added for mobile, gap reduced */}
      <motion.div 
        className="flex flex-wrap justify-center gap-5 lg:gap-30" 
        variants={anim.container}
      >
        {icons.map((Icon, i) => (
          <motion.div 
            key={i} 
            variants={anim.item} 
            custom={anim.direction}
            // Scale: visually shrink icons on mobile (75%) -> 100% on desktop
            className="scale-75 md:scale-90 lg:scale-100"
          >
            <Icon size={100} />
          </motion.div>
        ))}
      </motion.div>
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