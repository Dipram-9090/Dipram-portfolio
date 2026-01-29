import "./aboutSection4.css";

import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ProjectsButton from "../../../../components/ProjectsButton";
import ContactButton from "../../../../components/ContactButton";

const Section4 = () => {
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          // Define breakpoints
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1024px)",
          isDesktop: "(min-width: 1025px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions;

          // ------------------------------------------
          // 🔧 RESPONSIVE TRIGGERS
          // ------------------------------------------
          let startValue, endValue;

          if (isMobile) {
            // Mobile: Trigger earlier (75% down viewport) so it's visible sooner
            startValue = "top 75%";
            endValue = "bottom 70%";
          } else if (isTablet) {
            // Tablet: Slightly later than mobile
            startValue = "top 70%";
            endValue = "bottom 60%";
          } else {
            // Desktop: Original values (starts at 60% down viewport)
            startValue = "top 60%";
            endValue = "80% 55%";
          }

          // 1. SplitText Logic
          const split = new SplitText(".section4Class", {
            type: "chars,words",
            charsClass: "char",
          });

          gsap.from(split.chars, {
            scrollTrigger: {
              trigger: scrollRef.current,
              start: startValue, // Uses variable above
              end: endValue,     // Uses variable above
              scrub: 0.05,
            },
            opacity: 0.1,
            stagger: { amount: 1.5 },
          });

          // 2. Button Animation
          gsap.from(buttonRef.current, {
            scrollTrigger: {
              trigger: buttonRef.current,
              // Adjust button trigger slightly for mobile vs desktop if needed
              start: isMobile ? "top 85%" : "top 95%",
            },
            opacity: 0,
            y: 40, 
            duration: 1,
          });

          // Cleanup: Revert SplitText on breakpoint change so it recalculates
          return () => split.revert();
        }
      );
    },
    { scope: scrollRef }
  );

  return (
    <div
      ref={scrollRef}
      // Container:
      // - Spacing: Reduced margins/padding for mobile, original large values for lg (desktop)
      // - Font: text-4xl (mobile) -> text-9xl (desktop)
      className="w-full flex flex-col items-center gap-10 md:gap-20 pt-20 px-5 mt-30 mb-50 lg:pt-40 lg:px-20 font-euclid font-medium text-center text-white text-6xl md:text-8xl lg:text-9xl"
    >
      <h1 className="section4Class leading-tight">
        Designing with <span>clarity, structure,</span> and{" "}
        <span>purpose.</span>
      </h1>

      <div
        ref={buttonRef}
        // Buttons Container:
        // - flex-col (default for mobile & md/tablet)
        // - lg:flex-row (desktop)
        // - w-full (allows buttons to stretch)
        className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-center w-full"
      >
        <ContactButton
          // Contact Button:
          // - w-full (mobile & md) -> lg:w-auto (desktop)
          className="w-full lg:w-auto md:w-[60%] cursor-pointer duration-200 hover:bg-[#19E6B6] font-euclid font-medium text-black bg-white rounded-full 
            text-lg px-8 py-3 
            md:text-2xl md:px-10 
            lg:text-4xl lg:px-12 lg:py-2 whitespace-nowrap"
        >
          GET IN TOUCH
        </ContactButton>

        <ProjectsButton
          // Projects Button:
          // - w-full (mobile & md) -> lg:w-auto (desktop)
          className="w-full lg:w-auto md:w-[60%] cursor-pointer duration-200 hover:bg-[#19E6B6] hover:border-[#19E6B6] hover:text-black font-euclid font-medium text-white uppercase border-4 rounded-full 
            text-lg px-8 py-2.5 
            md:text-2xl md:px-10 
            lg:text-4xl lg:px-12 lg:py-1 whitespace-nowrap"
        />
      </div>
    </div>
  );
};

export default Section4;