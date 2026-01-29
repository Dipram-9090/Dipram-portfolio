import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

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

// We move the single item logic here so each one gets its own animation trigger
const ServiceItem = ({ service }) => {
  const anim = useScrollAnimation();

  return (
    <motion.div
      ref={anim.ref}
      variants={anim.container}
      initial="hidden"
      animate={anim.inView ? "show" : "hidden"}
      // Gap: gap-12 (mobile) -> gap-25 (desktop)
      className="flex flex-col items-center gap-12 lg:gap-25 px-5 lg:px-0"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8 w-full">
        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          // Font: text-4xl (mobile) -> text-6xl (tablet) -> text-7xl (desktop)
          className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white text-center leading-none"
        >
          {service.heading}
        </motion.h2>

        <motion.p
          variants={anim.item}
          custom={anim.direction}
          // Font: text-lg (mobile) -> text-xl (tablet) -> text-2xl (desktop)
          className="font-euclid text-white text-lg md:text-xl lg:text-2xl text-center max-w-4xl"
        >
          {service.text1}
        </motion.p>

        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          // Font: text-2xl (mobile) -> text-4xl (desktop)
          // Margin: mt-3 (mobile) -> mt-5 (desktop)
          className="font-euclid font-medium text-white text-2xl md:text-3xl lg:text-4xl mt-3 lg:mt-5 text-center"
        >
          {service.subHeading1}
        </motion.h2>

        <div className="flex flex-col items-center gap-2 text-center">
          {service.textList.map((elem, i) => (
            <motion.p
              key={i}
              variants={anim.item}
              custom={anim.direction}
              // Font: text-base (mobile) -> text-xl (desktop)
              className="font-euclid text-white text-base md:text-lg lg:text-xl opacity-80"
            >
              • {elem}
            </motion.p>
          ))}
        </div>

        <motion.h2
          variants={anim.item}
          custom={anim.direction}
          // Font: text-2xl (mobile) -> text-4xl (desktop)
          className="font-euclid font-medium text-white text-2xl md:text-3xl lg:text-4xl mt-3 lg:mt-5 text-center"
        >
          {service.subHeading2}
        </motion.h2>

        <motion.p
          variants={anim.item}
          custom={anim.direction}
          // Font: text-lg (mobile) -> text-2xl (desktop)
          className="font-euclid text-white text-lg md:text-xl lg:text-2xl text-center max-w-4xl"
        >
          {service.text2}
        </motion.p>
      </div>

      <motion.div
        variants={anim.item}
        custom={anim.direction}
        // Width: 90% (mobile) -> 70% (desktop)
        className="w-[90%] lg:w-[70%] h-px bg-white mt-8 lg:mt-10"
      />
    </motion.div>
  );
};

/* ---------------- Para (Animated) ---------------- */

const Para = ({ servicesText }) => {
  return (
    // Gap: gap-20 (mobile) -> gap-40 (desktop)
    <div className="flex flex-col gap-20 lg:gap-40">
      {servicesText.map((service, index) => (
        <ServiceItem key={index} service={service} />
      ))}
    </div>
  );
};


/* ---------------- Section3 ---------------- */

const Section3 = () => {
  const servicesText = [
    {
      heading: "Product Interface Design",
      text1:
        "Designing user interfaces for web and application-based products with a focus on usability, clarity, and consistency. I work from product requirements and user needs to create interfaces that are intuitive, scalable, and ready for real-world use. This includes structuring screens, defining interaction patterns, and ensuring visual consistency across the product experience.",
      subHeading1: "What this includes",
      textList: [
        "Web and application UI/UX design",
        "User flows and interaction patterns",
        "Interface systems and reusable components",
        "Design aligned with product logic and user behavior",
      ],
      subHeading2: "Outcome",
      text2:
        "Interfaces that are clear, usable, and easy for teams to maintain as the product grows.",
    },
    {
      heading: "Brand & Visual Systems",
      text1:
        "Building structured brand identity systems that remain consistent across digital and physical touchpoints. Rather than designing isolated brand elements, I focus on creating visual systems that define how a brand looks, feels, and communicates across platforms–ensuring long-term consistency and clarity.",
      subHeading1: "What this includes",
      textList: [
        "Brand identity foundations",
        "Logo usage, typography, and color consistency",
        "Scalable brand guidelines",
      ],
      subHeading2: "Outcome",
      text2:
        "A cohesive brand system that teams can apply confidently across products, marketing, and communication.",
    },
    {
      heading: "Marketing & Growth Creatives",
      text1:
        "Designing visual communication assets that support visibility, recall, and marketing objectives. This service focuses on translating brand systems into effective marketing and campaign creatives–across digital, print, and outdoor formats–while maintaining consistency and visual clarity.",
      subHeading1: "What this includes",
      textList: [
        "Campaign and launch visuals",
        "Digital marketing assets",
        "Print and outdoor creatives",
        "Brand-aligned visual communication",
      ],
      subHeading2: "Outcome",
      text2:
        "Marketing assets that communicate clearly, attract attention, and remain consistent with the brand identity.",
    },
    {
      heading: "End-to-End Design Support",
      text1:
        "Ongoing design support for fast-moving teams operating in evolving environments. This service is designed for startups that need a reliable designer who can adapt to changing requirements, collaborate across teams, and deliver consistently without excessive overhead.",
      subHeading1: "What this includes",
      textList: [
        "Cross-functional collaboration",
        "Iterative design improvements",
        "Structured workflows with controlled revisions",
        "Rapid execution aligned with business priorities",
      ],
      subHeading2: "Outcome",
      text2:
        "Dependable design support that evolves alongside the product and the business.",
    },
  ];

  return (
    // Padding top: pt-20 (mobile) -> pt-40 (desktop)
    // Gap: gap-12 (mobile) -> gap-25 (desktop)
    <div className="w-full pt-20 lg:pt-40 flex flex-col gap-12 lg:gap-25">
      <Para servicesText={servicesText} />
    </div>
  );
};

export default Section3;