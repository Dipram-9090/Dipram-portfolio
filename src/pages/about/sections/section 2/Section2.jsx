import "./aboutSection2.css";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Section2 = () => {
  const scrollRef = useRef(null);

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
          const split = new SplitText(".section2Class", {
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
            opacity: 0.1,
            // Reduce stagger amount on mobile because there are more lines/wrapping
            stagger: { amount: isMobile ? 0.5 : 1.5 },
            ease: "power2.out",
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
      // Container:
      // - px-5 (mobile) -> px-20 (desktop)
      // - py-20 (mobile) -> py-40 (desktop)
      // - text-3xl (mobile) -> text-5xl (tablet) -> text-7xl (desktop)
      className="w-full flex flex-col items-center gap-20 lg:gap-40 my-10 lg:my-15 py-40 px-5 lg:px-20 font-euclid font-medium text-center text-white text-3xl md:text-5xl lg:text-7xl leading-tight"
    >
      <h1 className="section2Class w-full max-w-[90vw] lg:max-w-none">
        I’m a <span className="text-teal-400">multidisciplinary designer</span>{" "}
        working remotely, operating within{" "}
        <span className="text-teal-400">
          structured, requirement-driven workflows.
        </span>{" "}
        My work is focused on{" "}
        <span className="text-teal-400">solving real problems</span> through{" "}
        <span className="text-teal-400">
          clear, consistent, and visually professional design
        </span>{" "}
        solutions.
      </h1>
    </div>
  );
};

export default Section2;
